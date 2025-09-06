# Arquitetura do BoviChain

O projeto BoviChain utiliza uma arquitetura baseada em microsserviços serverless na AWS, integrando blockchain para rastreabilidade de ativos agropecuários.

## Componentes Principais

- **AWS CDK**: Infraestrutura como código (TypeScript)
- **AWS Lambda**: Funções serverless para lógica de negócio
- **AWS KMS**: Gerenciamento de chaves e criptografia
- **API Gateway**: Exposição de endpoints REST
- **CloudWatch**: Logs e monitoramento
- **Solidity**: Smart contracts para rastreabilidade

## Fluxo

1. Usuário faz requisição à API Gateway
2. API Gateway aciona Lambda (mint/search)
3. Lambda valida dados, interage com KMS e Ethereum
4. Eventos são emitidos no contrato BoviChain
5. Logs e métricas são enviados ao CloudWatch

## Diagrama

```
Usuário → API Gateway → Lambda → (KMS, Ethereum) → Blockchain
                                 ↓
                             CloudWatch
```
