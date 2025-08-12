

import { KMSClient, DecryptCommand } from "@aws-sdk/client-kms";
import logger from '../../utils/logger.util';


export class KMSProvider {
  private kmsClient: KMSClient;

  constructor() {
    this.kmsClient = new KMSClient({ region: process.env.AWS_REGION });
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
