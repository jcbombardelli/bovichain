import * as cdk from 'aws-cdk-lib';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as nodejs from 'aws-cdk-lib/aws-lambda-nodejs';
import { Construct } from 'constructs';
import { execSync } from 'node:child_process';

import path from 'node:path';
import fs from 'node:fs';

export interface LambdaFunctionsProps {
  environment?: { [key: string]: string };
}

export class LambdaFunctionsResource extends Construct {
  public readonly mintFunction: lambda.Function;
  public readonly searchFunction: lambda.Function;

  constructor(scope: Construct, id: string, props?: LambdaFunctionsProps) {
    super(scope, id);

    const environment = {
      ENV: 'development',
      ...props?.environment,
    };

    const lambdasSourcePath = path.join(__dirname, '../../../lambdas');
    const lambdasDistPath = path.join(lambdasSourcePath, 'dist');
    
    try {
      const lambdasSourcePathExists = fs.existsSync(lambdasSourcePath);
      let lambdasDistPathExists = fs.existsSync(lambdasDistPath);
      if(!lambdasDistPathExists) {
        fs.mkdirSync(lambdasDistPath, {recursive: true});
        lambdasDistPathExists = fs.existsSync(lambdasDistPath);
      }

      if (lambdasDistPathExists && lambdasSourcePathExists) {
        const mintLambdaExists = fs.existsSync(path.join(lambdasDistPath, 'mint.js'));
        const searchLambdaExists = fs.existsSync(path.join(lambdasDistPath, 'search.js'));

        let buildCommand = 'npm run build';
        let runBuild = false;

        if (!mintLambdaExists && !searchLambdaExists) {
          console.log(`❗ Missing Lambda functions in ${lambdasDistPath}. Running build.`);
          runBuild = true;
        } else if (!searchLambdaExists) {
          console.log(`❗ Missing search.js function in ${lambdasDistPath}. Running build.`);
          runBuild = true;
        } else if (!mintLambdaExists) {
          console.log(`❗ Missing mint.js function in ${lambdasDistPath}. Running build.`);
          runBuild = true;
        } else {
          console.log(`📦 Found mint.js and search.js in ${lambdasDistPath}. Skipping lambdas build.`);
          runBuild = false;
        }

        if(runBuild) {
          console.log(`🧩 Starting build process for Lambda functions in ${lambdasSourcePath}`);
          execSync(buildCommand, { cwd: lambdasSourcePath, stdio: 'inherit' });
          console.log('☑️ Build process completed successfully.');
        }

      } else {
        console.log(`❗ Lambdas source path ${lambdasSourcePath} or dist path ${lambdasDistPath} does not exist. Cannot build Lambda functions.`);
        throw new Error('Lambdas source or dist path does not exist.');
      }
      
    } catch (error) {
      console.error('Error executing command:', error);
      throw error;
    }

    this.mintFunction = new lambda.Function(this, 'MintFunction', {
      functionName: `bovichain-mint-${environment.ENV}`,
      runtime: lambda.Runtime.NODEJS_22_X,
      handler: 'mint.handler',
      code: lambda.Code.fromAsset(lambdasDistPath),
      timeout: cdk.Duration.seconds(30),
      memorySize: 256,
      environment: environment,
      description: 'Lambda function for minting operations',
    });

    this.searchFunction = new lambda.Function(this, 'SearchFunction', {
      functionName: `bovichain-search-${environment.ENV}`,
      runtime: lambda.Runtime.NODEJS_22_X,
      handler: 'search.handler',
      code: lambda.Code.fromAsset(lambdasDistPath),
      timeout: cdk.Duration.seconds(15),
      memorySize: 128,
      environment: environment,
      description: 'Lambda function for searching operations',
    });

  }
}