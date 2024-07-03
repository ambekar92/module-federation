import { DOCUMENT_REQUIRED_ROUTE } from '@/app/constants/routes';
import { fetcherGET } from '@/app/services/fetcher';
import { useApplicationId } from '@/app/shared/hooks/useApplicationIdResult';
import { Button, ButtonGroup, Icon, Table } from '@trussworks/react-uswds';
import { useSession } from 'next-auth/react';
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

const DocumentUploads = () => {
  const { data: session } = useSession();
  const { applicationId } = useApplicationId();
  const { data: questions, error } = useSWR(
    applicationId ? `${DOCUMENT_REQUIRED_ROUTE}/${applicationId}` : null,
		fetcherGET<DocumentUploadType>
  );
  const [documents, setDocuments] = useState<DocumentsState>({});
  const [editMode, setEditMode] = useState<{ [key: string]: boolean }>({});
  const [originalDocuments, setOriginalDocuments] = useState<DocumentsState>({});

  useEffect(() => {
    if (questions) {
      const initialDocuments: DocumentsState = {};
      questions.forEach(question => {
        initialDocuments[question.name] = { [question.title]: [] };
      });
      setDocuments(initialDocuments);
    }
  }, [questions]);

  const handleFileUpload = (sectionName: string, subSectionName: string, file: File, replaceIndex: number | null = null) => {
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
  };

  const handleAddNewClick = (sectionName: string, subSectionName: string) => {
    const input = document.createElement('input');
    input.type = 'file';
    input.onchange = (event: Event) => {
      const target = event.target as HTMLInputElement;
      if (target.files?.length) {
        handleFileUpload(sectionName, subSectionName, target.files[0]);
      }
    };
    input.click();
  };

  const handleReplaceDocumentClick = (sectionName: string, subSectionName: string, index: number) => {
    const input = document.createElement('input');
    input.type = 'file';
    input.onchange = (event: Event) => {
      const target = event.target as HTMLInputElement;
      if (target.files?.length) {
        handleFileUpload(sectionName, subSectionName, target.files[0], index);
      }
    };
    input.click();
  };

  const handleDeleteDocument = (sectionName: string, subSectionName: string, index: number) => {
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

  const handleSave = () => {
    setEditMode({});
  };

  const handleCancel = (sectionName: string) => {
    setDocuments(originalDocuments);
    setEditMode(prevEditMode => ({ ...prevEditMode, [sectionName]: false }));
  };

  if (error) {return <div>Error: {error.message}</div>;}
  if (!questions) {return <div>Loading...</div>;}

  return (
    <>
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
                {editMode[question.name] && (
                  <Button type='button' onClick={handleSave}>Save</Button>
                )}
                {!editMode[question.name] && (
                  <Button type='button' onClick={() => handleAddNewClick(question.name, question.title)}>Add New</Button>
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
                  <th scope='col'>Actions</th>
                  {editMode[question.name] && <th scope='col'>Delete</th>}
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
                    <td>
                      <div className='display-flex'>
                        <Button unstyled type='button' onClick={() => handleReplaceDocumentClick(question.name, question.title, docIndex)}>Replace Document</Button>
                        <Button unstyled className='text-no-underline display-flex flex-align-center hover:text-no-underline' type='button' onClick={() => handleDeleteDocument(question.name, question.title, docIndex)}>
                          <Icon.Delete /> Delete
                        </Button>
                      </div>
                    </td>
                    {editMode[question.name] && (
                      <td>
                        <Button unstyled className='text-no-underline display-flex flex-align-center hover:text-no-underline' type='button' onClick={() => handleDeleteDocument(question.name, question.title, docIndex)}>
                          <Icon.Delete /> Delete
                        </Button>
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
