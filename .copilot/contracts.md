# Contratos Solidity

## BoviChain.sol

Contrato principal para rastreabilidade de ativos.

### Eventos
- `AssetMinted(address indexed owner, uint256 assetId, string metadata)`

### Funções
- `mintAsset(address to, string calldata metadata)`
- `getAsset(uint256 assetId)`

## Padrões Utilizados
- OpenZeppelin (ERC721, Ownable)

## Localização
- `contracts/contracts/BoviChain.sol`

## Testes
- Recomenda-se uso do Hardhat para testes unitários dos contratos.
