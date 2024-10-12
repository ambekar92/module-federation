import { CREATE_USER_TO_USER_MESSAGE_ROUTE } from "@/app/constants/routes";
import { handleApiRequest } from "@/app/services/handleApiRequest";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  return handleApiRequest(request, CREATE_USER_TO_USER_MESSAGE_ROUTE, 'POST')
}