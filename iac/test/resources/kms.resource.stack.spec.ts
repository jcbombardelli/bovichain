import * as cdk from 'aws-cdk-lib';
import * as iam from 'aws-cdk-lib/aws-iam';
import { Template, Match } from 'aws-cdk-lib/assertions';
import { KMSResource } from '../../lib/resources/kms.resource.stack';

describe('KMS Resource Stack', () => {
  let app: cdk.App;
  let stack: cdk.Stack;

  beforeEach(() => {
    app = new cdk.App();
    stack = new cdk.Stack(app, 'TestStack');
  });

  test('should create KMS key with correct configuration', () => {
    new KMSResource(stack, 'TestKMS');
    const template = Template.fromStack(stack);

    // Verify KMS key is created
    template.resourceCountIs('AWS::KMS::Key', 1);

    // Verify key properties
    template.hasResourceProperties('AWS::KMS::Key', {
      Description: 'KMS key for Bovichain',
      EnableKeyRotation: true,
      KeyPolicy: {
        Statement: [
          {
            Effect: 'Allow',
            Principal: {
              AWS: {
                'Fn::Join': [
                  '',
                  [
                    'arn:',
                    { Ref: 'AWS::Partition' },
                    ':iam::',
                    { Ref: 'AWS::AccountId' },
                    ':root'
                  ]
                ]
              }
            },
            Action: 'kms:*',
            Resource: '*'
          }
        ]
      }
    });
  });

  test('should create KMS alias with correct name', () => {
    new KMSResource(stack, 'TestKMS');
    const template = Template.fromStack(stack);

    // Verify alias is created
    template.resourceCountIs('AWS::KMS::Alias', 1);

    // Verify alias properties
    template.hasResourceProperties('AWS::KMS::Alias', {
      AliasName: 'alias/bovichain-kms'
    });
  });

  test('should have key rotation enabled', () => {
    new KMSResource(stack, 'TestKMS');
    const template = Template.fromStack(stack);

    template.hasResourceProperties('AWS::KMS::Key', {
      EnableKeyRotation: true
    });
  });

  test('should have RETAIN removal policy', () => {
    new KMSResource(stack, 'TestKMS');
    const template = Template.fromStack(stack);

    template.hasResource('AWS::KMS::Key', {
      DeletionPolicy: 'Retain',
      UpdateReplacePolicy: 'Retain'
    });
  });

  test('should expose KMS key as public readonly property', () => {
    const kmsResource = new KMSResource(stack, 'TestKMS');
    
    expect(kmsResource.kmsKey).toBeDefined();
    expect(kmsResource.kmsKey.keyId).toBeDefined();
    expect(kmsResource.kmsKey.keyArn).toBeDefined();
  });

  test('should have correct IAM policy for account root', () => {
    new KMSResource(stack, 'TestKMS');
    const template = Template.fromStack(stack);

    template.hasResourceProperties('AWS::KMS::Key', {
      KeyPolicy: {
        Statement: Match.arrayWith([
          Match.objectLike({
            Effect: 'Allow',
            Principal: {
              AWS: Match.anyValue()
            },
            Action: 'kms:*',
            Resource: '*'
          })
        ])
      }
    });
  });

  test('should create unique logical IDs for multiple instances', () => {
    const kms1 = new KMSResource(stack, 'KMS1');
    const kms2 = new KMSResource(stack, 'KMS2');

    expect(kms1.kmsKey.node.id).toBe('BovichainKMS');
    expect(kms2.kmsKey.node.id).toBe('BovichainKMS');
    
    // Different parent IDs make them unique
    expect(kms1.node.id).not.toBe(kms2.node.id);
  });

  test('should handle stack-level properties correctly', () => {
    new KMSResource(stack, 'TestKMS');
    const template = Template.fromStack(stack);

    // Verify the template is valid
    expect(() => template.toJSON()).not.toThrow();
    
    // Should have exactly one key and one alias
    const resources = template.toJSON().Resources;
    const kmsKeys = Object.values(resources).filter(
      (resource: any) => resource.Type === 'AWS::KMS::Key'
    );
    const kmsAliases = Object.values(resources).filter(
      (resource: any) => resource.Type === 'AWS::KMS::Alias'
    );

    expect(kmsKeys).toHaveLength(1);
    expect(kmsAliases).toHaveLength(1);
  });
});