import { NextRequest, NextResponse } from 'next/server';
import { handleApiRequest } from '@/app/services/handleApiRequest';
import { RTF_ITEMS_ROUTE } from '@/app/constants/routes';

export async function POST(request: NextRequest) {
  return handleApiRequest(request, RTF_ITEMS_ROUTE, 'POST');
}

export async function PUT(request: NextRequest) {
  return handleApiRequest(request, RTF_ITEMS_ROUTE, 'PUT');
}

export async function DELETE(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  const authorId = searchParams.get('author_id');

  if (!id || !authorId) {
    return NextResponse.json({ error: 'Missing required query parameters' }, { status: 400 });
  }

  const url = `${RTF_ITEMS_ROUTE}?id=${id}&author_id=${authorId}`;
  return handleApiRequest(request, url, 'DELETE');
}