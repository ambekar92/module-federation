import { IEncryptedResponse, superDecrypt } from '../shared/utility/encryption';

/**
 * This function fetches a resource from the given URL. If the response is an
 * object with an 'encryptedData' key, it decrypts the data and parses it as
 * JSON. If the decryption fails, it returns the decrypted string.
 *
 * @param {string} url The URL of the resource to fetch
 * @returns {Promise<any>} A promise resolving to the parsed JSON data
 */
export const superFetcher = async (url: string) => {
  const response = await fetch(url);
  const data: IEncryptedResponse = await response.json();

  if (data.encryptedData) {
    const cookies = (await import('js-cookie'))
    const secretKey = cookies.default.get('sessionToken')

    const decryptedString = superDecrypt(data.encryptedData, secretKey);
    if (decryptedString) {
      try {
        return JSON.parse(decryptedString);
      } catch (error) {
        // If the decryption fails, return the original string
        if(process.env.NEXT_PUBLIC_DEBUG_MODE) {
          console.error('Failed to parse decrypted data:', error);
        }
        return decryptedString;
      }
    }
  }

  return data;
}
