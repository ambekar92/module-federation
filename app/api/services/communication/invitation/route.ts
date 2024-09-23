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
  const { searchParams } = new URL(request.url);
  const invitationId = searchParams.get('invitation_id');

  if (!invitationId) {
    return NextResponse.json({ error: 'Invitation ID is required' }, { status: 400 });
  }
	
  const modifiedRequest = new NextRequest(request, {
    body: JSON.stringify({ invitation_id: invitationId }),
  });

  return handleApiRequest(modifiedRequest, INVITATION_ROUTE, 'DELETE');
}