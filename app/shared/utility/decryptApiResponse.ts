import { decryptData } from '@/app/shared/utility/encryption';
import Cookies from 'js-cookie';

/**
 * Decrypts the response data if it is encrypted.
 * @param response The response object.
 * @param returnTypeIfEmpty The return type if the response is empty. Default is '{}'. If you expect an array, set it to '[]', if a string, set it to '', etc.
 * @returns The decrypted response object.
 */
export function decryptApiResponse(response: any, returnTypeIfEmpty = '{}'): any {
    if (!response || !response.data || !response.data.encryptedData) {
        return response;
    }
    const sessionToken = Cookies.get('sessionToken');
    const pk = Cookies.get('pk');
    const secretKey = sessionToken && pk ? decryptData(sessionToken, pk) : null;
    const encryptedData = response.data.encryptedData;
    const decryptedData = decryptData(encryptedData, secretKey!);
    return JSON.parse(decryptedData ?? returnTypeIfEmpty);
}