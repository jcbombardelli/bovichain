# API BoviChain

REST API para interação com o sistema de rastreabilidade.

## Endpoints

### POST /mint
- Descrição: Realiza o mint de um ativo
- Body: JSON (ver DTO em `lambdas/src/dto/mint.dto.ts`)
- Query param: `dryrun` (opcional)
- Headers: `x-api-key` (obrigatório)
- Respostas: 200 (sucesso), 400 (erro de validação), 500 (erro interno)

### GET /search
- Descrição: Busca informações de um ativo
- Query param: `assetId` (obrigatório)
- Headers: `x-api-key` (obrigatório)
- Respostas: 200 (sucesso), 404 (não encontrado), 400 (parâmetro inválido)

## Segurança
- API Key obrigatória
- Validação de parâmetros
- Uso de KMS para dados sensíveis

## Exemplos de uso
Ver exemplos em `docs/deploy.md`.
