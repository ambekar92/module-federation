import { DOCUMENT_REQUIRED_ROUTE, GET_DOCUMENTS } from '@/app/constants/routes';
import { useSessionUCMS } from '@/app/lib/auth';
import { axiosInstance } from '@/app/services/axiosInstance';
import fetcher from '@/app/services/fetcher';
import { Alert, Button, ButtonGroup, Icon, Table } from '@trussworks/react-uswds';
import { useEffect, useState } from 'react';
import useSWR from 'swr';
import { DocumentUploadType } from './utils/types';

interface DocumentDetails {
  name: string;
  author: string;
  created: string;
  program: string;
  type: string;
}

interface DocumentsState {
  [sectionName: string]: {
    [subSectionName: string]: DocumentDetails[];
  };
}

interface DocumentUploadsProps {
	contributorId: number | undefined | null;
	entityId: number | undefined;
}

const DocumentUploads = ({ contributorId, entityId }: DocumentUploadsProps) => {
  const { data: session } = useSessionUCMS();
  const [documentsToDelete, setDocumentsToDelete] = useState<{[key: string]: number[]}>({});
  const [isSaving, setIsSaving] = useState(false);
  const { data: questions, error } = useSWR<DocumentUploadType>(
    contributorId ? `${DOCUMENT_REQUIRED_ROUTE}/${contributorId}` : null,
    fetcher
  );
  const [showErrorAlert, setShowErrorAlert] = useState(false);

  const [documents, setDocuments] = useState<DocumentsState>({});
  const [editMode, setEditMode] = useState<{ [key: string]: boolean }>({});
  const [originalDocuments, setOriginalDocuments] = useState<DocumentsState>({});
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    if (questions) {
      const initialDocuments: DocumentsState = {};
      questions.forEach(question => {
        initialDocuments[question.name] = { [question.title]: [] };
      });
      setDocuments(initialDocuments);
    }
  }, [questions]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (showErrorAlert) {
      timer = setTimeout(() => {
        setShowErrorAlert(false);
      }, 10000); // 10 seconds
    }
    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [showErrorAlert]);

  const handleFileUpload = async (sectionName: string, subSectionName: string, file: File, questionId: number, replaceIndex: number | null = null) => {
    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append('files', file);
      formData.append('document_type_id', '1');
      formData.append('internal_document', 'false');
      formData.append('hubzone_key', '1');

      await axiosInstance.post(`${GET_DOCUMENTS}?application_contributor_id=${contributorId}&entity_id=${entityId}&upload_user_id=${session.user_id}&question_id=${questionId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
      });

      const newDocument: DocumentDetails = {
        name: file.name,
        author: session?.user?.name || '',
        created: new Date().toLocaleDateString(),
        program: 'General',
        type: file.type,
      };

      setDocuments(prevDocuments => {
        const updatedSubSection = replaceIndex !== null
          ? prevDocuments[sectionName][subSectionName].map((doc, index) => index === replaceIndex ? newDocument : doc)
          : [...(prevDocuments[sectionName]?.[subSectionName] || []), newDocument];

        return {
          ...prevDocuments,
          [sectionName]: {
            ...prevDocuments[sectionName],
            [subSectionName]: updatedSubSection,
          },
        };
      });
    } catch (error: any) {
      setShowErrorAlert(true);
    } finally {
      setIsUploading(false);
    }
  };

  const handleAddNewClick = (sectionName: string, subSectionName: string, questionId: number) => {
    const input = document.createElement('input');
    input.type = 'file';
    input.onchange = (event: Event) => {
      const target = event.target as HTMLInputElement;
      if (target.files?.length) {
        handleFileUpload(sectionName, subSectionName, target.files[0], questionId);
      }
    };
    input.click();
  };

  const handleReplaceDocumentClick = (sectionName: string, subSectionName: string, questionId: number, index: number) => {
    const input = document.createElement('input');
    input.type = 'file';
    input.onchange = (event: Event) => {
      const target = event.target as HTMLInputElement;
      if (target.files?.length) {
        handleFileUpload(sectionName, subSectionName, target.files[0], questionId, index);
      }
    };
    input.click();
  };

  const handleDeleteDocument = (sectionName: string, subSectionName: string, index: number) => {
    setDocumentsToDelete(prev => ({
      ...prev,
      [sectionName]: [...(prev[sectionName] || []), index],
    }));

    setDocuments(prevDocuments => {
      const updatedSubSection = prevDocuments[sectionName][subSectionName].filter((_, docIndex) => docIndex !== index);
      return {
        ...prevDocuments,
        [sectionName]: {
          ...prevDocuments[sectionName],
          [subSectionName]: updatedSubSection,
        },
      };
    });
  };

  const toggleEditMode = (sectionName: string) => {
    setEditMode(prevEditMode => {
      const newEditMode = !prevEditMode[sectionName];
      if (newEditMode) {
        setOriginalDocuments(documents);
      } else {
        handleCancel(sectionName);
      }
      return { ...prevEditMode, [sectionName]: newEditMode };
    });
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      for (const [sectionName, indexes] of Object.entries(documentsToDelete)) {
        for (const index of indexes) {
          if (contributorId) {
            try {
              await axiosInstance.delete<{ document_id: number }>(`${GET_DOCUMENTS}?document_id=${index}`);
            } catch (error) {
              // eslint-disable-next-line no-console
              console.log(`Error deleting document ${index}: ${error}`);
            }
          }
        }
      }
    } catch (error) {
      console.log('Unexpected error during save:', error);
    } finally {
      setDocuments(prevDocuments => {
        const newDocuments = { ...prevDocuments };
        for (const [sectionName, indices] of Object.entries(documentsToDelete)) {
          for (const subSectionName in newDocuments[sectionName]) {
            newDocuments[sectionName][subSectionName] = newDocuments[sectionName][subSectionName].filter(
              (_, index) => !indices.includes(index)
            );
          }
        }
        return newDocuments;
      });

      setDocumentsToDelete({});
      setEditMode({});
      setIsSaving(false);
    }
  };

  const handleCancel = (sectionName: string) => {
    setDocuments(originalDocuments);
    setEditMode(prevEditMode => ({ ...prevEditMode, [sectionName]: false }));
    setDocumentsToDelete(prev => ({ ...prev, [sectionName]: [] }));
  };

  if (error) {return <div>Error: {error.message}</div>;}
  if (!questions) {return <div>Loading...</div>;}

  return (
    <>
      {showErrorAlert && <Alert type='error' headingLevel='h6'>Document upload failed: Please try again later.</Alert>}
      {questions.map((question, index) => (
        <div key={index}>
          <h2>{question.title}</h2>
          <div>
            <div className='display-flex flex-justify flex-wrap'>
              <h3 className='text-primary-dark'>{question.description}</h3>
              <ButtonGroup>
                <Button outline type='button' onClick={() => toggleEditMode(question.name)}>
                  {editMode[question.name] ? 'Cancel' : 'Edit'}
                </Button>
                {!editMode[question.name] && (
                  <Button type='button' onClick={() => handleAddNewClick(question.name, question.title, question.id)} disabled={isUploading}>
                    {isUploading ? 'Uploading...' : 'Add New'}
                  </Button>
                )}
                {editMode[question.name] && (
                  <Button
                    type='button'
                    onClick={async () => {
                      setIsSaving(true);
                      await handleSave();
                      setIsSaving(false);
                    }}
                    disabled={isSaving}
                  >
                    {isSaving ? 'Saving...' : 'Save'}
                  </Button>
                )}
              </ButtonGroup>
            </div>
            <Table bordered className='width-full'>
              <thead>
                <tr>
                  <th scope='col'>Name</th>
                  <th scope='col'>Author</th>
                  <th scope='col'>Created</th>
                  <th scope='col'>Program</th>
                  <th scope='col'>Type</th>
                  {editMode[question.name] && <th scope='col'>Actions</th>}
                </tr>
              </thead>
              <tbody>
                {(documents[question.name]?.[question.title] || []).map((doc, docIndex) => (
                  <tr key={docIndex}>
                    <td>{doc.name}</td>
                    <td>{doc.author}</td>
                    <td>{doc.created}</td>
                    <td>{doc.program}</td>
                    <td>{doc.type}</td>
                    {editMode[question.name] && (
                      <td>
                        <div className='display-flex flex-justify-center'>
                          <Button type='button' onClick={() => handleReplaceDocumentClick(question.name, question.title, question.id, docIndex)} disabled={isUploading}>
                            {isUploading ? 'Uploading...' : 'Replace Document'}
                          </Button>
                          <Button unstyled className='text-no-underline display-flex flex-align-center hover:text-no-underline margin-left-2' type='button' onClick={() => handleDeleteDocument(question.name, question.title, docIndex)}>
                            <Icon.Delete /> Delete
                          </Button>
                        </div>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </div>
      ))}
      <div className="flex-fill"></div>
    </>
  );
};

export default DocumentUploads;
