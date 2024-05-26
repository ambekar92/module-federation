import React, { useState } from 'react';
import { DOCUMENT_REQUIRED_ROUTE } from '@/app/constants/routes';
import { Grid, Label } from '@trussworks/react-uswds';
import useSWR from 'swr';
import { DocumentUploadType, fetchDocumentUploadQuestions } from './documentUploadFetcher';

const DocumentUploads = () => {
  const { data: questions, error } = useSWR<DocumentUploadType[]>(DOCUMENT_REQUIRED_ROUTE, fetchDocumentUploadQuestions);
  const [selectedFiles, setSelectedFiles] = useState<{ [key: string]: File[] }>({});

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>, questionName: string) => {
    const files = event.target.files;
    if (files) {
      setSelectedFiles(prevState => ({
        ...prevState,
        [questionName]: Array.from(files)
      }));
    }
  };

  const renderFilePreview = (files: File[]) => {
    return files.map(file => {
      const fileType = file.type.split('/')[1];
      const previewImageClass = `usa-file-input__preview-image usa-file-input__preview-image--${fileType}`;
      return (
        <div key={file.name} className="usa-file-input__preview" aria-hidden="true">
          <img
            id={file.name.replace(/[^a-zA-Z0-9]/g, '_')}
            src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
            alt=""
            className={previewImageClass}
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';
              target.classList.add('usa-file-input__preview-image--pdf');
            }}
          />
          {file.name}
        </div>
      );
    });
  };

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!questions) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {questions.map((question, index) => {
        const inputId = `input-${question.name}-${index}`;
        const files = selectedFiles[question.name] || [];

        return (
          <Grid className='flex-column' row key={inputId}>
            <div className="usa-file-input">
              <div className="usa-sr-only" aria-live="polite">
                {files.length > 0 && `You have selected ${files.length} file${files.length > 1 ? 's' : ''}: ${files.map(file => file.name).join(', ')}`}
              </div>
              <Label className='maxw-full' requiredMarker={question.answer_required_flag} htmlFor={inputId}>
                <span className='text-bold'>{question.title}</span>
              </Label>
              <span className="usa-hint" id={`${inputId}-hint`}>
                Only .pdf and .txt file formats are accepted
              </span>
              <div className="usa-file-input__target">
                <div className="usa-file-input__box"></div>
                {files.length > 0 ? (
                  <div className="usa-file-input__preview-heading">
                    {files.length} file{files.length > 1 ? 's' : ''} selected <span className="usa-file-input__choose">Change files</span>
                  </div>
                ) : (
                  <div className="usa-file-input__instructions" aria-hidden="true">
                    <span className="usa-file-input__drag-text">Drag files here or </span>
                    <span className="usa-file-input__choose">choose from folder</span>
                  </div>
                )}
                {files.length > 0 && renderFilePreview(files)}
                <input
                  aria-describedby={`${inputId}-hint`}
                  id={inputId}
                  className="usa-file-input__input"
                  type="file"
                  name={question.name}
                  multiple
                  onChange={(event) => handleFileChange(event, question.name)}
                  aria-label="Change files"
                />
              </div>
            </div>
          </Grid>
        );
      })}
    </>
  );
};

export default DocumentUploads;
