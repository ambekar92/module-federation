import { APPLICATION_DOCUMENTS_ROUTE, REQUIRED_DOCUMENTS_ROUTE } from '@/app/constants/local-routes';
import { createDocument } from '@/app/services/api/document-service/createDocument';
import { updateDocument } from '@/app/services/api/document-service/updateDocument';
import { useDeleteDocument } from '@/app/services/mutations/document-service/useDeleteDocument';
import { DocumentParams, useDocuments } from '@/app/services/queries/document-service/useDocuments';
import { DocumentRequiredQuestions } from '@/app/services/types/application-service/DocumentRequiredQuestions';
import Spinner from '@/app/shared/components/spinner/Spinner';
import { useApplicationContext } from '@/app/shared/hooks/useApplicationContext';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Accordion, AccordionDetails, AccordionSummary } from '@mui/material';
import { Alert, Button, Icon, Table } from '@trussworks/react-uswds';
import moment from 'moment';
import React, { useRef, useState } from 'react';
import useSWR from 'swr';
import styles from './Documents.module.scss';
import { startCase } from 'lodash';

const Documents = () => {
  const {contributorId, userId, applicationData} = useApplicationContext()
  const [selectedQuestionId, setSelectedQuestionId] = useState<number | null>(null);
  const [selectedDocumentId, setSelectedDocumentId] = useState<number | null>(null);
  const [expanded, setExpanded] = useState(true);
  const hubzoneFileInputRef = useRef<HTMLInputElement>(null);

  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [isLoadingHubzone, setIsLoadingHubzone] = React.useState<boolean>(false);
  const {data: questions, error: questionsError, isLoading: isLoadingQuestions} = useSWR<DocumentRequiredQuestions[]>( contributorId ? `${REQUIRED_DOCUMENTS_ROUTE}/${contributorId}` : null)
  const { data: documents, error: documentsError, isLoading: isLoadingDocuments } = useDocuments({
    [DocumentParams.user_id]: userId,
    [DocumentParams.application_contributor_id]: contributorId,
  });
  const {trigger: triggerDelete} = useDeleteDocument();
  const {mutate} = useDocuments({
    [DocumentParams.user_id]: userId,
    [DocumentParams.application_contributor_id]: contributorId,
  });

  const fileInputRefs = useRef<{ [key: number]: HTMLInputElement | null }>({});

  function onFileUpload(e: React.SyntheticEvent, questionId: number, questionType: number) {
    setSelectedQuestionId(questionId);

    const fileInput = fileInputRefs.current[questionId];
    if (!fileInput) {return;}

    // Remove existing listener
    const oldListener = fileInput.onchange;
    if (oldListener) {
      fileInput.removeEventListener('change', oldListener as EventListener);
    }

    // Create new listener
    const newListener = () => {
      const file = fileInput.files?.[0];
      if (file) {
        handleUploadFile(file, questionId, questionType);
      }
      // Remove listener after trigger
      fileInput.onchange = null;
    };

    fileInput.onchange = newListener;
    fileInput.click();
  }

  async function handleDelete(e: any, documentId: number) {
    setSelectedDocumentId(documentId);
    await triggerDelete({document_id: documentId});
    await mutate();
    setSelectedDocumentId(null)
  }

  function onHubzoneFileUpload(e: React.SyntheticEvent) {
    const fileInput = hubzoneFileInputRef.current;
    if (!fileInput) {return;}

    fileInput.click();
  }

  async function handleUploadFile(file: File, questionId: number, questionType: number) {
    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append('files', file);
      formData.append('document_type_id', questionType.toString());
      formData.append('internal_document', 'false');

      const question = questions?.find(q => q.id === questionId);

      let url = `${APPLICATION_DOCUMENTS_ROUTE}?application_contributor_id=${contributorId}&entity_id=${applicationData?.entity.entity_id}&upload_user_id=${userId}&question_id=${questionId}`;

      if (question?.hubzone_key) {
        url += `&hubzone_key=${question.hubzone_key.toString()}`;
      }
      const timestamp = new Date().getTime();
      url += `&timestamp=${timestamp}`;

      await createDocument(url, formData);

      await mutate();
    } catch (error) {
      if(process.env.NEXT_PUBLIC_DEBUG_MODE) {
        console.error('Error uploading file:', error);
      }
    } finally {
      setIsLoading(false);
      setSelectedQuestionId(null);
      if(fileInputRefs.current[questionId]) {
        fileInputRefs.current[questionId].value = '';
      }
    }
  }

  async function handleHubzoneUpload() {
    const fileInput = hubzoneFileInputRef.current;
    if (!fileInput || !fileInput.files || fileInput.files.length === 0) {return;}

    const file = fileInput.files[0];
    setIsLoadingHubzone(true);

    try {
      const formData = new FormData();
      formData.append('files', file);
      formData.append('document_type_id', hubzoneQuestions[0].valid_documents[0].document_type_id.toString());
      formData.append('internal_document', 'false');

      let url = `${APPLICATION_DOCUMENTS_ROUTE}?application_contributor_id=${contributorId}&entity_id=${applicationData?.entity.entity_id}&upload_user_id=${userId}&question_id=${hubzoneQuestions[0].id}`;

      if (hubzoneQuestions[0].hubzone_key) {
        url += `&hubzone_key=${hubzoneQuestions[0].hubzone_key.toString()}`;
      }
      const timestamp = new Date().getTime();
      url += `&timestamp=${timestamp}`;

      await createDocument(url, formData);
      await mutate();
    } catch (error) {
      if (process.env.NEXT_PUBLIC_DEBUG_MODE) {
        console.error('Error uploading file:', error);
      }
    } finally {
      setIsLoadingHubzone(false);
      if (fileInput) {fileInput.value = '';}
    }
  }

  async function handleUpdateDocumentType(e: React.ChangeEvent<HTMLSelectElement>, documentId: number) {
    setIsLoading(true)
    setSelectedDocumentId(documentId);
    await updateDocument(`${APPLICATION_DOCUMENTS_ROUTE}/${documentId}`, {document_type_id: Number(e.target.value)});
    await mutate();
    setIsLoading(false);
    setSelectedDocumentId(null);
  }

  const groupQuestionsByHubzoneKey = (questions: DocumentRequiredQuestions[]): DocumentRequiredQuestions[] => {
    return (questions && questions.length > 0) ? questions.filter(q => q.hubzone_key) : [];
  };

  if (isLoadingQuestions || isLoadingDocuments || !questions) {
    return <Spinner center />
  }
  if (questionsError || documentsError) {
    return <Alert headingLevel='h2' type='error'>Error occurred while loading documents. Please come back later.</Alert>
  }
  if (questions && questions.length === 0) {
    return <h2>No documents are required. Please click &quot;Next&quot; to continue.</h2>
  }

  const hubzoneQuestions = groupQuestionsByHubzoneKey(questions);
  const nonHubzoneQuestions = (questions && questions.length > 0) ?questions.filter(q => !q.hubzone_key): [];

  return (
    <div>
      {nonHubzoneQuestions.map((question) => (
        <div key={question.id}>
          <h2>{question.title}</h2>
          <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '3rem'}}>
            <p>{question.description}</p>
            <input accept='.doc, .docx, .pdf'
              ref={(el) => {
                fileInputRefs.current[question.id] = el;
              }}
              type='file' hidden={true}/>
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
                {documents && Array.isArray(documents) && documents?.filter(d => d.question?.question_id && d.question.question_id === question.id).length === 0 ?
                  <tr><td colSpan={5}>No documents have been uploaded for this question yet.</td></tr> : (
                    <>
                      {documents?.filter(d => d.question?.question_id === question.id).map(d => (
                        <tr key={d.id}>
                          <td><a className='usa-link' href={d.signed_url} target="_blank" rel="noopener noreferrer">{d.file_name}</a></td>
                          <td>{d.upload_user.first_name} {d.upload_user.last_name} {d.upload_user.roles && `- ${startCase(d.upload_user.roles[d.upload_user.roles.length - 1])}`}</td>
                          <td>{moment(d.created_at).format('MM/DD/YYYY')}</td>
                          <td><select
                            disabled={isLoading && selectedDocumentId === d.id}
                            value={d.document_type.id}
                            onChange={(e) => handleUpdateDocumentType(e, d.id)}
                            style={{border: 'none', width: '100%', cursor: 'pointer'}}>
                            <option>-- Select --</option>
                            {question.valid_documents.map(vd => <option
                              key={vd.document_type_id} value={vd.document_type_id}
                              selected={d.document_type.id === vd.document_type_id}>
                              {vd.description}
                            </option>)}
                          </select>
                          </td>
                          <td><button
                            disabled={isLoading && selectedDocumentId === d.id}
                            className={styles.delete}
                            onClick={(e) => handleDelete(e, d.id)}><Icon.Delete /></button>
                          </td>
                        </tr>
                      ))}
                    </>
                  )}
              </tbody>
            </Table>
          </fieldset>
        </div>
      ))}
      {hubzoneQuestions.length > 0 && (
        <Accordion
          expanded={expanded}
          onChange={() => setExpanded(!expanded)}
          className='margin-y-4 border border-base-lighter'
          style={{boxShadow: 'none'}}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="hubzone-content"
            id="hubzone-header"
          >
            <h2>HUBZone Calculator Uploads</h2>
          </AccordionSummary>
          <AccordionDetails>
            {hubzoneQuestions.map((question, key) => (
              <div key={`${question.id}-${key}`}>
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '3rem'}}>
                  <h2 className='margin-bottom-0'>{question.title}</h2>
                  <input
                    ref={hubzoneFileInputRef}
                    accept='.doc, .docx, .pdf'
                    type='file'
                    hidden={true}
                    onChange={handleHubzoneUpload}
                  />
                  <Button
                    disabled={isLoadingHubzone}
                    onClick={onHubzoneFileUpload}
                    outline
                    type='button'
                  >
                    {isLoadingHubzone ? 'Uploading...' : 'Upload'}
                  </Button>
                </div>
                <p>{question.description}</p>
              </div>
            ))}
            <fieldset style={{borderLeft: 'none', borderRight: 'none', borderBottom: 'none', marginTop: '2rem'}}>
              <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                <legend>UPLOADED DOCUMENTS</legend>
              </div>
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
                  {documents?.filter(d => hubzoneQuestions.some(q => q.id === d.question.question_id)).length === 0 ? (
                    <tr><td colSpan={5}>No documents have been uploaded for HUBZone questions yet.</td></tr>
                  ) : (
                    documents?.filter(d => hubzoneQuestions.some(q => q.id === d.question.question_id))
                      .map(d => (
                        <tr key={d.id}>
                          <td><a className='usa-link' href={d.signed_url} target="_blank" rel="noopener noreferrer">{d.file_name}</a></td>
                          <td>{d.upload_user.first_name} {d.upload_user.last_name} {d.upload_user.roles && `- ${startCase(d.upload_user.roles[d.upload_user.roles.length - 1])}`}</td>
                          <td>{moment(d.created_at).format('MM/DD/YYYY')}</td>
                          <td>
                            <select
                              disabled={isLoading && selectedDocumentId === d.id}
                              value={d.document_type.id}
                              onChange={(e) => handleUpdateDocumentType(e, d.id)}
                              style={{border: 'none', width: '100%', cursor: 'pointer'}}
                            >
                              <option>-- Select --</option>
                              {questions.find(q => q.id === d.question.question_id)?.valid_documents.map(vd => (
                                <option
                                  key={vd.document_type_id}
                                  value={vd.document_type_id}
                                  selected={d.document_type.id === vd.document_type_id}
                                >
                                  {vd.description}
                                </option>
                              ))}
                            </select>
                          </td>
                          <td>
                            <button
                              disabled={isLoading && selectedDocumentId === d.id}
                              className={styles.delete}
                              onClick={(e) => handleDelete(e, d.id)}
                            >
                              <Icon.Delete />
                            </button>
                          </td>
                        </tr>
                      ))
                  )}
                </tbody>
              </Table>
            </fieldset>
          </AccordionDetails>
        </Accordion>
      )}
    </div>
  )
}

export default Documents
