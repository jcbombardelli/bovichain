import * as cdk from 'aws-cdk-lib';
import * as kms from 'aws-cdk-lib/aws-kms';
import { Construct } from 'constructs';
import { ApiGatewayResource } from './resources/api.gateway.resource.stack';
import * as apigateway from 'aws-cdk-lib/aws-apigateway';
import path from 'path';
import { LambdaFunctionsResource } from './resources/lambda.resource.stack';
import { ApiSecurityResource } from './resources/api.security.resource.stack';
import { ApiLoggingResource } from './resources/api.logging.resource.stack';
import { KMSResource } from './resources/kms.resource.stack';
import { IAMResourcesStack } from './resources/iam.resources.stack';
import { ApiResources } from './resources/api.resource.stack';
import { ApiModelsResource } from './resources/api.models.resource.stack';

export class BovichainStack extends cdk.Stack {
  public readonly kms: KMSResource;
  public readonly restApi: ApiGatewayResource;
  public readonly logging: ApiLoggingResource;
  public readonly lambdas: LambdaFunctionsResource;
  public readonly security: ApiSecurityResource;

  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    this.kms = new KMSResource(this, 'BovichainKMS', {
      alias: 'bovichain-kms-02'
    });

    this.logging = new ApiLoggingResource(this, 'ApiLogging', {
      logGroupName: '/aws/apigateway/bovichain-api',
      retentionDays: cdk.aws_logs.RetentionDays.ONE_WEEK,
    });

    const cloudWatchRole = IAMResourcesStack.createApiGatewayCloudWatchRole(this);
    new cdk.CfnOutput(this, 'ApiGatewayCloudWatchRoleArn', {
      value: cloudWatchRole.roleArn,
      description: 'ARN of the API Gateway CloudWatch role',
      exportName: `${this.stackName}-ApiGatewayCloudWatchRole`,
    });

    this.restApi = new ApiGatewayResource(this, 'BovichainApi', {
      apiName: 'BoviChain API',
      stageName: process.env.ENV || 'development',
      logDestination: this.logging.logDestination,
    });

    this.restApi.node.addDependency(cloudWatchRole);


    this.lambdas = new LambdaFunctionsResource(this, 'LambdaFunctions', {
      environment: {
        API_VERSION: '1.0.0',
        LOG_LEVEL: 'INFO',
        ENV: process.env.ENV || 'development',
        PRIVATE_KEY: process.env.PRIVATE_KEY || '',
        CONTRACT_BOVICHAIN: process.env.CONTRACT_BOVICHAIN || '',
        POLYGON_RPC: process.env.POLYGON_RPC || '',
        POLYGONSCAN_URL: process.env.POLYGONSCAN_URL || '',
        AWS_KMS_KEY_ID: process.env.AWS_KMS_KEY_ID || ''
      },
    });

    this.kms.kmsKey.grantEncryptDecrypt(this.lambdas.mintFunction);


    // // Model Definitions
    const models = new ApiModelsResource(this, 'ApiModels', this.restApi.api);


    // Endpoints and Resources Definition
    const resources = new ApiResources(this, 'ApiResources', {
      restApi: this.restApi.api,
      mintFunction: this.lambdas.mintFunction,
      searchFunction: this.lambdas.searchFunction,
      mintModel: models.mintModel,
      searchModel: models.searchModel,
    });

    // Security Configuration
    this.security = new ApiSecurityResource(this, 'ApiSecurity', {
      restApi: this.restApi.api,
      apiKeyName: 'bovichain-api-key',
      usagePlanName: 'bovichain-usage-plan',
      rateLimit: 100,
      burstLimit: 200,
      monthlyQuota: 10000,
    });
    
  }
}
