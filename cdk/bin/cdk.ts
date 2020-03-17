#!/usr/bin/env node

import 'source-map-support/register';
import cdk = require('@aws-cdk/core');

// import { CdkStack } from '../lib/cdk-stack';
import { CdkStack } from '../lib/cdk-stack-eks-pipeline';
// import { CdkStack } from '../lib/cdk-stack-fargate-pipeline';
// import { CdkStack } from '../lib/cdk-stack-ecs-ec2-pipeline';

const app = new cdk.App();

const env = {
  region: app.node.tryGetContext('region') || process.env.CDK_INTEG_REGION || process.env.CDK_DEFAULT_REGION,
  account: app.node.tryGetContext('account') || process.env.CDK_INTEG_ACCOUNT || process.env.CDK_DEFAULT_ACCOUNT
};


new CdkStack(app, 'CdkStack', { env });


import { ClusterStack } from '../lib/cluster-stack';
import { AppServiceStack } from '../lib/app-service-stack';
import { CodePipelineStack } from '../lib/code-pipeline-stack';

// const app = new cdk.App();
const clusterStack = new ClusterStack(app, 'ClusterStack', {
    cidr: '10.1.0.0/20',
    maxAzs: 2,
    clusterType: 'ecs-fargate',
    clusterName: 'ecs-fargate-20200228'
});

const appServiceStack = new AppServiceStack(app, 'AppServiceDeployStack', {
  vpc: clusterStack.vpc,
  cluster: clusterStack.cluster,
  containerPort: 5000,
});

// When deploy without CICD:
// 1) cdk deploy ClusterStack
// 2) cdk deploy AppServiceStack

// When deploy with CICD:
// 1) cdk deploy ClusterStack
// 2) cdk deploy PipelineStack, AppServiceStack will be deployed on the deploy stage of pipeline, that's wht two build steps: one docker build, one cdk build
const codePipelineStack = new CodePipelineStack(app, 'CodePipelineStack');

// new appServiceStack(app, 'ProdHttpServiceStack', {
//   vpc: clusterStack.vpc,
//   cluster: clusterStack.cluster,
//   autoDeploy: false,
//   image: codePipelineStack.builtImage,
// });



// cdk8s

import { IaCPipelineStack } from '../lib/infra-pipeline';
import { InfraStack } from '../lib/infra-stack';


new IaCPipelineStack(app, 'IaCPipeline');

new InfraStack(app, 'InfraStack', {
    env: { account: process.env['CDK_DEFAULT_ACCOUNT'], region: 'us-east-2' },
    tags: {
        project: "cdk8s-test"
    }
});


import { AppStack } from '../lib/app-pipeline';

new AppStack(app, 'AppStack');


import { DemoStack } from '../lib/demo-pipeline';


new DemoStack(app, 'DemoStack');
