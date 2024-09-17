import { COMPLETE_EVALUATION_TASK_ROUTE } from "@/app/constants/routes";
import { handleApiRequest } from "@/app/services/handleApiRequest";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  return handleApiRequest(request, COMPLETE_EVALUATION_TASK_ROUTE, 'POST');
}