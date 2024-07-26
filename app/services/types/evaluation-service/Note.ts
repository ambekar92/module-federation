export type NoteBase = {
    description: string,
    subject: string,
}

export type NoteListItem = {
    created_at: string,
    deleted_at: string,
    id: number,
    updated_at: string,
    user: {
        email: string,
        id: number,
        first_name: string,
        last_name: string,
    }
} & NoteBase

export type CreateNotePayload = {
    application_id: number,
    user_id: number,
    
} & NoteBase

export type UpdateNotePayload = {
    id: number,
} & NoteBase

