import { SUBMIT_RFI_ROUTE } from "@/app/constants/routes";
import { handleApiRequest } from "@/app/services/handleApiRequest";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  return handleApiRequest(request, SUBMIT_RFI_ROUTE, 'POST');
}