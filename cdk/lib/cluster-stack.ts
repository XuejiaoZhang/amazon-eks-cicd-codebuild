#!/usr/bin/env node

import cdk = require('@aws-cdk/core');
import ec2 = require('@aws-cdk/aws-ec2');
import ecs = require('@aws-cdk/aws-ecs');


export interface ClusterStackProps extends cdk.StackProps {
    cidr: string;
    maxAzs: number;
    clusterType: string; // support: ecs-ec2, ecs-fargate, eks, default: ecs-fargate
    clusterName: string;
}

export class ClusterStack extends cdk.Stack {
    public readonly vpc: ec2.Vpc;
    public readonly cluster: ecs.Cluster;

    constructor(scope: cdk.Construct, id: string, props: ClusterStackProps) {
        super(scope, id, props);

        this.vpc = new ec2.Vpc(this, 'Vpc', {
            maxAzs: props.maxAzs,
            cidr: props.cidr
        })

        if (props.clusterType == "ecs-ec2") {
          console.log("ecs-ec2");
        } else if (props.clusterType == "eks") {
          console.log("eks");
        } else {
          this.cluster = new ecs.Cluster(this, 'FargateCluster', {
              vpc: this.vpc,
              clusterName: props.clusterName
          })
        }

    }
}
