export interface HtmlToPdfDocument {
	message: string;
	path_name: string;
	document: {
    id: number,
    created_at: string,
    updated_at: string,
    deleted_at: string | null,
    document_type: {
      id: string,
      name: string
    },
    entity_id: string,
    upload_user: {
      id: string,
      first_name: string,
      last_name: string
    },
    doc_owner_user_id: string | null;
    file_name: string;
    path_name: string;
    av_scanned: null;
    internal_document: boolean;
    notes: string | null;
    application_contributor: number | null;
    question_id: number | null;
    hubzone_key: number | null
	}
}
