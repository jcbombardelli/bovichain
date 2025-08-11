
import { EncryptCommand, KMSClient } from "@aws-sdk/client-kms";
import { randomUUID } from 'node:crypto';
import { argv } from 'node:process';

const KEY_ID = process.env.AWS_KMS_KEY_ID || '9390100b-5b24-4cc0-ad45-e24f5439e40b';
const REGION = process.env.AWS_REGION || 'us-east-1';

(async () => {
  const plaintext = argv[2] || randomUUID().toString();

  const kmsClient = new KMSClient({ region: REGION });

  const command = new EncryptCommand({
    KeyId: KEY_ID,
    Plaintext: Buffer.from(plaintext, 'utf-8'),
  });

  const result = await kmsClient.send(command);

  console.log({
    keyId: result.KeyId,
    plaintext: plaintext,
    encryptionAlgorithm: result.EncryptionAlgorithm,
    ciphertextBlob: result.CiphertextBlob ? Buffer.from(result.CiphertextBlob).toString('base64') : null,
  })
})()