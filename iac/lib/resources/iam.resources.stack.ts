import * as cdk from 'aws-cdk-lib';
import * as iam from 'aws-cdk-lib/aws-iam';
import * as apigateway from 'aws-cdk-lib/aws-apigateway';
import { Construct } from 'constructs';

export class IAMResourcesStack extends Construct {
  

  public static createApiGatewayCloudWatchRole(scope: Construct): iam.Role {
    // Criar IAM Role para API Gateway fazer logging
    const cloudWatchRole = new iam.Role(scope, 'ApiGatewayCloudWatchRole', {
      assumedBy: new iam.ServicePrincipal('apigateway.amazonaws.com'),
      description: 'IAM role for API Gateway CloudWatch logging',
      managedPolicies: [
        iam.ManagedPolicy.fromAwsManagedPolicyName('service-role/AmazonAPIGatewayPushToCloudWatchLogs'),
      ],
    });

    new apigateway.CfnAccount(scope, 'ApiGatewayAccount', {
      cloudWatchRoleArn: cloudWatchRole.roleArn,
    });

    return cloudWatchRole;
  }
}