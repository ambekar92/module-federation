import CryptoJS from 'crypto-js';

const secretKey = process.env.NEXT_PUBLIC_RANDOM;

export interface IEncryptedResponse {
  encryptedData?: string;
}

export function encrypt(text: string, key?: string) {
  if (key) {
    const newKey = decrypt(key, key)
    return CryptoJS.AES.encrypt(text, newKey + secretKey).toString();
  } else {
    if (!secretKey) {
      throw new Error('Secret key is not defined');
    }
    return CryptoJS.AES.encrypt(text, secretKey).toString();
  }
}
export function decrypt(hash: string) {
  if (hash !== undefined) {
    const decryptText = CryptoJS.AES.decrypt(hash, secretKey).toString(CryptoJS.enc.Utf8);
    return decryptText;
  } else {
    console.log('Error: hash is undefined');
  }
}

export function superDecrypt(hash: string | undefined, key: string): string | undefined {
  let decryptText: string | undefined;
  if (hash !== undefined && key) {
    try {
      const newKey = decrypt(key, key)
      decryptText = CryptoJS.AES.decrypt(hash, newKey + secretKey).toString(CryptoJS.enc.Utf8);
      return decryptText;
    } catch (error) {
      if(process.env.NEXT_PUBLIC_DEBUG_MODE) {
        console.error('Decryption error:', error);
      }
      return undefined;
    }
  } else if (hash === undefined && secretKey) {
    try {
      decryptText = CryptoJS.AES.decrypt(hash, secretKey).toString(CryptoJS.enc.Utf8);
      return decryptText;
    } catch (error) {
      if(process.env.NEXT_PUBLIC_DEBUG_MODE) {
        console.error('Decryption error:', error);
      }
      return undefined;
    }
  }
}
