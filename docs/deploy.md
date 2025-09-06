# Deploy e Operação

## Pré-requisitos
- AWS CLI configurado
- Permissões para criar recursos (IAM, Lambda, KMS, API Gateway)
- Node.js, pnpm, Docker (opcional para bundling)

## Passos

1. Instale dependências:
   ```bash
   pnpm install --recursive
   ```
2. Compile as lambdas:
   ```bash
   cd lambdas && pnpm run build
   ```
3. Configure variáveis de ambiente (`.env`)
4. Deploy da infraestrutura:
   ```bash
   cd ../iac && pnpm run build && npx cdk deploy
   ```

## Testes
- Execute `pnpm test` em cada módulo para rodar os testes unitários

## Observações
- O deploy cria todos os recursos necessários na AWS
- Para atualizar stacks, use `cdk deploy` novamente
- Para remover, use `cdk destroy`
