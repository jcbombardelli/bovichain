import { EthereumProvider } from '../providers/ethereum/ethereum.provider';
import logger from '../utils/logger.util';


export type SearchRequestHandlerDTO = {
  queryStringParameters: { id: string };
  requestContext?: any;
  [key: string]: Record<string, any>;
};
export type SearchResultHandlerDTO = any;


export const handler = async (event: SearchRequestHandlerDTO): Promise<SearchResultHandlerDTO> => {

  logger.defaultMeta = { requestId: event.requestContext?.requestId || `Request ID not Informed` };

  logger.debug('Received event:', JSON.stringify(event, null, 2));
  const { id } = event.queryStringParameters;
  
  if(!id)
    return { statusCode: 400, body: 'id is required' };

  try {
    const ethereumProvider = new EthereumProvider();
    const response = await ethereumProvider.tokenURI(Number(id));

    logger.info(`Ethereum provider response: ${response}`);
    return { statusCode: 200, body: response };
  } catch (error) {
    logger.error(`Error occurred while fetching token URI: ${error}`);
    return { statusCode: 500, body: 'Error occurred while fetching token URI.' };
  }
}
