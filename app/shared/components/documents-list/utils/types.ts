export type Document = {
  created_at: string
  updated_at: string
  deleted_at: string
  id: number
  file_name: string
  path_name: string
  av_scanned: string
  internal_document: string
  notes: string
  doc_owner_user_id: string
  document_type_id: number
  entity_id: number
  upload_user_id: number
  hubzone_key: number
  application_contributor_id: number
  question_id: number
}

export type DocumentsType = Document[]
