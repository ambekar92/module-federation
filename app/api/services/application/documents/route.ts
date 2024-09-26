import { NextRequest, NextResponse } from 'next/server'
import { handleApiRequest } from '@/app/services/handleApiRequest'
import { DOCUMENT_ROUTE, DOCUMENTS_ROUTE } from '@/app/constants/routes'

export enum DocumentParams {
  user_id = 'user_id',
  application_id = 'application_id',
  application_section_id = 'application_section_id',
  sort_by = 'sort_by',
  sort_order = 'sort_order',
	application_contributor_id = 'application_contributor_id',
	hubzone_key = 'hubzone_key',
	entity_id = 'entity_id',
	document_type_id = 'document_type_id',
	document_type = 'document_type',
	question_id = 'question_id',
	document_id = 'document_id',
	upload_user_id = 'upload_user_id'
}

export async function POST(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const params = new URLSearchParams()

  Object.values(DocumentParams).forEach(param => {
    const values = searchParams.getAll(param)
    values.forEach(value => {
      if (value !== null) {
        params.append(param, value)
      }
    })
  })

  const url = `${DOCUMENTS_ROUTE}?${params.toString()}`

  return handleApiRequest(request, url, 'POST')
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
  return handleApiRequest(request, DOCUMENT_ROUTE, 'DELETE');
}