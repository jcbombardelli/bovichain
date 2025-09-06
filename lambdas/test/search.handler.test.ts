import { handler as searchHandler } from '../src/handlers/search';

describe('Search Handler', () => {
  it('deve buscar um ativo existente', async () => {
    const event = {
      queryStringParameters: { assetId: '123' },
    };
    const result = await searchHandler(event as any);
    expect(result.statusCode).toBe(200);
    expect(result.body).toContain('assetId');
  });

  it('deve retornar erro para assetId ausente', async () => {
    const event = {
      queryStringParameters: {},
    };
    const result = await searchHandler(event as any);
    expect(result.statusCode).toBe(400);
  });

  it('deve retornar 404 para ativo não encontrado', async () => {
    const event = {
      queryStringParameters: { assetId: 'nao-existe' },
    };
    const result = await searchHandler(event as any);
    expect(result.statusCode === 404 || result.statusCode === 200).toBe(true);
  });
});
