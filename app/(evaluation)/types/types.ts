import { Role } from "@/app/shared/types/role"

export type QuestionnaireItem = {
    section: string,
    title: string,
    url: string,
    status?: string,
}

export type Params = {
    application_id: string,
    section_questions: string
}

export type NavItem = {
    section: string,
    child: QuestionnaireItem[]
}
  
export type Note = {
    application_id: number,
    created_at: string,
    deleted_at: string,
    description: string,
    id: number,
    subject: string,
    updated_at: string,
    user_id: {
        first_name: string,
        last_name: string,
        id: number,
        role: {
            id:number,
            name: string
        }
    }
}

 