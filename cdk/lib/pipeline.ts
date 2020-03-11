#!/usr/bin/env node
import codebuild = require('@aws-cdk/aws-codebuild');
import codepipeline = require('@aws-cdk/aws-codepipeline');
import actions = require('@aws-cdk/aws-codepipeline-actions');
import cdk = require('@aws-cdk/core');
import iam = require('@aws-cdk/aws-iam');

export interface CDKCfnPipelineProps {
    stackName: string;
    templateName: string;
    pipelineName: string;
    directory: string;
}

export class CDKCfnPipeline extends cdk.Construct {
    public readonly pipeline: codepipeline.Pipeline;

    public readonly sourceOutput: codepipeline.Artifact;

    constructor(parent: cdk.Construct, name: string, props: CDKCfnPipelineProps) {
        super(parent, name);

        const pipeline = new codepipeline.Pipeline(this, 'Pipeline', {
            pipelineName: 'CDK-' + props.pipelineName,
        });
        this.pipeline = pipeline;

        // Source
        const githubAccessToken = cdk.SecretValue.secretsManager('github-personal-access-token');
        const sourceOutput = new codepipeline.Artifact('SourceArtifact');
        const sourceAction = new actions.GitHubSourceAction({
            actionName: 'GitHubSource',
            owner: 'XuejiaoZhang',
            repo: 'amazon-eks-cicd-codebuild',
            oauthToken: githubAccessToken,
            output: sourceOutput
        });
        pipeline.addStage({
            stageName: 'Source',
            actions: [sourceAction],
        });
        this.sourceOutput = sourceOutput;

        // Build
        // const buildProject = new codebuild.PipelineProject(this, 'BuildProject', {
        //     buildSpec: codebuild.BuildSpec.fromSourceFilename(props.directory + '/buildspec.yml'),
        //     environment: {
        //       buildImage: codebuild.LinuxBuildImage.UBUNTU_14_04_NODEJS_10_1_0,
        //       environmentVariables: {
        //         'ARTIFACTS_BUCKET': {
        //             value: pipeline.artifactBucket.bucketName
        //         }
        //       },
        //       privileged: true
        //     }
        // });

        const templatePrefix =  props.templateName; // InfraStack

        const buildProject = new codebuild.PipelineProject(this, 'CdkBuildProject', {
          environment: {
            buildImage: codebuild.LinuxBuildImage.UBUNTU_14_04_NODEJS_8_11_0,
            privileged: true,
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
                  'npm run cdk synth '+ templatePrefix +' -- -o .',
                  'ls -al',
                //  'cat AppStack.template.json'
                ],
              }
            },
            artifacts: {
              'base-directory': 'cdk',
              files: '*', //InfraStack.template.json
            },
          }),
        });

        //


        buildProject.addToRolePolicy(new iam.PolicyStatement({
            resources: ['*'],
            actions: ['s3:*', 'ec2:*', 'iam:*', 'eks:*', 'ecr:*']
        }));

        // buildProject.addToRolePolicy(new iam.PolicyStatement(PolicyStatementEffect.Allow)
        //     .addResource('*')
        //     .addAction('ec2:*')
        // );

        // buildProject.addToRolePolicy(new iam.PolicyStatement(PolicyStatementEffect.Allow)
        //     .addResource('*')
        //     .addAction('iam:*')
        // );

        // buildProject.addToRolePolicy(new iam.PolicyStatement(PolicyStatementEffect.Allow)
        //     .addResource('*')
        //     .addAction('eks:*')
        // );

        // buildProject.addToRolePolicy(new iam.PolicyStatement(PolicyStatementEffect.Allow)
        //     .addResource('*')
        //     .addAction('ecr:*')
        // );

        const buildArtifact = new codepipeline.Artifact('BuildArtifact');
        const buildAction = new actions.CodeBuildAction({
            actionName: 'CodeBuild',
            project: buildProject,
            input: sourceOutput,
            outputs: [buildArtifact],
          });

        pipeline.addStage({
            stageName: 'Build',
            actions: [buildAction],
        });

        // Test
        
        const testStackName = 'CDK' + props.stackName + 'Test';
        const changeSetName = 'StagedChangeSet';




        pipeline.addToRolePolicy(new iam.PolicyStatement({
            resources: ['*'],
            actions: ['s3:*']
        }));




        pipeline.addStage({
            stageName: 'Test',
            actions: [ 

                new actions.CloudFormationCreateUpdateStackAction({
                    actionName: 'CFN_Deploy',
                    stackName: 'InfraDeployStack',
                    templatePath: buildArtifact.atPath(templatePrefix + '.template.json'),
                    //templatePath: buildArtifact.atPath('InfraStack.template.json'),

                    adminPermissions: true,

                    // parameterOverrides: {
                    //   [this.builtImage.paramName]: dockerBuildOutput.getParam('imageTag.json', 'imageTag'),
                    //   // ...this.builtImage.assing(dockerBuildOutput)
                    // },
                    extraInputs: [buildArtifact],
                })

                // new actions.CloudFormationCreateReplaceChangeSetAction({
                //     actionName: 'PrepareChangesTest',
                //     stackName: testStackName,
                //     changeSetName,
                //     runOrder: 1,
                //     adminPermissions: true,
                //     templatePath: buildArtifact.atPath(templatePrefix + '.template.json'),
                //     //templateConfiguration: buildArtifact.atPath('StackConfig.json'),
                // }),
                // new actions.CloudFormationExecuteChangeSetAction({
                //     actionName: 'ExecuteChangesTest',
                //     stackName: testStackName,
                //     changeSetName,
                //     runOrder: 2
                // })
            ],
        });

        // Prod
        const prodStackName = 'CDK' + props.stackName + 'Prod';

        pipeline.addStage({
            stageName: 'Prod',
            actions: [
                new actions.CloudFormationCreateReplaceChangeSetAction({
                    actionName: 'PrepareChangesProd',
                    stackName: prodStackName,
                    changeSetName,
                    runOrder: 1,
                    adminPermissions: true,
                    templatePath: buildArtifact.atPath(templatePrefix + '.template.yaml'),
                    //templateConfiguration: buildArtifact.atPath('StackConfig.json'),
                }),
                new actions.CloudFormationExecuteChangeSetAction({
                    actionName: 'ExecuteChangesProd',
                    stackName: prodStackName,
                    changeSetName,
                    runOrder: 2
                })
            ],
        });
    }
}