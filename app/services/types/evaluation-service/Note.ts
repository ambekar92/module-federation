export type Note = {
    created_at: string,
    deleted_at: string,
    id: number,
    updated_at: string,
} & NoteBase

export type NoteBase = {
    application_id: number,
    description: string,
    subject: string,
    user_id: number
}