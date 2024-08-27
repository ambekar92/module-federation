import { DOCUMENTS_ROUTE } from '@/app/constants/routes';
import { createDocument } from '@/app/services/api/document-service/createDocument';
import { updateDocument } from '@/app/services/api/document-service/updateDocument';
import { useDeleteDocument } from '@/app/services/mutations/document-service/useDeleteDocument';
import { useDocumentRequiredQuestions } from '@/app/services/queries/application-service/useDocumentRequiredQuestions';
import { useDocuments } from '@/app/services/queries/document-service/useDocuments';
import { useApplicationContext } from '@/app/shared/hooks/useApplicationContext';
import { Alert, Button, Icon, Table } from '@trussworks/react-uswds';
import moment from 'moment';
import React, { useEffect, useRef } from 'react';
import styles from './Documents.module.scss';
import Spinner from '@/app/shared/components/spinner/Spinner';

const Documents = () => {
  const {contributorId, userId, applicationData, applicationId} = useApplicationContext()
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedQuestionId, setSelectedQuestionId] = React.useState<number | null>(null);
  const [selectedDocumentId, setSelectedDocumentId] = React.useState<number | null>(null);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const {data: questions, error: questionsError, isLoading: isLoadingQuestions} = useDocumentRequiredQuestions(1);
  const {data: documents, error: documentsError, isLoading: isLoadingDocuments} = useDocuments({user_id: userId});
  const {trigger: triggerDelete} = useDeleteDocument();
  const {mutate} = useDocuments({user_id: userId});

  useEffect(() => {
    if (applicationData && applicationData.workflow_state !== 'draft' && applicationData.workflow_state !== 'returned_for_firm') {
      window.location.href = `/application/view/${applicationId}`;
    }
  }, [applicationData, applicationId]);

  function onFileUpload(e: React.SyntheticEvent, questionId: number, questionType: number) {
    setSelectedQuestionId(questionId);
    fileInputRef.current?.addEventListener('change', () => {
      const file = fileInputRef?.current?.files?.[0];
      if (file) {
        handleUploadFile(file, questionId, questionType)
      }
    })
    fileInputRef.current?.click();
  }

  async function handleDelete(e: any, documentId: number) {
    setSelectedDocumentId(documentId);
    setIsLoading(true)
    await triggerDelete({document_id: documentId});
    await mutate();
    setIsLoading(false)
    setSelectedDocumentId(null)
  }

  async function handleUploadFile(file: File, questionId: number, questionType: number) {
    setIsLoading(true)
    const formData = new FormData();
    formData.append('files', file);
    formData.append('document_type_id', questionType.toString());
    formData.append('internal_document', 'false');
    formData.append('hubzone_key', '1');
    await createDocument(`${DOCUMENTS_ROUTE}?application_contributor_id=${contributorId}&entity_id=${applicationData?.entity.entity_id}&upload_user_id=${userId}&question_id=${questionId}`, formData)
    await mutate();
    setIsLoading(false)
    setSelectedQuestionId(null);
  }

  async function handleUpdateDocumentType(e: React.ChangeEvent<HTMLSelectElement>, documentId: number) {
    setIsLoading(true)
    setSelectedDocumentId(documentId);
    await updateDocument(`${DOCUMENTS_ROUTE}/${documentId}`, {document_type_id: Number(e.target.value)});
    await mutate();
    setIsLoading(false);
    setSelectedDocumentId(null);
  }

  if (isLoadingQuestions || isLoadingDocuments) {
    return <Spinner center />
  }
  if (questionsError || documentsError) {
    return <Alert headingLevel='h2' type='error'>Error occurred while loading documents. Please come back later.</Alert>
  }
  if (questions && questions.length === 0) {
    <p>No questions that required document upload found</p>
  }
  return (
    <div>
      {!!questions && !!documents && questions.map((question) => (
        <>
          <div>
            <h2>{question.title}</h2>
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '3rem'}}>
              <p>{question.description}</p>
              <input accept='.doc, .docx, .pdf'  ref={fileInputRef} type='file' hidden={true}/>
              <Button disabled={isLoading && selectedQuestionId === question.id}
                onClick={(e) => onFileUpload(e, question.id, question.valid_documents[0].document_type_id)} outline type='button'>
                {isLoading && selectedQuestionId === question.id ? 'Uploading...' : 'Upload'}
              </Button>
            </div>
            <fieldset style={{borderLeft: 'none', borderRight: 'none', borderBottom: 'none', marginBottom: '4rem'}}>
              <legend>UPLOADED DOCUMENTS</legend>
              <Table fullWidth>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Author</th>
                    <th>Created</th>
                    <th>Document Type</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {documents?.filter(d => d.question.question_id && d.question.question_id === question.id).length === 0 ?
                    <tr><td colSpan={5}>No documents have been uploaded for this question yet.</td></tr> : (
                      <>
                        {documents.filter(d => d.question.question_id === question.id).map(d =>(<tr key={question.id}>
                          <td>{d.file_name}</td>
                          <td>{d.upload_user.first_name} {d.upload_user.last_name}</td>
                          <td>{moment(d.created_at).format('MM/DD/YYYY')}</td>
                          <td><select
                            disabled={isLoading && selectedDocumentId === d.id}
                            value={d.document_type.id}
                            onChange={(e) => handleUpdateDocumentType(e, d.id)}
                            style={{border: 'none', width: '100%', cursor: 'pointer'}}>
                            <option>-- Select --</option>
                            {question.valid_documents.map(vd => <option
                              selected={d.document_type.id === vd.document_type_id}
                              key={vd.document_type_id} value={vd.document_type_id}>
                              {vd.description}
                            </option>)}
                          </select>
                          </td>
                          <td><button
                            disabled={isLoading && selectedDocumentId === d.id}
                            className={styles.delete}
                            onClick={(e) => handleDelete(e, d.id)}><Icon.Delete   /></button>

                          </td>
                        </tr>))}
                      </>
                    )}
                </tbody>
              </Table>

            </fieldset>
          </div>
        </>
      ))}
    </div>
  )
}

export default Documents
