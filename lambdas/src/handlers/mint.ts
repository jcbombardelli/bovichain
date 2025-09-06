import { KMSProvider } from '../providers/aws/kms.provider';
import { EthereumProvider } from '../providers/ethereum/ethereum.provider';
import { MintRequestHandlerDTO, MintResponseHandlerDTO } from '../types';
import logger from '../utils/logger.util';


export const handler = async (event: MintRequestHandlerDTO): Promise<MintResponseHandlerDTO> => {

  if(event.id === undefined || event.id === null) {
    logger.error('id is required', event);
    return {body: "id is required", statusCode: 400};
  }
  if(Number(event.id) < 1) {
    logger.error('id must be positive', event);
    return {body: "id must be positive", statusCode: 400};
  }
  if(!event.name || event.name === "") {
    logger.error('name is required', event);
    return {body: "name is required", statusCode: 400};
  }

  if(!process.env.PRIVATE_KEY) {
    logger.error('Request cannot be processed due to missing PRIVATE_KEY.');
    return { statusCode: 500, body: 'Request cannot be processed.' };
  }

  try {
    const kmsProvider = new KMSProvider();
    const decryptedKey = await kmsProvider.decrypt(process.env.PRIVATE_KEY);

    const ethereumProvider = new EthereumProvider();

    const mintBodyRequest = {
      data: JSON.stringify(event),
      id: event.id,
      name: event.name,
    };

    logger.debug(mintBodyRequest);

    const response = await ethereumProvider.mint(
      mintBodyRequest, 
      decryptedKey,
      event.queryStringParameters?.dryrun === 'true'
    );

    return {
      body: response,
      statusCode: 200,
    } as unknown as MintResponseHandlerDTO;

  } catch (error) {
    logger.error(`Error occurred while processing request: ${error}`);
    return { statusCode: 500, body: 'Error occurred while processing request.' };
  }

}