#!/usr/bin/env node

import cdk = require('@aws-cdk/core');
import ec2 = require('@aws-cdk/aws-ec2');
import ecr = require('@aws-cdk/aws-ecr');
import ecs = require('@aws-cdk/aws-ecs');
import iam = require('@aws-cdk/aws-iam');
import codebuild = require('@aws-cdk/aws-codebuild');
import codecommit = require('@aws-cdk/aws-codecommit');
import targets = require('@aws-cdk/aws-events-targets');
import codepipeline = require('@aws-cdk/aws-codepipeline');
import codepipeline_actions = require('@aws-cdk/aws-codepipeline-actions');
import ecsPatterns = require('@aws-cdk/aws-ecs-patterns');
import autoscaling = require('@aws-cdk/aws-autoscaling');

import { Duration } from '@aws-cdk/core';
import { EcsOptimizedAmi } from '@aws-cdk/aws-ecs';


export class CdkStack extends cdk.Stack {
  //readonly ecrRepository: ecr.Repository
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    /**
     * Uncomment below if you perfer using default VPC
     */

    /*
    const vpc = ec2.Vpc.fromLookup(vpc, 'VPC', {
      isDefault: true
    })
    */

    /**
     * Create a new VPC with single NAT Gateway
     */
    const vpc = new ec2.Vpc(this, 'NewVPC', {
      cidr: '10.0.0.0/16',
      natGateways: 1
    })


    const ecrRepo = new ecr.Repository(this, 'EcrRepo');
    //this.ecrRepository = ecrRepo

    const repository = new codecommit.Repository(this, 'CodeCommitRepo', {
      repositoryName: `${this.stackName}-repo`
    });

    const cluster = new ecs.Cluster(this, 'Cluster', {
        clusterName: 'cdk-samples',
        vpc
    });


    // cluster.addCapacity('AsgSpot1', {
    //   maxCapacity: 1,
    //   minCapacity: 1,
    //   desiredCapacity: 1,
    //   instanceType: new ec2.InstanceType('c5.xlarge'),
    //   spotPrice: '0.0722',
    //   spotInstanceDraining: true
    // });

    // cluster.addCapacity('AsgSpot2', {
    //   maxCapacity: 1,
    //   minCapacity: 1,
    //   desiredCapacity: 1,
    //   instanceType: new ec2.InstanceType('c5.large'),
    //   spotPrice: '0.0333',
    //   spotInstanceDraining: true
    // });

    // cluster.addCapacity('AsgOd', {
    //   maxCapacity: 2,
    //   minCapacity: 1,
    //   desiredCapacity: 1,
    //   instanceType: new ec2.InstanceType('t3.large'),
    // })

    // Mixed ASG with launch template
    const mixedAsg = cluster.addCapacity('AsgMixed', {
      maxCapacity: 10,
      minCapacity: 3,
      instanceType: new ec2.InstanceType('t3.large'),
    })  

    function capitalizeKeys(o: any): any {
      return Object.keys(o).reduce((res, k) => ({ ...res, [capitalize(k)]: o[k] }), {});
    }

    function capitalize(s: string): string {
      return s.charAt(0).toUpperCase() + s.slice(1);
    }

    const instanceTypes = [
      new ec2.InstanceType('m5.large'), 
      new ec2.InstanceType('c5.large'),
      new ec2.InstanceType('t3.large'), 
    ];

    const instancesDistribution = {
      spotInstancePools: 10,
      onDemandBaseCapacity: 1,
      onDemandPercentageAboveBaseCapacity: 0
    };

    const instanceProfile = new iam.CfnInstanceProfile(this, "InstProfile", {
      roles: [mixedAsg.role.roleName]
    });

    const launchTemplate = new ec2.CfnLaunchTemplate(this, "LaunchTemplate", {
      launchTemplateData: {
        userData: cdk.Fn.base64(mixedAsg.userData.render()),
        securityGroupIds: mixedAsg.connections.securityGroups.map(sg => sg.securityGroupId),

        // TODO
        imageId: new EcsOptimizedAmi().getImage(this).imageId,
        ebsOptimized: true,
        iamInstanceProfile: { arn: instanceProfile.attrArn },
      }
    });

