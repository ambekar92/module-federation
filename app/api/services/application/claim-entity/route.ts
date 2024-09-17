import { NextRequest, NextResponse } from 'next/server'
import { ENTITY_ROUTE } from '@/app/constants/routes'
import { cookies } from 'next/headers'
import { decrypt } from '@/app/shared/utility/encryption'

export async function POST(request: NextRequest) {
  const cookieStore = cookies()
  const accessToken = cookieStore.get('accesstoken')

  if (!accessToken) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const token = decrypt(accessToken.value)

  try {
    const body = await request.json()
    const response = await fetch(`${ENTITY_ROUTE}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(body)
    })

    const data = await response.json()

    if (response.ok) {
      return NextResponse.json(data)
    } else {
      return NextResponse.json({ error: data.message || 'An error occurred' }, { status: response.status })
    }
  } catch (error) {
    console.error('Error in create-entity route:', error)
    return NextResponse.json({ error: 'An error occurred' }, { status: 500 })
  }
}