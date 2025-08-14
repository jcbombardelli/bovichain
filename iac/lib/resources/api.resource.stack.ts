import * as apigateway from 'aws-cdk-lib/aws-apigateway';
import * as lambda from 'aws-cdk-lib/aws-lambda';

import { Construct } from 'constructs';

export interface ApiResourcesProps {
  restApi: apigateway.RestApi;
  mintFunction: lambda.Function;
  searchFunction: lambda.Function;
  mintModel: apigateway.Model;
  searchModel: apigateway.Model;
}


export class ApiResources extends Construct {

  constructor(scope: Construct, id: string, props: ApiResourcesProps) {
    super(scope, id);

    const mintIntegration = new apigateway.LambdaIntegration(props.mintFunction, {
      proxy: true,
      
    })

    const searchIntegration = new apigateway.LambdaIntegration(props.searchFunction, {
      proxy: true,
    })

    props.restApi.root.addMethod('POST', mintIntegration, {
      apiKeyRequired: true,
      requestParameters: {
        'method.request.header.x-api-key': true, // força header presente (400 se faltar)
      },
      requestModels: {
        'application/json': props.mintModel,
      },
    });

    props.restApi.root.addMethod('GET', searchIntegration, {
      apiKeyRequired: true,
      requestParameters: {
        'method.request.header.x-api-key': true, // força header presente (400 se faltar)
        'method.request.querystring.id': true,
      },
    });
  }
}