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
