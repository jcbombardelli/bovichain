# Lambdas

Funções AWS Lambda responsáveis pela lógica de negócio do BoviChain.

## Estrutura
- `src/handlers/` — Handlers principais (`mint.ts`, `search.ts`)
- `src/dto/` — Data Transfer Objects e validações
- `src/providers/aws/` — Integração com AWS (KMS)
- `src/providers/ethereum/` — Integração com Ethereum
- `test/` — Testes unitários (Jest)

## Build
```bash
pnpm install
pnpm run build
```

## Testes
```bash
pnpm test
```

## Observações
- O código é escrito em TypeScript e transpilado para JavaScript antes do deploy.
- As funções utilizam DTOs para validação de entrada.
- O provider KMS é usado para criptografia de dados sensíveis.
[Alchemy Faucet Testnet](https://www.alchemy.com/faucets/polygon-amoy)
[StakePool Faucet](https://faucet.stakepool.dev.br/amoy)

[OKLink Contract Blockchain Explorer](https://www.oklink.com/pt-br/amoy/address/0x98ebe13a21243c5bb8760ea9f1a5351042e23b52)