    // TODO
    const cfnMixedAsg = mixedAsg.node.defaultChild as autoscaling.CfnAutoScalingGroup;
    cfnMixedAsg.addPropertyDeletionOverride('LaunchConfigurationName');

    cfnMixedAsg.addPropertyOverride("MixedInstancesPolicy", {
      InstancesDistribution: instancesDistribution ? capitalizeKeys(instancesDistribution) : undefined,
      LaunchTemplate: {
        LaunchTemplateSpecification: {
          LaunchTemplateId: launchTemplate.ref,
          Version: launchTemplate.attrLatestVersionNumber
        },
        Overrides: instanceTypes.map(t => ({ InstanceType: t.toString() }))
      }
    }); 


    const logGroupName = this.stackName

    const taskDefinition = new ecs.TaskDefinition(this, 'task', {
        compatibility: ecs.Compatibility.EC2,
        memoryMiB: '1024',
        cpu: '256'
    });

    taskDefinition
      .addContainer('flask-docker-app', {
        image: ecs.ContainerImage.fromAsset(__dirname + '/../../flask-docker-app/'),
        memoryReservationMiB: 512,
        environment: {
          PLATFORM: 'Amazon ECS'
        },
        logging: ecs.LogDrivers.firelens({
          options: {
            Name: 'cloudwatch',
            region: this.region,
            // disable the log_key to send full JSON event log to cloudwatch
            // log_key: 'log',
            log_group_name: logGroupName,
            auto_create_group: 'true',
            log_stream_prefix: 'flask-'
          }
        })
      })
      .addPortMappings({
        containerPort: 5000
      });


    // TODO: for fargate and ECS ec2 , use the same webSvc instead of fargatesvc
    const webSvc = new ecsPatterns.ApplicationLoadBalancedEc2Service(this, 'webSvc', {
      cluster,
      taskDefinition,
      desiredCount: 2,
    })


    // if the default image is not from ECR, the ECS task execution role will not have ECR pull privileges
    // we need grant the pull for it explicitly
    ecrRepo.grantPull({
        grantPrincipal: (webSvc.service.taskDefinition.executionRole as iam.IRole)
    })


    // AWS CodePipeline stage to clone sources from CodeCommit repository
    const sourceOutput = new codepipeline.Artifact();
    const sourceAction = new codepipeline_actions.CodeCommitSourceAction({
      actionName: 'CodeCommit',
      repository: repository,
      output: sourceOutput,
    });

    const buildRole = new iam.Role(this, 'CodeBuildIamRole', {
        assumedBy: new iam.ServicePrincipal('codebuild.amazonaws.com')
    })
    buildRole.addToPolicy(new iam.PolicyStatement({
        resources: ['*'],
        actions: ['ecr:GetAuthorizationToken']
    }));

    buildRole.addToPolicy(new iam.PolicyStatement({
        resources: [`${ecrRepo.repositoryArn}*`],
        actions: ['ecr:*']
    }));

    // ECR Lifecycles
    // repository.addLifecycleRule({ tagPrefixList: ['prod'], maxImageCount: 9999 });
    ecrRepo.addLifecycleRule({ maxImageAge: cdk.Duration.days(30) });

    const project = new codebuild.Project(this, 'MyProject', {
      role: buildRole,
      projectName: `${this.stackName}`,            
      //source: codebuild.Source.codeCommit({ repository }),
      //buildSpec: codebuild.BuildSpec.fromSourceFilename('./cdk/lib/buildspec.yml'),
      environment: {
        buildImage: codebuild.LinuxBuildImage.fromAsset(this, 'CustomImage', {
          directory: '../dockerAssets.d',
        }),
        privileged: true
      },
      environmentVariables: {
        'CLUSTER_NAME': {
          value: `${cluster.clusterName}`
        },
        'ECR_REPO_URI': {
          value: `${ecrRepo.repositoryUri}`
        }
      },
      buildSpec: codebuild.BuildSpec.fromObject({
        version: "0.2",
        phases: {
          pre_build: {
            commands: [
              'env',
             // 'export TAG=${CODEBUILD_RESOLVED_SOURCE_VERSION}',
              'export TAG=latest',
              '/usr/local/bin/entrypoint-ecs.sh'
            ]
          },
          build: {
            commands: [
              'cd flask-docker-app',
              `docker build -t $ECR_REPO_URI:$TAG .`,
              '$(aws ecr get-login --no-include-email)',
              'docker push $ECR_REPO_URI:$TAG'
            ]
          },
          post_build: {
            commands: [
              'printf \'[{"name":"flask-docker-app","imageUri":"${ecrRepo.repositoryUri}:latest"}]\' >imagedefinitions.json',
            ]
          }
        },
        artifacts: {
          files: [
            'imagedefinitions.json'
          ]
        }
      })
    });

