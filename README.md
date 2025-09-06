# BoviChain

Sistema blockchain para rastreabilidade de ativos agropecuários, com infraestrutura AWS (CDK), smart contracts Solidity e funções serverless (Lambda).

## Estrutura

- `contracts/` — Smart contracts Solidity (OpenZeppelin)
- `iac/` — Infraestrutura como código (AWS CDK, TypeScript)
- `lambdas/` — Funções AWS Lambda (Node.js/TypeScript)
- `docs/` — Documentação técnica e de arquitetura

## Como rodar

1. Instale dependências:
   ```bash
   pnpm install --recursive
   ```
2. Compile e faça build das lambdas:
   ```bash
   cd lambdas && pnpm run build
   ```
3. Configure variáveis de ambiente (`.env`)
4. Deploy da infraestrutura:
   ```bash
   cd ../iac && pnpm run build && npx cdk deploy
   ```
5. Teste local das lambdas:
   ```bash
   cd ../lambdas && ts-node index.ts
   ```

## Documentação

- [docs/architecture.md](docs/architecture.md)
- [docs/api.md](docs/api.md)
- [docs/contracts.md](docs/contracts.md)
- [docs/deploy.md](docs/deploy.md)
- [postman api](https://warped-capsule-602725.postman.co/workspace/Bombardelli~6b413d79-43f6-45e2-8476-593d77280dac/collection/850927-a381503a-9a9e-4bf1-a88e-08631b4b0823?action=share&creator=850927&active-environment=850927-895f6c7e-d934-4767-b5ef-f0532d24aefc)
