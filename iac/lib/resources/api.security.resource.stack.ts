import * as cdk from 'aws-cdk-lib';
import * as apigateway from 'aws-cdk-lib/aws-apigateway';
import { Construct } from 'constructs';

export interface ApiSecurityProps {
  restApi: apigateway.RestApi;
  apiKeyName?: string;
  usagePlanName?: string;
  rateLimit?: number;
  burstLimit?: number;
  monthlyQuota?: number;
}

export class ApiSecurityResource extends Construct {
  public readonly apiKey: apigateway.ApiKey;
  public readonly usagePlan: apigateway.UsagePlan;

  constructor(scope: Construct, id: string, props: ApiSecurityProps) {
    super(scope, id);

    this.apiKey = new apigateway.ApiKey(this, 'ApiKey', {
      apiKeyName: props.apiKeyName || 'bovichain-api-key',
      description: 'API Key for BoviChain API',
    });

    this.usagePlan = new apigateway.UsagePlan(this, 'UsagePlan', {
      name: props.usagePlanName || 'bovichain-usage-plan',
      description: 'Usage plan for BoviChain API',
      throttle: {
        rateLimit: props.rateLimit || 100,
        burstLimit: props.burstLimit || 200,
      },
      quota: {
        limit: props.monthlyQuota || 10000,
        period: apigateway.Period.MONTH,
      },
    });

    this.usagePlan.addApiKey(this.apiKey);
    this.usagePlan.addApiStage({
      stage: props.restApi.deploymentStage,
    });
  }
}