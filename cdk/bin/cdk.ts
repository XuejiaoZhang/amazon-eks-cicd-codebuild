#!/usr/bin/env node
import 'source-map-support/register';
import cdk = require('@aws-cdk/core');

// import { CdkStack } from '../lib/cdk-stack';
// import { CdkStack } from '../lib/cdk-stack-eks-pipeline';
// import { CdkStack } from '../lib/cdk-stack-fargate-pipeline';

import { CdkStack } from '../lib/cdk-stack-ecs-ec2-pipeline';

const app = new cdk.App();

const env = {
  region: app.node.tryGetContext('region') || process.env.CDK_INTEG_REGION || process.env.CDK_DEFAULT_REGION,
  account: app.node.tryGetContext('account') || process.env.CDK_INTEG_ACCOUNT || process.env.CDK_DEFAULT_ACCOUNT
};


new CdkStack(app, 'CdkStack', { env });
