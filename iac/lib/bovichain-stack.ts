import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as kms from 'aws-cdk-lib/aws-kms';
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class BovichainStack extends cdk.Stack {
  public readonly kmsKey: kms.Key;

  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    this.kmsKey = new kms.Key(this, 'BovichainKMS', {
      description: 'KMS key for Bovichain',
      alias: 'bovichain-kms',
      enableKeyRotation: true,
      removalPolicy: cdk.RemovalPolicy.RETAIN,
      policy: new cdk.aws_iam.PolicyDocument({
        statements: [
          new cdk.aws_iam.PolicyStatement({
            actions: ['kms:*'],
            principals: [new cdk.aws_iam.AccountRootPrincipal()],
            resources: ['*'],
            effect: cdk.aws_iam.Effect.ALLOW,
          }),
        ],
      }),
    });
  }
}
