import { UPDATE_APPLICATION_STATE } from '@/app/constants/routes';
import { handleApiRequest } from '@/app/services/handleApiRequest';
import { NextRequest } from 'next/server';

export async function PUT(request: NextRequest) {
  return handleApiRequest(request, UPDATE_APPLICATION_STATE, 'PUT');
}
