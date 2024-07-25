import { NOTES_ROUTE } from "@/app/constants/routes";
import { useParams } from "next/navigation";
import useSWR from "swr";
import { Note } from "../../types/evaluation-service/Note";

export function useNotes() {
    const params = useParams<{application_id: string}>();
    return useSWR<Note[]>(`${NOTES_ROUTE}?application_id=${params.application_id}`)
}