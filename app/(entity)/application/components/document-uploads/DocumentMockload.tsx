import React, { useState } from 'react'
import { documentSections } from './utils/mockHelpers'
import { useSession } from 'next-auth/react'
import { Button, ButtonGroup, Icon, Table } from '@trussworks/react-uswds'

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

function DocumentMockload() {
  const session = useSession()
  const [documents, setDocuments] = useState<DocumentsState>({});
  const [editMode, setEditMode] = useState<{ [key: string]: boolean }>({});
  const [originalDocuments, setOriginalDocuments] = useState<DocumentsState>({});

  const handleFileUpload = (sectionName: string, subSectionName: string, file: File, replaceIndex: number | null = null) => {
    const newDocument: DocumentDetails = {
      name: file.name,
      author: session.data?.user?.name || '',
      created: new Date().toLocaleDateString(),
      program: 'General',
      type: file.type,
    };

    setDocuments((prevDocuments) => {
      const updatedSubSection = replaceIndex !== null
        ? prevDocuments[sectionName][subSectionName].map((doc, index) => index === replaceIndex ? newDocument : doc)
        : [...(prevDocuments[sectionName]?.[subSectionName] || []), newDocument];

      const updatedSection = {
        ...(prevDocuments[sectionName] || {}),
        [subSectionName]: updatedSubSection,
      };
      return { ...prevDocuments, [sectionName]: updatedSection };
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
    setDocuments((prevDocuments) => {
      const updatedSubSection = prevDocuments[sectionName][subSectionName].filter((_, docIndex) => docIndex !== index);
      const updatedSection = {
        ...(prevDocuments[sectionName] || {}),
        [subSectionName]: updatedSubSection,
      };
      return { ...prevDocuments, [sectionName]: updatedSection };
    });
  };

  const toggleEditMode = (sectionName: string) => {
    setEditMode((prevEditMode) => {
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
    setEditMode((prevEditMode) => ({ ...prevEditMode, [sectionName]: false }));
  };

  return (
    <>
      {documentSections.map((section, index) => (
        <div key={index}>
          <h2>{section.sectionName}</h2>
          {section.subSectionNames.map((subSection, subIndex) => (
            <div key={subIndex}>
              <div className='display-flex flex-justify flex-wrap'>
                <h3 className='text-primary-dark'>{subSection}</h3>
                <ButtonGroup>
                  <Button outline type='button' onClick={() => toggleEditMode(section.sectionName)}>
                    {editMode[section.sectionName] ? 'Cancel' : 'Edit'}
                  </Button>
                  {editMode[section.sectionName] && (
                    <Button type='button' onClick={handleSave}>Save</Button>
                  )}
                  {!editMode[section.sectionName] && (
                    <Button type='button' onClick={() => handleAddNewClick(section.sectionName, subSection)}>Add New</Button>
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
                    {editMode[section.sectionName] && <th scope='col'>Delete</th>}
                  </tr>
                </thead>
                <tbody>
                  {(documents[section.sectionName]?.[subSection] || []).map((doc, docIndex) => (
                    <tr key={docIndex}>
                      <td>{doc.name}</td>
                      <td>{doc.author}</td>
                      <td>{doc.created}</td>
                      <td>{doc.program}</td>
                      <td>{doc.type}</td>
                      <td>
                        <div className='display-flex'>
                          <Button unstyled type='button' onClick={() => handleReplaceDocumentClick(section.sectionName, subSection, docIndex)}>Replace Document</Button>
                          <Button unstyled className='text-no-underline display-flex flex-align-center hover:text-no-underline' type='button' onClick={() => handleDeleteDocument(section.sectionName, subSection, docIndex)}>
                            <Icon.Delete /> Delete
                          </Button>
                        </div>
                      </td>

                      {editMode[section.sectionName] && (
                        <td>
                          <Button unstyled className='text-no-underline display-flex flex-align-center hover:text-no-underline' type='button' onClick={() => handleDeleteDocument(section.sectionName, subSection, docIndex)}>
                            <Icon.Delete /> Delete
                          </Button>
                        </td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          ))}
        </div>
      ))}
      <div className="flex-fill"></div>
    </>
  )
}

export default DocumentMockload;
