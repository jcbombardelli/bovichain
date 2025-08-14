import * as cdk from 'aws-cdk-lib';
import * as apigateway from 'aws-cdk-lib/aws-apigateway';
import * as iam from 'aws-cdk-lib/aws-iam';

import { Construct } from 'constructs';

export interface ApiGatewayStackProps {
  apiName?: string;
  stageName?: string;
  rateLimit?: number;
  burstLimit?: number;
  monthlyQuota?: number;
  logDestination?: cdk.aws_apigateway.IAccessLogDestination;
}

export class ApiGatewayResource extends Construct {
  public readonly api: apigateway.RestApi;

  constructor(scope: Construct, id: string, props?: ApiGatewayStackProps) {
    super(scope, id);

    this.api = new apigateway.RestApi(this, 'BovichainApi', {
      restApiName: props?.apiName || 'BoviChain Crypto API',
      description: 'Bovichain module to manage assets and operations',
      defaultCorsPreflightOptions: {
        allowOrigins: apigateway.Cors.ALL_ORIGINS,
        allowMethods: apigateway.Cors.ALL_METHODS,
        allowHeaders: ['Content-Type', 'X-Amz-Date', 'Authorization', 'X-Api-Key'],
      },
      deployOptions: {
        stageName: props?.stageName ?? 'development',
        accessLogDestination: props?.logDestination || undefined,
        accessLogFormat: apigateway.AccessLogFormat.jsonWithStandardFields(),
        loggingLevel: apigateway.MethodLoggingLevel.INFO,
        dataTraceEnabled: true,
        metricsEnabled: true,
      },
      apiKeySourceType: apigateway.ApiKeySourceType.HEADER,
      endpointConfiguration: {
        types: [apigateway.EndpointType.REGIONAL],
      },
    });


    // // Lambda Functions Instantiation
    // this.lambdas = new LambdaFunctionsResource(this, 'LambdaFunctions', {
    //   environment: {
    //     API_VERSION: '1.0.0',
    //     LOG_LEVEL: 'INFO',
    //   },
    // });

    // // Model Definitions
    // const models = new ApiModelsResource(this, 'ApiModels', this.api);

    // // Endpoints and Resources Definition
    // const resources = new ApiResources(this, 'ApiResources', {
    //   restApi: this.api,
    //   mintFunction: this.lambdas.mintFunction,
    //   searchFunction: this.lambdas.searchFunction,
    //   mintModel: models.mintModel,
    //   searchModel: models.searchModel,
    // });


    // // Security Configuration
    // this.security = new ApiSecurityResource(this, 'ApiSecurity', {
    //   restApi: this.api,
    //   apiKeyName: 'bovichain-api-key',
    //   usagePlanName: 'bovichain-usage-plan',
    //   rateLimit: props?.rateLimit || 100,
    //   burstLimit: props?.burstLimit || 200,
    //   monthlyQuota: props?.monthlyQuota || 10000,
    // });

    // // Outputs
    // new cdk.CfnOutput(this, 'ApiUrl', {
    //   value: this.api.url,
    //   description: 'URL da API Gateway',
    //   exportName: `${this.stackName}-ApiUrl`,
    // });

    // new cdk.CfnOutput(this, 'ApiKeyId', {
    //   value: this.security.apiKey.keyId,
    //   description: 'ID da API Key',
    //   exportName: `${this.stackName}-ApiKeyId`,
    // });

    // new cdk.CfnOutput(this, 'MintFunctionName', {
    //   value: this.lambdas.mintFunction.functionName,
    //   description: 'Mint Function Name',
    //   exportName: `${this.stackName}-MintFunction`,
    // });

    // new cdk.CfnOutput(this, 'SearchFunctionName', {
    //   value: this.lambdas.searchFunction.functionName,
    //   description: 'Search Function Name',
    //   exportName: `${this.stackName}-SearchFunction`,
    // });
  }
}