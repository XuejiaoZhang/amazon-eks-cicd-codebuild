#!/usr/bin/env node

import cdk = require('@aws-cdk/core');
import ecr = require('@aws-cdk/aws-ecr');
import eks = require('@aws-cdk/aws-eks');
import ec2 = require('@aws-cdk/aws-ec2');
import codecommit = require('@aws-cdk/aws-codecommit');
import codebuild = require('@aws-cdk/aws-codebuild');
import codepipeline = require('@aws-cdk/aws-codepipeline');
import codepipeline_actions = require('@aws-cdk/aws-codepipeline-actions');
//import { PipelineContainerImage } from "./pipeline-container-image";
import iam = require('@aws-cdk/aws-iam');

export class AppStack extends cdk.Stack {
  public readonly ecrRepo: ecr.Repository;
  //public readonly builtImage: PipelineContainerImage;

  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, {
      ...props,
     // autoDeploy: false, // TODO: failed
    });

    this.ecrRepo = new ecr.Repository(this, 'EcrRepo');
    //this.builtImage = new PipelineContainerImage(this.ecrRepo);

    const sourceOutput = new codepipeline.Artifact();
    const repository = new codecommit.Repository(this, 'CodeCommitRepo', {
      repositoryName: `${this.stackName}-repo`
    });

    const githubAccessToken = cdk.SecretValue.secretsManager('github-personal-access-token');

    const sourceAction = new codepipeline_actions.GitHubSourceAction({
        actionName: 'GitHubSource',
        owner: 'XuejiaoZhang',
        repo: 'amazon-eks-cicd-codebuild',
        oauthToken: githubAccessToken,
        output: sourceOutput
    });

    const cdkBuildRole = new iam.Role(this, 'cdkBuildRole', {
        assumedBy: new iam.ServicePrincipal('codebuild.amazonaws.com')
    });


    const role = iam.Role.fromRoleArn(this, 'Role', 'arn:aws:iam::323080756126:role/InfraStack-AdminRole38563C57-1O2Z9VOUQSV70', {
      // Set 'mutable' to 'false' to use the role as-is and prevent adding new
      // policies to it. The default is 'true', which means the role may be
      // modified as part of the deployment.
      //mutable: false,
    });

    // TODO:  codebuild.Project(
    const cdkBuild = new codebuild.PipelineProject(this, 'CdkBuildProject', {
      //role: role,
      environment: {
        buildImage: codebuild.LinuxBuildImage.UBUNTU_14_04_DOCKER_17_09_0,
        // buildImage: codebuild.LinuxBuildImage.fromAsset(this, 'CustomImage', {
        //   directory: '../dockerAssets.d',
        // }),
        privileged: true
      },

      environmentVariables: {
        'CLUSTER_NAME': {
          value: 'eks-for-demo-app' //`${cluster.clusterName}`
        },
        'EKS_ROLE_ARN': { // for entrypoint.sh
          value: 'arn:aws:iam::323080756126:role/InfraStack-AdminRole38563C57-1O2Z9VOUQSV70' // from InfraStack output
        },
        'ECR_REPO_URI': {
          value: `${this.ecrRepo.repositoryUri}`
        }
      },
      buildSpec: codebuild.BuildSpec.fromObject({
        version: '0.2',
        phases: {
          pre_build: {
                commands: [
                  'env',
                  'export TAG=${CODEBUILD_RESOLVED_SOURCE_VERSION}',
                  // '/usr/local/bin/entrypoint.sh',
                    "wget https://amazon-eks.s3-us-west-2.amazonaws.com/1.14.6/2019-08-22/bin/linux/amd64/kubectl",
                    "cp kubectl /usr/local/bin/kubectl",
                    "chmod +x /usr/local/bin/kubectl",
                    // # 'aws s3 ls',
                    // # "aws eks update-kubeconfig --name $CLUSTER_NAME --kubeconfig $KUBECONFIG",
                    // # 'kubectl get nodes',
                    "python",
                    "add-apt-repository ppa:fkrull/deadsnakes",
                    "apt-get update",
                    "apt-get install -y python3.5 python3.5-dev",
                    "rm /usr/bin/python",
                    "ln -s /usr/bin/python3.5 /usr/bin/python",
                    "python",
                    "apt-get install -y python3-pip",
                    "pip3",
                    "pip3 install awscli --upgrade",
                    "echo CLUSTER_NAME: $CLUSTER_NAME, EKS_ROLE_ARN: $EKS_ROLE_ARN",
                    'aws sts get-caller-identity',
                    "aws eks describe-cluster --name eks-for-demo-app",
                    "export KUBECONFIG=$HOME/.kube/kubeconfig",
                   // # "aws eks update-kubeconfig --name $CLUSTER_NAME --kubeconfig $KUBECONFIG --role-arn $EKS_ROLE_ARN",
                   //  # "aws eks update-kubeconfig --name eks-for-demo-app --kubeconfig $KUBECONFIG ",
                    "aws eks update-kubeconfig --name eks-for-demo-app --region us-east-2 --kubeconfig $KUBECONFIG --role-arn arn:aws:iam::323080756126:role/InfraStack-ClusterCreationRole360249B6-JCIC8EUL52NO",
                    "cat $KUBECONFIG",
                    "kubectl config view --minify",
                  'aws sts get-caller-identity',
                  'kubectl get nodes'
                                  
                ]
          },
          // install: {
          //   commands: [
          //       'apt-get update',
          //       'node -v',
          //       'npm config set registry https://registry.npm.taobao.org',
          //       'npm config list',
          //       'npm install n -g',
          //       'n stable',
          //       'node -v',
          //       "npm install yarn -g",
          //       "yarn -v",
          //       'npm install typescript -g',
          //       'tsc -v'
          //   ], 
          // },
          // build: {
          //   commands: [
          //     "cd cdk8s",
          //     'yarn install',
          //     'yarn build',
          //     'yarn synth',
          //     'ls -al',
          //     'cat dist/hello.k8s.yaml'
          //   ],
          // },
          // post_build: {
          //   commands: [
          //     'export TAG=${CODEBUILD_RESOLVED_SOURCE_VERSION}',
          //     'kubectl get no',
          //     'kubectl apply -f dist/hello.k8s.yaml',
          //     'kubectl set image deployment '+'eks-demo-app'+' '+'app'+'='+'$ECR_REPO_URI:$TAG'
          //   ]
          // }

        },
        artifacts: {
          'base-directory': 'cdk8s',
          files: '*',
        },
      }),
    });


    const dockerBuild = new codebuild.PipelineProject(this, 'DockerBuildProject', {
      //role: buildRole,
      //projectName: `${this.stackName}`,            
      //source: codebuild.Source.codeCommit({ repository }),
      //buildSpec: codebuild.BuildSpec.fromSourceFilename('./cdk/lib/buildspec.yml'),

      // default buildImage: LinuxBuildImage.STANDARD_1_0
      // needed, error: Invalid input: cannot use a CodeBuild curated image with imagePullCredentialsType SERVICE_ROLE
      // environment: {
      //   buildImage: codebuild.LinuxBuildImage.STANDARD_2_0,
      // },
      environment: {
        buildImage: codebuild.LinuxBuildImage.UBUNTU_14_04_DOCKER_17_09_0,
        privileged: true,
      },
      // environment: {
      //   buildImage: codebuild.LinuxBuildImage.fromAsset(this, 'CustomImage', {
      //     directory: '../dockerAssets.d',
      //   }),
      //   privileged: true
      // },

      environmentVariables: {
        'ECR_REPO_URI': {
          value: `${this.ecrRepo.repositoryUri}`
        }
      },
      buildSpec: codebuild.BuildSpec.fromObject({
        version: "0.2",
        phases: {
          pre_build: {
            commands: [
              'env',
              'export TAG=${CODEBUILD_RESOLVED_SOURCE_VERSION}',
              //'export TAG=latest',
              //'/usr/local/bin/entrypoint-ecs.sh'
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
              'printf \'[{"name":"flask-docker-app","imageUri":"%s"}]\' ${ECR_REPO_URI}:${TAG} >../imagedefinitions.json',
            ]
          }
        },
        artifacts: {
          files: [
            './imagedefinitions.json' // artifacts 相对根目录
          ]
        }
      })
    });
    this.ecrRepo.grantPullPush(dockerBuild);

    const dockerBuildOutput = new codepipeline.Artifact();
    const cdkBuildOutput = new codepipeline.Artifact();



    // const deployProject = new codebuild.Project(this, 'DeployProject', {
    //   projectName: `${this.stackName}`,
    //   //source: codebuild.Source.gitHub({ repository }),
    //   // buildSpec: codebuild.BuildSpec.fromSourceFilename('./cdk/lib/buildspec.yml'),
    //   environment: {
    //     buildImage: codebuild.LinuxBuildImage.fromAsset(this, 'CustomImage', {
    //       directory: '../dockerAssets.d',
    //     }),
    //     privileged: true
    //   },
    //   environmentVariables: {
    //     'CLUSTER_NAME': {
    //       value: 'eks-for-demo-app' //`${cluster.clusterName}`
    //     },
    //     // 'ECR_REPO_URI': {
    //     //   value: `${ecrRepo.repositoryUri}`
    //     // }
    //   },
    //   buildSpec: codebuild.BuildSpec.fromObject({
    //     version: "0.2",
    //     phases: {
    //       pre_build: {
    //         commands: [
    //           'env',
    //           'export TAG=${CODEBUILD_RESOLVED_SOURCE_VERSION}',
    //           '/usr/local/bin/entrypoint.sh'
    //         ]
    //       },
    //       build: {
    //         commands: [
    //             'ls -al',
    //           // 'cd flask-docker-app',
    //           // `docker build -t $ECR_REPO_URI:$TAG .`,
    //           // '$(aws ecr get-login --no-include-email)',
    //           // 'docker push $ECR_REPO_URI:$TAG'
    //         ]
    //       },
    //       post_build: {
    //         commands: [
    //           'kubectl get no',
    //           'kubectl set image deployment flask flask=$ECR_REPO_URI:$TAG'
    //         ]
    //       }
    //     }
    //   })

    // });

    // const deployProjectdOutput = new codepipeline.Artifact('DeployArtifact');

    
    cdkBuild.addToRolePolicy(new iam.PolicyStatement({
        resources: ['*'],
        actions: ['eks:*', 'iam:*', 'CodeBuild:*'] //eks update-kubeconfig assume role
    }));

    const azs = ['us-east-2a', 'us-east-2b', 'us-east-2c']

    const vpc = ec2.Vpc.fromVpcAttributes(this, 'NewVPC', {
      vpcCidrBlock: '10.0.0.0/16',
      vpcId: 'vpc-0438f69a1f941ad15',
      availabilityZones: azs
    })

    const sg1 = ec2.SecurityGroup.fromSecurityGroupId(this, 'SG1','sg-01b2c0262adedd42f')
    const sg2 = ec2.SecurityGroup.fromSecurityGroupId(this, 'SG2','sg-04d1606b306da7321')

    const cluster = eks.Cluster.fromClusterAttributes(this, "eks", {
       clusterArn: 'arn:aws:eks:us-east-2:323080756126:cluster/eks-for-demo-app',
       clusterName:'eks-for-demo-app',
       clusterCertificateAuthorityData: 'LS0tLS1CRUdJTiBDRVJUSUZJQ0FURS0tLS0tCk1JSUN5RENDQWJDZ0F3SUJBZ0lCQURBTkJna3Foa2lHOXcwQkFRc0ZBREFWTVJNd0VRWURWUVFERXdwcmRXSmwKY201bGRHVnpNQjRYRFRJd01ETXhNekV5TkRVeU5sb1hEVE13TURNeE1URXlORFV5Tmxvd0ZURVRNQkVHQTFVRQpBeE1LYTNWaVpYSnVaWFJsY3pDQ0FTSXdEUVlKS29aSWh2Y05BUUVCQlFBRGdnRVBBRENDQVFvQ2dnRUJBT0pBCktueWVVZjczNlFrMWRNY0tiMFdKOEwwTW5HMkprV2RzVzJTdEVrT3FrMTczQlJtVXdmMEtZVGdmUUtWZDA2MFcKQlJGTFBOWC95NFJoS3BQa1RqenhQdTZjWm1YbVlnZy9Ea2pFa0I3VVdBSkR3YnNpaE1kaTI2YkpQQmhBZ0U4YQpVTzRxTjlCdml0OXhZb0tKOExBTFp3cVZjVUdSeUNvNmp5dVpOYnFGb3FzT3g0YmJSLzVwUXFjYksrSUtDWk5MCmlSQUdocjRiUjZxSEVzdDRMVWVLTGc4KzlyZlI1UTNSbWFGVEViSWVIblF1STFiUWxZdHZ0T0JMaStNNUZJbWUKRGpBWVRkUmQ0YnRXcnc2a05vYnowdnVkKy82eDhhUFZaSW1MVTZZclRyWHZOUVJZbXhwSktCYVZtL1M4ZHVaRgpmZGQrSTl0WHlMRGl0Y2VUUnZjQ0F3RUFBYU1qTUNFd0RnWURWUjBQQVFIL0JBUURBZ0trTUE4R0ExVWRFd0VCCi93UUZNQU1CQWY4d0RRWUpLb1pJaHZjTkFRRUxCUUFEZ2dFQkFKdzdQakErS2llZlM0Q0xhTkZ4NWg3QklsRGQKa0c3UEVDeUNjTzNETUYyVUVjRzRjbjY2V3RFRHZqRjl2TkN3bExZWGU4cU0rRjhHWlc2dHpxc3k0UmFGcllCSQp1eWZ3dEN3YXB6WXJzOEVrSzhCOU4yS3d3NFlrQnUvQWZuSlZtWit5VmYwU0Zzdk1TUWJJNEJVd3l5ZVJPdWYzCkUzdEJ1OXU1MzdnNTlydy8vaGFFalFBT2dSUnBKTEVrcVIwOUErR0pxMTJUcDRZaXA1TVpqaWk0aFJNR2FIcWMKVG1aYUEwNGVjN3JNdWVzV2NzRDZwZXVaWHIxWm9oWm4yZW5QUEU3OUs5YWdNbGx4Y3IxdDBtMnVCeHQ3Zm90cApOTkNqeUhLZlgwQXpKb0IzN2d2dDZqdFpIcDJxVHd1S0NhdUVPaUxYTkVsaGlHUnQ0S2gxb3VHUUtncz0KLS0tLS1FTkQgQ0VSVElGSUNBVEUtLS0tLQo=',
       clusterEndpoint: 'https://80184737DF7E1A2A4CFE5539CFA7CD8A.yl4.us-east-2.eks.amazonaws.com',
       securityGroups: [sg1, sg2],
       vpc: vpc
    })

    const eksCluster = new eks.Cluster(this, 'clusterExisting', cluster)
    eksCluster.awsAuth.addMastersRole(cdkBuild.role!)
    // project.addToRolePolicy(new iam.PolicyStatement({
    //   actions: ['eks:DescribeCluster'],
    //   resources: [`${cluster.clusterArn}`],
    // }))
    // const buildAction = new codepipeline_actions.CodeBuildAction({
    //   actionName: 'CodeBuild',
    //   project,
    //   input: sourceOutput,
    //   outputs: [new codepipeline.Artifact()], // optional
    // });

    new codepipeline.Pipeline(this, 'Pipeline', {
      stages: [
        {
          stageName: 'Source',
          actions: [sourceAction],
        },
        {
          stageName: 'Build',
          actions: [
            new codepipeline_actions.CodeBuildAction({
              actionName: 'DockerBuild',
              project: dockerBuild,
              input: sourceOutput,
              outputs: [dockerBuildOutput],
            }),

          ],
        },
        {
          stageName: 'Deploy',
          actions: [
            // new codepipeline_actions.CodeBuildAction({
            //   actionName: 'DeployK8s',
            //   project: deployProject,
            //   input: dockerBuildOutput,
            //   extraInputs: [cdkBuildOutput],
            //   outputs: [deployProjectdOutput],
            // }),

            new codepipeline_actions.CodeBuildAction({
              actionName: 'CdkBuild',
              project: cdkBuild,
              input: sourceOutput,
              outputs: [cdkBuildOutput],
            })
          ],
        },
      ],
    });
  }
}
