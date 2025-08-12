import { KMSProvider } from '../providers/aws/kms.provider';
import { EthereumProvider } from '../providers/ethereum/ethereum.provider';
import { MintRequestHandlerDTO, MintResponsenHandlerDTO } from '../types';
import logger from '../utils/logger.util';


export const handler = async (event: MintRequestHandlerDTO): Promise<MintResponsenHandlerDTO> => {

  if(event.id === undefined || event.id === null) return {body: "id is required", statusCode: 400};
  if(Number(event.id) < 1) return {body: "id must be positive", statusCode: 400};
  if(!event.name || event.name === "") return {body: "name is required", statusCode: 400};


  if(!process.env.PRIVATE_KEY) {
    logger.error('Request cannot be processed due to missing PRIVATE_KEY.');
    return { statusCode: 500, body: 'Request cannot be processed.' };
  }

  try {
    const kmsProvider = new KMSProvider();
    const decryptedKey = await kmsProvider.decrypt(process.env.PRIVATE_KEY);

    const ethereumProvider = new EthereumProvider();
    const response = await ethereumProvider.mint({
      data: JSON.stringify(event),
      id: event.id,
      name: event.name,
    }, decryptedKey);

    return {
      body: response,
      statusCode: 200
    } as MintResponsenHandlerDTO;

  } catch (error) {
    logger.error(`Error occurred while processing request: ${error}`);
    return { statusCode: 500, body: 'Error occurred while processing request.' };
  }

}