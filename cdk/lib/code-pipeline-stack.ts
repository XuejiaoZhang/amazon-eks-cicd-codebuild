#!/usr/bin/env node

import cdk = require('@aws-cdk/core');
import ecr = require('@aws-cdk/aws-ecr');
import codecommit = require('@aws-cdk/aws-codecommit');
import codebuild = require('@aws-cdk/aws-codebuild');
import codepipeline = require('@aws-cdk/aws-codepipeline');
import codepipeline_actions = require('@aws-cdk/aws-codepipeline-actions');
//import { PipelineContainerImage } from "./pipeline-container-image";

export class CodePipelineStack extends cdk.Stack {
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

    const sourceAction = new codepipeline_actions.CodeCommitSourceAction({
      actionName: 'CodeCommit',
      repository: repository,
      output: sourceOutput,
    });

    const cdkBuild = new codebuild.PipelineProject(this, 'CdkBuildProject', {
      environment: {
        buildImage: codebuild.LinuxBuildImage.UBUNTU_14_04_NODEJS_8_11_0,
      },
      buildSpec: codebuild.BuildSpec.fromObject({
        version: '0.2',
        phases: {
          install: {
            commands: [
              'cd cdk',
              'npm install',
            ],
          },
          build: {
            commands: [
              'npm run build',
              'npm run cdk synth AppServiceDeployStack -- -o .',
            ],
          },
        },
        artifacts: {
          'base-directory': 'cdk',
          files: 'AppServiceDeployStack.template.yaml',
        },
      }),
    });

    const dockerBuild = new codebuild.PipelineProject(this, 'MyProject', {
      // role: buildRole,
      projectName: `${this.stackName}`,            
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
            new codepipeline_actions.CodeBuildAction({
              actionName: 'CdkBuild',
              project: cdkBuild,
              input: sourceOutput,
              outputs: [cdkBuildOutput],
            })
          ],
        },
        {
          stageName: 'Deploy',
          actions: [
            new codepipeline_actions.CloudFormationCreateUpdateStackAction({
              actionName: 'CFN_Deploy',
              stackName: 'AppServiceDeployStack',
              templatePath: cdkBuildOutput.atPath('AppServiceDeployStack.template.yaml'),
              adminPermissions: true,
              // parameterOverrides: {
              //   [this.builtImage.paramName]: dockerBuildOutput.getParam('imageTag.json', 'imageTag'),
              //   // ...this.builtImage.assing(dockerBuildOutput)
              // },
              extraInputs: [dockerBuildOutput],
            }),
          ],
        },
      ],
    });
  }
}
