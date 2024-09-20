import { NextRequest, NextResponse } from 'next/server'
import { handleApiRequest } from '@/app/services/handleApiRequest'
import { DOCUMENT_ROUTE, DOCUMENTS_ROUTE } from '@/app/constants/routes'

export async function POST(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  
  const application_contributor_id = searchParams.get('application_contributor_id')
  const entity_id = searchParams.get('entity_id')
  const upload_user_id = searchParams.get('upload_user_id')
  const question_id = searchParams.get('question_id')
  const hubzone_key = searchParams.get('hubzone_key')

  let url = `${DOCUMENTS_ROUTE}?application_contributor_id=${application_contributor_id}&entity_id=${entity_id}&upload_user_id=${upload_user_id}&question_id=${question_id}`
  
  if (hubzone_key) {
    url += `&hubzone_key=${hubzone_key}`
  }

  return handleApiRequest(request, url, 'POST')
}

export enum DocumentParams {
  user_id = 'user_id',
  application_id = 'application_id',
  application_section_id = 'application_section_id',
  sort_by = 'sort_by',
  sort_order = 'sort_order',
	application_contributor_id = 'application_contributor_id',
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  
  let url = DOCUMENTS_ROUTE

  const queryParams = Object.values(DocumentParams)
    .map(param => {
      const value = searchParams.get(param)
      return value ? `${param}=${value}` : null
    })
    .filter(Boolean)
    .join('&')

  if (queryParams) {
    url += `?${queryParams}`
  }

  return handleApiRequest(request, url, 'GET')
}

export async function DELETE(request: NextRequest) {
  const body = await request.json()
  const { document_id } = body

  if (!document_id) {
    return NextResponse.json({ error: 'document_id is required' }, { status: 400 })
  }

  const url = `${DOCUMENT_ROUTE}/${document_id}`
  
  return handleApiRequest(request, url, 'DELETE')
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { documentId: string } }
) {
  const { documentId } = params
  const payload = await request.json()
  
  if (!payload.document_type_id) {
    return NextResponse.json({ error: 'document_type_id is required' }, { status: 400 })
  }

  const url = `${DOCUMENTS_ROUTE}/${documentId}`
  
  return handleApiRequest(request, url, 'PUT')
}