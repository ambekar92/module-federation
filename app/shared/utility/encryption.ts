import CryptoJS from 'crypto-js';

export interface IEncryptedResponse {
  encryptedData?: string;
}

export function encryptData(text: string, key?: string) {
  if (key) {
    return CryptoJS.AES.encrypt(text, key).toString();
  } else {
    if (key) {
      throw new Error('Secret key is not defined');
    }
  }
}

export function decryptData(text: string, key?: string) {
  if (key) {
    const decryptText = CryptoJS.AES.decrypt(text, key).toString(CryptoJS.enc.Utf8);
    return decryptText;
  } else {
    console.log('error')
  }
}

export function encrypt(text: string, key?: string) {
  if (key) {
    const newKey = decrypt(key, key)
    return CryptoJS.AES.encrypt(text, newKey + secretKey).toString();
  } else {
    console.log('error')
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
      decryptText = CryptoJS.AES.decrypt(hash, key).toString(CryptoJS.enc.Utf8);
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
