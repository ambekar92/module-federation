export type ExtendedMessage = {
    id: number;
    subject: string;
    uuid: string;
    sent_at: string; // ISO 8601 date string
    content: string; // HTML content as a string
    application_id: number;
    thread: number;
    sender: number;
}