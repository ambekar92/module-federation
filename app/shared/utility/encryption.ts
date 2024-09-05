import CryptoJS from 'crypto-js';

const secretKey = process.env.NEXT_PUBLIC_RANDOM;

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
