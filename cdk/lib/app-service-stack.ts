#!/usr/bin/env node

import ec2 = require('@aws-cdk/aws-ec2');
import ecs = require('@aws-cdk/aws-ecs');
import elbv2 = require('@aws-cdk/aws-elasticloadbalancingv2');
import cdk = require('@aws-cdk/core');
import ecsPatterns = require('@aws-cdk/aws-ecs-patterns');


export interface AppServiceStackProps extends cdk.StackProps {
  vpc: ec2.Vpc;
  cluster: ecs.Cluster;
  image?: ecs.ContainerImage;
  containerPort?:number;
}

export class AppServiceStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props: AppServiceStackProps) {
    super(scope, id, props);

    // TODO:  FargateTaskDefinition: multiple options
    const taskDefinition = new ecs.TaskDefinition(this, 'task', {
      compatibility: ecs.Compatibility.FARGATE,
      memoryMiB: '512',
      cpu: '256'
    });

    const container = taskDefinition.addContainer("WebServer", {
      image: props.image || ecs.ContainerImage.fromAsset(__dirname + '/../../flask-docker-app/'),
      environment: {
        PLATFORM: 'Amazon ECS Fargate' // TODO
      },
    });
    container.addPortMappings({ containerPort: props.containerPort || 80 });

    const service = new ecsPatterns.ApplicationLoadBalancedFargateService(this, 'flask', {
        cluster: props.cluster,
        taskDefinition,
    })

    // CfnOutput the DNS where you can access your service
    // new cdk.CfnOutput(this, 'LoadBalancerDNS', { value: service.loadBalancer.loadBalancerDnsName });
  }
}
