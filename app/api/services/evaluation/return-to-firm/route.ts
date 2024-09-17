import { RETURN_APPLICATION_TO_FIRM } from "@/app/constants/routes";
import { handleApiRequest } from "@/app/services/handleApiRequest";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  return handleApiRequest(request, RETURN_APPLICATION_TO_FIRM, 'POST');
}
