import CryptoJS from 'crypto-js';

const secretKey = process.env.NEXT_PUBLIC_RANDOM;

export interface IEncryptedResponse {
  encryptedData?: string;
}

export function encrypt(text: string) {
  const encryptText = CryptoJS.AES.encrypt(text, secretKey).toString();

  return encryptText;
}
export function decrypt(hash: string) {
  if (hash !== undefined) {
    const decryptText = CryptoJS.AES.decrypt(hash, secretKey).toString(CryptoJS.enc.Utf8);
    return decryptText;
  } else {
    console.log('Error: hash is undefined');
  }
}
export function superDecrypt(hash: string | undefined): string | undefined {
  if (hash !== undefined && secretKey) {
    try {
      const decryptText = CryptoJS.AES.decrypt(hash, secretKey).toString(CryptoJS.enc.Utf8);
      return decryptText;
    } catch (error) {
      if(process.env.NEXT_PUBLIC_DEBUG_MODE) {
        console.error('Decryption error:', error);
      }
      return undefined;
    }
  } else {
    if(process.env.NEXT_PUBLIC_DEBUG_MODE) {
      console.log('Error: hash is undefined or secretKey is missing');
    }
    return undefined;
  }
}
