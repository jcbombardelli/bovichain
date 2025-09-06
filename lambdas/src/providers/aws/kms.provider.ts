

import { KMSClient, DecryptCommand } from "@aws-sdk/client-kms";
import logger from '../../utils/logger.util';


export class KMSProvider {
  private kmsClient: KMSClient;

  constructor() {
    const { AWS_REGION, AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY } = process.env;

    this.kmsClient = new KMSClient({
      region: AWS_REGION,
      ...(AWS_ACCESS_KEY_ID && AWS_SECRET_ACCESS_KEY ? {
        credentials: {
          accessKeyId: AWS_ACCESS_KEY_ID,
          secretAccessKey: AWS_SECRET_ACCESS_KEY,
        }
      } : {}),
    });

  }

  async decrypt(encryptedData: string): Promise<string> {
    try {

      if (!encryptedData) {
        throw new Error("Encrypted data is required for decryption.");
      }

      logger.info(`Starting decryption for encrypted data: ${encryptedData}`);

      const command = new DecryptCommand({
        CiphertextBlob: Buffer.from(encryptedData, 'base64'),
      });

      const result = await this.kmsClient.send(command);
      logger.info("Decryption successful.");

      return Buffer.from(result.Plaintext!).toString('utf-8');
    } catch (error) {
      logger.error("Error decrypting data:", error);
      throw error;
    }
  }
}
