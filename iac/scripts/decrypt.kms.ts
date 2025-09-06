
import { DecryptCommand, EncryptCommand, KMSClient } from "@aws-sdk/client-kms";
import { randomUUID } from 'node:crypto';
import { argv } from 'node:process';

const KEY_ID = process.env.AWS_KMS_KEY_ID || '934641e7-14ad-43ef-ab5e-cff88f0b49c7';
const REGION = process.env.AWS_REGION || 'us-east-1';

(async () => {
  const encryptedData = argv[2];
  if(!encryptedData) {
    console.error('Missing data to decrypt. Usage: npm run decrypt -- <base64-ciphertext-blob>');
    process.exit(1);
  }

  const kmsClient = new KMSClient({ region: REGION, profile: 'bovichain' });

  const command = new DecryptCommand({
    CiphertextBlob: Buffer.from(encryptedData, 'base64'),
    KeyId: KEY_ID,
  });

  const result = await kmsClient.send(command);
  const plaintext = Buffer.from(result.Plaintext!).toString('utf-8');

  console.log({
    keyId: result.KeyId,
    plaintext: plaintext,
    encryptionAlgorithm: result.EncryptionAlgorithm,
    ciphertextBlob: encryptedData,
  })
})()