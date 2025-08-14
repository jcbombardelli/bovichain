import * as cdk from 'aws-cdk-lib';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import { Template } from 'aws-cdk-lib/assertions';
import { LambdaFunctions } from '../../lib/resources/lambda.resource.stack';

describe('Lambda Functions Resource', () => {
  test('should create two Lambda functions with correct configurations', () => {
    const app = new cdk.App();
    const stack = new cdk.Stack(app, 'TestStack');
    
    new LambdaFunctions(stack, 'TestLambdas', {
      environment: { TEST: 'true' },
    });

    const template = Template.fromStack(stack);

    // Verify two Lambda functions are created
    template.resourceCountIs('AWS::Lambda::Function', 2);

    // Verify specific configurations
    template.hasResourceProperties('AWS::Lambda::Function', {
      Runtime: 'nodejs22.x',
      Timeout: 30,
      MemorySize: 256,
    });
  });

  test('apply custom environment variables', () => {
    const app = new cdk.App();
    const stack = new cdk.Stack(app, 'TestStack');
    
    new LambdaFunctions(stack, 'TestLambdas', {
      environment: { 
        CUSTOM_VAR: 'custom_value',
        NODE_ENV: 'test' 
      },
    });

    const template = Template.fromStack(stack);

    template.hasResourceProperties('AWS::Lambda::Function', {
      Environment: {
        Variables: {
          NODE_ENV: 'test',
          CUSTOM_VAR: 'custom_value',
        },
      },
    });
  });
});