import axios from 'axios'
import { API_HOST } from '../constants/routes'

export const axiosInstance = axios.create({
  baseURL: API_HOST,
  timeout: 30 * 60_000, // 30 minutes
  headers: {
    Accept: 'application/json, text/plain, */*',
    'Content-Type': 'application/json; charset=utf-8',
  },
})

// API Response Error Handling
const handleResponseError = async (response: any) => {
  throw new Error("HTTP error, status = " + response.status);
}

// Common GET METHOD
const fetcherGET = async (url: string) => {
  return axiosInstance.get(url)
    .then(response => {
      if (response?.status !== 200) {
        handleResponseError(response);
      }
      return response;
    })
    .catch(error => {
      // Handle the error
      console.log(">> API Error >>", error);
    });
}

// Common POST METHOD
// const fetcherPOST = async (url: any, param: any) => {
//   return axiosInstance.post(url, param)
//     .then(response => {
//       if (response?.status !== 200) {
//         handleResponseError(response);
//       }
//       return response;
//     })
//     .catch(error => {
//       // Handle the error
//       console.log(">> API Error >>", error);
//     });
// }

async function getNotifications(param: any) { // This method calling from Redux
  let api_url = "/notifications?user_id=" + param;
  return fetcherGET(api_url);
}


const prototype = {
  getNotifications
}

export default prototype
