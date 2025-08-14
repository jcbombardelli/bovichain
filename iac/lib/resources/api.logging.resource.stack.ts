import * as cdk from 'aws-cdk-lib';
import * as logs from 'aws-cdk-lib/aws-logs';
import * as apigateway from 'aws-cdk-lib/aws-apigateway';
import { Construct } from 'constructs';

export interface ApiLoggingProps {
  logGroupName?: string;
  retentionDays?: logs.RetentionDays;
}

export class ApiLoggingResource extends Construct {
  public readonly logGroup: logs.LogGroup;
  public readonly logDestination: apigateway.LogGroupLogDestination;

  constructor(scope: Construct, id: string, props?: ApiLoggingProps) {
    super(scope, id);

    this.logGroup = new logs.LogGroup(this, 'LogGroup', {
      logGroupName: props?.logGroupName || '/aws/apigateway/bovichain',
      retention: props?.retentionDays || logs.RetentionDays.ONE_WEEK,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
    });

    this.logDestination = new apigateway.LogGroupLogDestination(this.logGroup);
  }
}