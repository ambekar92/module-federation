import axios from 'axios';
import { REFRESH_ROUTE } from '../constants/routes';

async function refreshToken(refreshToken: string) {
  const payload = {
    refresh_token: refreshToken
  }
  try {
    const response = await axios.post(REFRESH_ROUTE, payload)
    if(process.env.NEXT_PUBLIC_DEBUG_MODE) {
      console.log('Token refreshed successfully')
    }
    return response
  } catch (error) {
    if(process.env.NEXT_PUBLIC_DEBUG_MODE) {
      console.error('Failed to refresh token:', error)
    }
  }
}

export default refreshToken
