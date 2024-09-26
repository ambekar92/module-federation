import { NextRequest, NextResponse } from 'next/server';
import { handleApiRequest } from '@/app/services/handleApiRequest';
import { VALIDATE_SAM_ENTITY_ROUTE } from '@/app/constants/routes';

export async function POST(request: NextRequest) {
  return handleApiRequest(request, VALIDATE_SAM_ENTITY_ROUTE, 'POST');
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const uei = searchParams.get('uei')
  const tin = searchParams.get('tax_identifier_number')
  const cageCode = searchParams.get('cage_code')
  const bankAccountNumber = searchParams.get('account_hash')

  if (!uei || !tin) {
    return NextResponse.json({ error: 'UEI and tax identifier number are required' }, { status: 400 })
  }

  let query = `?uei=${uei}&tax_identifier_number=${tin}`
  if (cageCode) query += `&cage_code=${cageCode}`
  if (bankAccountNumber) query += `&account_hash=${bankAccountNumber}`

  return handleApiRequest(request, `${VALIDATE_SAM_ENTITY_ROUTE}${query}`, 'GET')
}