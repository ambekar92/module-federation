import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { decrypt, encrypt } from '@/app/shared/utility/encryption'
import { API_ROUTE } from '../constants/routes'

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE'

export async function handleApiRequest(
  request: NextRequest,
  endpoint: string,
  method: HttpMethod = 'GET'
) {
  const cookieStore = cookies()
  const accessToken = cookieStore.get('accesstoken')
  if (!accessToken) {
    if (process.env.NEXT_PUBLIC_DEBUG_MODE) {
      console.error('No access token found')
    }
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  const token = decrypt(accessToken.value)
  try {
    let url = (API_ROUTE && endpoint.startsWith(API_ROUTE)) ? endpoint : new URL(endpoint, API_ROUTE).toString()
    let body: string | FormData | undefined
    const headers: HeadersInit = {
      'Authorization': `Bearer ${token}`
    }

    if (method === 'DELETE') {
      const { searchParams } = new URL(request.url)
      url = `${url}?${searchParams.toString()}`
    } else if (method !== 'GET') {
      const contentType = request.headers.get('content-type')
      if (contentType && contentType.includes('multipart/form-data')) {
        body = await request.formData()
      } else {
        body = await request.text()
        headers['Content-Type'] = 'application/json'
      }
    }

    if (process.env.NEXT_PUBLIC_DEBUG_MODE) {
      console.log(`Sending ${method} request to ${url}`)
      // Log the full URL and headers
      console.log('Full URL:', url)
      console.log('Headers:', JSON.stringify(headers, null, 2))
    }

    const response = await fetch(url, {
      method,
      headers,
      body: body instanceof FormData ? body : body
    })

    if (process.env.NEXT_PUBLIC_DEBUG_MODE) {
      console.log(`Received response with status: ${response.status}`)
    }

    if (response.ok) {
      const data = await response.json()
      // encrypt GET responses
      if (method === 'GET') {
        const encryptedData = encrypt(JSON.stringify(data))
        return NextResponse.json({ encryptedData })
      } else {
        return NextResponse.json(data)
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
