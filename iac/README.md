# Welcome to your CDK TypeScript project

This is a blank project for CDK development with TypeScript.

The `cdk.json` file tells the CDK Toolkit how to execute your app.

## Useful commands

* `npm run build`   compile typescript to js
* `npm run watch`   watch for changes and compile
* `npm run test`    perform the jest unit tests
* `npx cdk deploy`  deploy this stack to your default AWS account/region
* `npx cdk diff`    compare deployed stack with current state
* `npx cdk synth`   emits the synthesized CloudFormation template

# Estrutura Modular da API Gateway Stack

## Vantagens da Separação

### 1. **Reutilização**
- Constructs podem ser reutilizados em outras stacks
- Facilita criação de variações da API

### 2. **Manutenibilidade**
- Cada arquivo tem responsabilidade específica
- Mudanças isoladas não afetam outros componentes

### 3. **Testabilidade**
- Testes unitários focados em cada construct
- Validação independente de componentes

### 4. **Colaboração**
- Diferentes desenvolvedores podem trabalhar em constructs separados
- Menos conflitos de merge

## Estrutura de Arquivos

```
lib/
├── constructs/
│   ├── lambda-functions.ts    # Funções Lambda
│   ├── api-models.ts          # Modelos de validação
│   ├── api-security.ts        # API Key e Usage Plans
│   ├── api-resources.ts       # Recursos e endpoints
│   └── api-logging.ts         # Configuração de logs
├── api-gateway-stack-modular.ts  # Stack principal
└── bovichain-stack.ts         # Stack existente (KMS)

test/
├── constructs/
│   └── lambda-functions.test.ts
└── api-gateway-modular.test.ts
```

## Como Usar

### Deploy da versão modular:
```bash
cdk deploy BovichainApiStackModular
```

### Customizar configurações:
```typescript
new ApiGatewayStackModular(app, 'MyApiStack', {
  apiName: 'Minha API Customizada',
  rateLimit: 200,
  monthlyQuota: 20000,
});
```

### Reutilizar constructs:
```typescript
import { LambdaFunctions } from './constructs/lambda-functions';

// Em outra stack
const lambdas = new LambdaFunctions(this, 'MyLambdas', {
  environment: { STAGE: 'dev' }
});
```