    const buildAction = new codepipeline_actions.CodeBuildAction({
      actionName: 'CodeBuild',
      project,
      input: sourceOutput,
      outputs: [new codepipeline.Artifact()], // optional
    });




    const sourceOutputEcr = new codepipeline.Artifact();
    const sourceActionECR = new codepipeline_actions.EcrSourceAction({
        actionName: 'ECR',
        repository: ecrRepo,
        imageTag: 'latest', // optional, default: 'latest'
        output: sourceOutputEcr,
    });


    const pipeline = new codepipeline.Pipeline(this, 'Pipeline', {
      pipelineName: 'Pipeline',
      restartExecutionOnUpdate: true,
    });

    pipeline.addStage({
      stageName: 'Source',
      actions: [sourceAction]
    });

    pipeline.addStage({
      stageName: 'Build',
      actions: [buildAction]
    });


    pipeline.addStage({
        stageName: 'Deploy',
        actions: [
            new codepipeline_actions.EcsDeployAction({
                actionName: 'DeployAction',
                service: webSvc.service,
                // if your file is called imagedefinitions.json,
                // use the `input` property,
                // and leave out the `imageFile` property
                input: sourceOutput,
                // if your file name is _not_ imagedefinitions.json,
                // use the `imageFile` property,
                // and leave out the `input` property
                // imageFile: sourceOutput.atPath('imageDef.json'),
            }),
        ],
    });



    repository.onCommit('OnCommit', {
      target: new targets.CodeBuildProject(codebuild.Project.fromProjectArn(this, 'OnCommitEvent', project.projectArn))
    });

    ecrRepo.grantPullPush(project.role!)

    // cluster.awsAuth.addMastersRole(project.role!)
    // project.addToRolePolicy(new iam.PolicyStatement({
    //   actions: ['eks:DescribeCluster'],
    //   resources: [`${cluster.clusterArn}`],
    // }))

    new cdk.CfnOutput(this, 'ServiceURL', {
        value: `http://${webSvc.loadBalancer.loadBalancerDnsName}`
    })

    new cdk.CfnOutput(this, 'StackId', {
        value: this.stackId
    })

    new cdk.CfnOutput(this, 'StackName', {
        value: this.stackName
    })

    
    // manually create the file: imagedefinitions.json
    let codeCommitHint = `
Create a "imagedefinitions.json" file and git add/push into CodeCommit repository "${this.stackName}-repo" with the following value:

[
{
"name": "flask-docker-app",
"imageUri": "${ecrRepo.repositoryUri}:latest"
}
]
`
    new cdk.CfnOutput(this, 'Hint', {
        value: codeCommitHint
    })


    new cdk.CfnOutput(this, 'CloudwatchLogGrupURL', {
      value: `https://${this.region}.console.aws.amazon.com/cloudwatch/home?region=${this.region}#logStream:group=${logGroupName}`
    })

    new cdk.CfnOutput(this, 'ALBSvcURL', {
      value: `http://${webSvc.loadBalancer.loadBalancerDnsName}`
    })

    new cdk.CfnOutput(this, 'CodeCommitRepoName', { value: `${repository.repositoryName}` })
    new cdk.CfnOutput(this, 'CodeCommitRepoArn', { value: `${repository.repositoryArn}` })
    new cdk.CfnOutput(this, 'CodeCommitCloneUrlSsh', { value: `${repository.repositoryCloneUrlSsh}` })
    new cdk.CfnOutput(this, 'CodeCommitCloneUrlHttp', { value: `${repository.repositoryCloneUrlHttp}` })
  }
}
