import { NextRequest, NextResponse } from 'next/server'
import { handleApiRequest } from '@/app/services/handleApiRequest'
import { INVITATION_ROUTE } from '@/app/constants/routes'
import { cookies } from 'next/headers'
import { decrypt } from '@/app/shared/utility/encryption'

export async function POST(request: NextRequest) {
  return handleApiRequest(request, INVITATION_ROUTE, 'POST')
}

export async function PUT(request: NextRequest) {
  return handleApiRequest(request, INVITATION_ROUTE, 'PUT')
}

export async function DELETE(request: NextRequest) {
  console.log('Handling delete invitation request');
  const cookieStore = cookies()
  const accessToken = cookieStore.get('accesstoken')
  if (!accessToken) {
    console.error('No access token found');
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  
  let token;
  try {
    token = decrypt(accessToken.value)
  } catch (error) {
    console.error('Error decrypting access token:', error);
    return NextResponse.json({ error: 'Invalid access token' }, { status: 401 })
  }
  
  try {
    const { searchParams } = new URL(request.url)
    const invitationId = searchParams.get('invitation_id')
    if (!invitationId) {
      console.error('No invitation ID provided');
      return NextResponse.json({ error: 'Invitation ID is required' }, { status: 400 })
    }
    
    console.log(`Sending DELETE request to ${INVITATION_ROUTE}?invitation_id=${invitationId}`);
    const response = await fetch(`${INVITATION_ROUTE}?invitation_id=${invitationId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })
    
    console.log('Received response:', response.status);
    if (response.ok) {
      return NextResponse.json({ message: 'Invitation deleted successfully' })
    } else {
      const errorData = await response.json().catch(() => ({ message: 'An error occurred' }))
      console.error('Error response from API:', errorData);
      return NextResponse.json({ error: errorData.message || 'An error occurred' }, { status: response.status })
    }
  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json({ error: 'An unexpected error occurred' }, { status: 500 })
  }
}