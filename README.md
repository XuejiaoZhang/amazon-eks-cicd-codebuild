# CI/CD (CodeCommit, CodeBuild, CodePipeline) with EKS/ECS-EC2/ECS-Fargate as backend implemented with Amazon CDK 
This project is a rough version, will keep enriching.

## Usage

EKS as Backend
- Refer to README_eks.md
- Notice: CodeDeploy and deploy stage of CodePipeline don’t support EKS yet.
- After deploy, it's needed to push code to CodeCommit and manually adjust buildspec.yaml to have the EKS resources successfully created, to be fixed.
- When destroy with new VPC created earlier, `kubectl delete svc/flask-svc deploy/flask` or manually delete load balancer, then `cdk destroy`.


ECS-EC2 as Backend
Setup:
- Specify the stack to create in the `cdk/bin/cdk.ts` file
- `npm run build`
- `cdk deploy`
- Manually push code to CodeCommit repo and pipeline will be triggered
Destroy:
- `cdk destroy`


ECS-Fargate as Backend
Setup:
- Specify the stack to create in the `cdk/bin/cdk.ts` file
- `npm run build`
- `cdk deploy`
- Manually push code to CodeCommit repo and pipeline will be triggered
Destroy:
- `cdk destroy`


ECS-Fargate as Backend enriched version 1.0: with CloudFormation to Deploy in the Pipeline
Setup:
- Specify the stack to create in the `cdk/bin/cdk.ts` file
- `npm run build`
- `cdk deploy ClusterStack`
- `cdk deploy CodePipelineStack`, AppServiceDeployStack will be deployed as nested stack
- Manually push code to CodeCommit repo and pipeline will be triggered
Destroy:
- `cdk destroy AppServiceDeployStack`, if AppServiceDeployStack is not destroyed fiest, it will fail，then grant permissions to the stack role and delete the stack.
- `cdk destroy CodePipelineStack`
- `cdk destroy ClusterStack`


TODO:
- Split pipeline into dev, uat, prod
- Support Blue/Green deploy, for references [mageDetail.json File for Amazon ECS Blue/Green Deployment Actions](https://docs.aws.amazon.com/codepipeline/latest/userguide/file-reference.html), [Amazon ECS Blue/Green Deployment](https://blog.51cto.com/wzlinux/2470181?source=dra)  
- Grant limited but enough permissions to service Role
- Expose moren configurations of the entire infrastructure
- Support Github repo, use Secrets Manager to store Github Credentials
- Support existed ECR repo, EKS/ECS cluster (eks.Cluster.fromClusterAttributes()), Code repo 
- Evaluate using cdk lib( @aws-cdk/aws-eks) to manage EKS resources instead of kubectl cli, but then it might be not as convenient as managing k8s yaml, also parameters passing
- Support monitoring, auto-scaling EKS/ECS cluster (metrics-server), logging
- For Eks, LB, ECR repo, S3 resources need to be manually deleted; For ECS, ECR repo; S3 resources need to be manually deleted.
- Prepare a flask app with DB connection more close to real case.
- Use AWS SSM parameter to store configurations of CDK stack, even DB configurations.
- Clean up the original code/Readme a little bit.
- Refactor the project into support choosing modules(Repo: CodeCommit and Github; CD backend: EKS, ECS-Fargate, ECS-EC2 etc.)
- Create a frontend UI console for easy use.



