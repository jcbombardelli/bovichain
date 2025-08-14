import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as kms from 'aws-cdk-lib/aws-kms';

export interface KMSResourceProps {
  description?: string;
  alias?: string;
  enableKeyRotation?: boolean;
  removalPolicy?: cdk.RemovalPolicy;
  policy?: cdk.aws_iam.PolicyDocument;
}

export class KMSResource extends Construct {
  public readonly kmsKey: kms.Key;

  constructor(scope: Construct, id: string, props?: KMSResourceProps) {
    super(scope, id);

    this.kmsKey = new kms.Key(this, 'BovichainKMS', {
      description: props?.description ?? 'KMS key for Bovichain',
      alias: props?.alias ?? 'bovichain-kms',
      enableKeyRotation: props?.enableKeyRotation ?? true,
      removalPolicy: props?.removalPolicy ?? cdk.RemovalPolicy.RETAIN,
      policy: props?.policy ?? new cdk.aws_iam.PolicyDocument({
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