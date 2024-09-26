import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { decrypt, encrypt } from '@/app/shared/utility/encryption'
import { API_ROUTE } from '../constants/routes'
import redisClient from '@/app/lib/redis';

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE'

export async function handleApiRequest(
  request: NextRequest,
  endpoint: string,
  method: HttpMethod = 'GET'
) {
  const cookieStore = cookies()
  let token
  if (process.env.TOKEN_LOOKUP === 'development') {
    if (process.env.NEXT_PUBLIC_DEBUG_MODE) {
      console.log('******************************* accessToken lookup in development mode')
    }
    const accessToken = cookieStore.get('access');
    token = accessToken ? decrypt(accessToken.value) : null;
  } else {
    if (process.env.NEXT_PUBLIC_DEBUG_MODE) {
      console.log('************************** emailPasswordAuthToken lookup production mode')
    }
    const emailPasswordAuthToken = cookieStore.get('email_password_auth_token');
    const userData = emailPasswordAuthToken ? JSON.parse(decrypt(emailPasswordAuthToken.value) ?? '') : undefined;
    const redisData = await redisClient.get(userData.email);
    token = redisData ? JSON.parse(redisData).access : null;
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
          const secretKey = cookies().get('sessionToken')?.value
          const encryptedData = encrypt(JSON.stringify(data), secretKey)
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
