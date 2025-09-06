# Sample Hardhat Project

This project demonstrates a basic Hardhat use case. It comes with a sample contract, a test for that contract, and a Hardhat Ignition module that deploys that contract.

Smart contracts para rastreabilidade de ativos agropecuários.

```shell
npx hardhat help
npx hardhat test
REPORT_GAS=true npx hardhat test
npx hardhat node
npx hardhat ignition deploy ./ignition/modules/Lock.ts
```

## Estrutura
- `contracts/` — Contratos principais (BoviChain.sol)
- `test/` — Testes unitários (Hardhat)

## Comandos
```bash
pnpm install
pnpm run compile
pnpm run test
```

## Observações
- Baseado em OpenZeppelin
- Eventos emitidos para rastreabilidade
