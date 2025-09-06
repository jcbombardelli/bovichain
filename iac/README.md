# Infraestrutura como Código (CDK)

Infraestrutura do BoviChain definida via AWS CDK (TypeScript).

## Estrutura
- `bin/` — Entrypoint do CDK
- `lib/` — Stacks e constructs (KMS, Lambda, API Gateway, IAM, Logging)
- `test/` — Testes de infraestrutura (Jest, CDK assertions)

## Comandos
```bash
pnpm install
pnpm run build
npx cdk deploy
```

## Observações
- Modularização por recurso facilita manutenção
- Uso de contextos para ambientes
- Testes automatizados para stacks