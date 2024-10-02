import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { decrypt, encrypt, decryptData, encryptData } from '@/app/shared/utility/encryption'
import { API_ROUTE } from '../constants/routes'
import redisClient from '@/app/lib/redis';
import { REFRESH_TOKEN_ROUTE } from '../constants/local-routes';
import refreshToken from './refreshToken';

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE'

export async function handleApiRequest(
  request: NextRequest,
  endpoint: string,
  method: HttpMethod = 'GET'
) {
  const cookieStore = cookies()
  let token
  let refresh
  if (process.env.TOKEN_LOOKUP === 'development') {
    if (process.env.NEXT_PUBLIC_DEBUG_MODE) {
      console.log('******************************* accessToken lookup in development mode')
    }
    const accessToken = cookieStore.get('access');
    token = accessToken ? accessToken.value : null;
  } else {
    if (process.env.NEXT_PUBLIC_DEBUG_MODE) {
      console.log('************************** emailPasswordAuthToken lookup production mode')
    }
    const emailPasswordAuthToken = cookieStore.get('email_password_auth_token');
    const sessionToken = cookieStore.get('sessionToken');
    const pk = cookieStore.get('pk');
    const secretKey2 = decryptData(sessionToken?.value, pk?.value);

    const userData = emailPasswordAuthToken ? JSON.parse(decryptData(emailPasswordAuthToken.value, secretKey2) ?? '') : undefined;
    const redisData = await redisClient.get(userData.email);
    token = redisData ? JSON.parse(redisData).access : null;
    refresh = redisData ? JSON.parse(redisData).refresh : null;
  }

  if (!token) {
    if (process.env.NEXT_PUBLIC_DEBUG_MODE) {
      console.error('No access token found')
    }
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  try {
    let url = (API_ROUTE && endpoint.startsWith(API_ROUTE)) ? endpoint : new URL(endpoint, API_ROUTE).toString()
    let body: string | FormData | undefined
    const headers: HeadersInit = {
      'Authorization': `Bearer ${token}`
    }

    if (endpoint === REFRESH_TOKEN_ROUTE && method === 'POST') {
      let bodyObj: any = {}
      try {
        bodyObj = JSON.parse(body as string)
      } catch (e) {
        // Error caught -KJ
      }

      if (!bodyObj.refresh_token && refresh) {
        bodyObj.refresh_token = refresh
        body = JSON.stringify(bodyObj)
      } else if (!bodyObj.refresh_token && !refresh) {
        return NextResponse.json({ error: 'No refresh token available' }, { status: 401 });
      }
    }

    if (method !== 'GET') {
      const contentType = request.headers.get('content-type')
      if (contentType && contentType.includes('multipart/form-data')) {
        body = await request.formData()
      } else {
        body = await request.text()
        headers['Content-Type'] = 'application/json'
      }
    }

    if (method === 'DELETE') {
      const { searchParams } = new URL(request.url)
      url = `${url}?${searchParams.toString()}`
    }

    if (process.env.NEXT_PUBLIC_DEBUG_MODE) {
      console.log(`Sending ${method} request to ${url}`)
      // Log the full URL and headers
      console.log('Full URL:', url)
    }

    const response = await fetch(url, {
      method,
      headers,
      body: body instanceof FormData ? body : body
    })

    if (process.env.NEXT_PUBLIC_DEBUG_MODE) {
      console.log(`Received response with status: ${response.status}`)
      console.log(`Response Message: ${response}`)
    }

    if (response.ok) {
      const contentType = response.headers.get('content-type')
      if (contentType && contentType.includes('text/html')) {
        const htmlContent = await response.text()
        return new NextResponse(htmlContent, {
          status: 200,
          headers: { 'Content-Type': 'text/html' }
        })
      } else {
        // Handle JSON responses as before
        const data = await response.json()
        // encrypt GET responses
        if ( process.env.NEXT_PUBLIC_DEBUG_MODE ) {
          console.log(`Response Data ${request.url}:`, data)
        }
        if (method === 'GET') {
          const sessionToken = cookieStore.get('sessionToken');
          const pk = cookieStore.get('pk');
          const secretKey2 = decryptData(sessionToken?.value, pk?.value);

          const encryptedData = encryptData(JSON.stringify(data), secretKey2)
          return NextResponse.json({ encryptedData })
        } else {
          return NextResponse.json(data)
        }
      }
    } else {
      let errorData
      try {
        errorData = await response.json()
      } catch (e) {
        errorData = { message: 'An error occurred' }
      }
      if (process.env.NEXT_PUBLIC_DEBUG_MODE) {
        console.error(`API Error (${response.status}):`, errorData)
      }
      return NextResponse.json({ error: errorData.message || 'An error occurred' }, { status: response.status })
    }
  } catch (error) {
    if (process.env.NEXT_PUBLIC_DEBUG_MODE) {
      console.error(`Unexpected error in ${method} request to ${endpoint}:`, error)
    }
    return NextResponse.json({ error: 'An unexpected error occurred' }, { status: 500 })
  }
}
