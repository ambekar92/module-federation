import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import { ErrorMessage, FormGroup, Label } from '@trussworks/react-uswds';
import React, { useState, useRef } from 'react';
import styles from './DocumentUploadInput.module.scss';;
import axios from 'axios';
import { APPLICATION_DOCUMENTS_ROUTE } from '@/app/constants/local-routes';

type InputProps = {
  name: string;
  label: string;
  hint?: string;
  onFileSelect: (file: File) => void;
  documentId?: number | undefined;
} & Partial<Pick<HTMLInputElement, 'disabled' | 'required' | 'type'>>;

const DocumentUploadInput: React.FC<InputProps> = ({
  name,
  label,
  hint,
  onFileSelect,
  documentId,
  ...props
}) => {
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    e.stopPropagation();
    if (e.target.files && e.target.files[0]) {
      const newFile = e.target.files[0];
      setFile(newFile);
      onFileSelect(newFile);
    }
  }

  function handleButtonClick(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
      fileInputRef.current.click();
    }
  }

  async function handleDeleteFile(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    try {
      if (documentId) {
        await axios.delete(APPLICATION_DOCUMENTS_ROUTE, {
          data: { document_id: documentId }
        });
      }
      setFile(null);
      setError(null);
    } catch (error) {
      setError('Document could not be deleted, please try again.');
    }
  }

  return (
    <FormGroup error={!!error} className="bg-white radius-sm padding-4">
      <Label error={!!error} htmlFor={name} requiredMarker={props.required}>{label}</Label>
      <span className='text-base'>{hint}</span>
      <ErrorMessage>{error}</ErrorMessage>
      <input
        ref={fileInputRef}
        onChange={handleFileChange}
        type="file"
        id={name}
        name={name}
        className={styles['hidden-input']}
        style={{ display: 'none' }}
        {...props}
      />
      {!file && (
        <div className={styles.file}>
          <span
            className='text-blue text-underline'
            onClick={handleButtonClick}
            style={{ cursor: 'pointer' }}
          >
            Choose file
          </span>
        </div>
      )}
      {file && (
        <div className={styles.selected}>
          <div className={styles.selectedHeader}>
            <strong>Selected file</strong>
            <span>
              <span
                className='text-blue text-underline margin-right-1'
                onClick={handleButtonClick}
                style={{ cursor: 'pointer' }}
              >
                Change File
              </span>
              <span
                className='text-blue text-underline'
                onClick={handleDeleteFile}
                style={{ cursor: 'pointer' }}
              >
                Delete
              </span>
            </span>
          </div>
          <div className={styles.fileInfo}>
            <InsertDriveFileIcon sx={{fontSize: '2rem', color: '#1a4480'}} />
            <span>{file.name}</span>
          </div>
        </div>
      )}
    </FormGroup>
  );
}

export default DocumentUploadInput;
