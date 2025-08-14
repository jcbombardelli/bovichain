import * as apigateway from 'aws-cdk-lib/aws-apigateway';
import { Construct } from 'constructs';

export class ApiModelsResource extends Construct {
  public readonly mintModel: apigateway.Model;
  public readonly searchModel: apigateway.Model;

  constructor(scope: Construct, id: string, restApi: apigateway.RestApi) {
    super(scope, id);

        // Modelo para requisição de Mint (POST com body)
    this.mintModel = new apigateway.Model(this, 'MintModel', {
      restApi,
      modelName: 'MintRequest',
      contentType: 'application/json',
      schema: {
        schema: apigateway.JsonSchemaVersion.DRAFT4,
        title: 'Mint NFT Request',
        type: apigateway.JsonSchemaType.OBJECT,
        properties: {
          animalId: {
            type: apigateway.JsonSchemaType.STRING,
            description: 'ID único do animal',
            pattern: '^[a-zA-Z0-9-_]+$',
            minLength: 1,
            maxLength: 50,
          },
          metadata: {
            type: apigateway.JsonSchemaType.OBJECT,
            description: 'Metadados do animal',
            properties: {
              name: {
                type: apigateway.JsonSchemaType.STRING,
                description: 'Nome do animal',
                minLength: 1,
                maxLength: 100,
              },
              breed: {
                type: apigateway.JsonSchemaType.STRING,
                description: 'Raça do animal',
                minLength: 1,
                maxLength: 50,
              },
              birthDate: {
                type: apigateway.JsonSchemaType.STRING,
                description: 'Data de nascimento (ISO 8601)',
                pattern: '^\\d{4}-\\d{2}-\\d{2}$',
              },
              weight: {
                type: apigateway.JsonSchemaType.NUMBER,
                description: 'Peso em kg',
                minimum: 0,
                maximum: 2000,
              },
              location: {
                type: apigateway.JsonSchemaType.OBJECT,
                properties: {
                  farm: {
                    type: apigateway.JsonSchemaType.STRING,
                    description: 'Nome da fazenda',
                  },
                  coordinates: {
                    type: apigateway.JsonSchemaType.OBJECT,
                    properties: {
                      lat: { type: apigateway.JsonSchemaType.NUMBER },
                      lng: { type: apigateway.JsonSchemaType.NUMBER },
                    },
                    required: ['lat', 'lng'],
                  },
                },
                required: ['farm'],
              },
            },
            required: ['name', 'breed', 'birthDate'],
          },
          ownerAddress: {
            type: apigateway.JsonSchemaType.STRING,
            description: 'Endereço Ethereum do proprietário',
            pattern: '^0x[a-fA-F0-9]{40}$',
          },
        },
        required: ['animalId', 'metadata', 'ownerAddress'],
      },
    });

    // Para Search, NÃO criamos modelo pois usa query parameters
    // Query params são validados via requestParameters, não via modelo JSON
    this.searchModel = new apigateway.Model(this, 'SearchModel', {
      restApi,
      modelName: 'SearchRequest', 
      contentType: 'application/json',
      schema: {
        schema: apigateway.JsonSchemaVersion.DRAFT4,
        title: 'Search Request (Empty - uses query params)',
        type: apigateway.JsonSchemaType.OBJECT,
        description: 'Este modelo está vazio pois Search usa query parameters',
        additionalProperties: false,
      },
    });

    // // Modelos de resposta (opcionais, para documentação)
    // this.mintResponseModel = new apigateway.Model(this, 'MintResponseModel', {
    //   restApi,
    //   modelName: 'MintResponse',
    //   contentType: 'application/json',
    //   schema: {
    //     schema: apigateway.JsonSchemaVersion.DRAFT4,
    //     title: 'Mint Response',
    //     type: apigateway.JsonSchemaType.OBJECT,
    //     properties: {
    //       success: {
    //         type: apigateway.JsonSchemaType.BOOLEAN,
    //         description: 'Status da operação',
    //       },
    //       tokenId: {
    //         type: apigateway.JsonSchemaType.STRING,
    //         description: 'ID do token NFT criado',
    //       },
    //       transactionHash: {
    //         type: apigateway.JsonSchemaType.STRING,
    //         description: 'Hash da transação blockchain',
    //       },
    //       metadata: {
    //         type: apigateway.JsonSchemaType.OBJECT,
    //         description: 'Metadados confirmados',
    //       },
    //     },
    //     required: ['success', 'tokenId'],
    //   },
    // });

    // this.searchResponseModel = new apigateway.Model(this, 'SearchResponseModel', {
    //   restApi,
    //   modelName: 'SearchResponse',
    //   contentType: 'application/json',
    //   schema: {
    //     schema: apigateway.JsonSchemaVersion.DRAFT4,
    //     title: 'Search Response',
    //     type: apigateway.JsonSchemaType.OBJECT,
    //     properties: {
    //       success: {
    //         type: apigateway.JsonSchemaType.BOOLEAN,
    //       },
    //       results: {
    //         type: apigateway.JsonSchemaType.ARRAY,
    //         items: {
    //           type: apigateway.JsonSchemaType.OBJECT,
    //           properties: {
    //             tokenId: { type: apigateway.JsonSchemaType.STRING },
    //             animalId: { type: apigateway.JsonSchemaType.STRING },
    //             metadata: { type: apigateway.JsonSchemaType.OBJECT },
    //             owner: { type: apigateway.JsonSchemaType.STRING },
    //             mintDate: { type: apigateway.JsonSchemaType.STRING },
    //           },
    //         },
    //       },
    //       totalResults: {
    //         type: apigateway.JsonSchemaType.NUMBER,
    //       },
    //       page: {
    //         type: apigateway.JsonSchemaType.NUMBER,
    //       },
    //     },
    //     required: ['success', 'results'],
    //   },
    // });
  }
}