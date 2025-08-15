import { EthereumProvider } from '../providers/ethereum/ethereum.provider';
import { SearchRequestHandlerDTO, SearchResultHandlerDTO } from '../types';
import logger from '../utils/logger.util';


export const handler = async (event: SearchRequestHandlerDTO): Promise<SearchResultHandlerDTO> => {

  logger.defaultMeta = { requestId: event.requestContext?.requestId || `Request ID not Informed` };

  logger.debug('Received event:', JSON.stringify(event, null, 2));
  const { id } = event.queryStringParameters;
  
  if(!id)
    return { statusCode: 400, body: 'id is required' };

    // Somente inteiros positivos
  if (!/^\d+$/.test(id)) {
    return { statusCode: 400, body: 'id must be a positive integer' };
  }

  const idNum = Number(id);
  if (!Number.isSafeInteger(idNum)) {
    return { statusCode: 400, body: 'id is out of range' };
  }

  try {
    const ethereumProvider = new EthereumProvider();
    const response = await ethereumProvider.tokenURI(idNum);

    return { statusCode: 200, body: response };
  } catch (error) {
    logger.error(`Error occurred while fetching token URI: ${error}`);
    return { statusCode: 500, body: 'Error occurred while fetching token URI.' };
  }
}
