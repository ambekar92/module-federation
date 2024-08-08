import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import { ErrorMessage, FormGroup, Label } from '@trussworks/react-uswds';
import React, { useState, useRef } from 'react';
import styles from './DocumentUploadInput.module.scss';

type InputProps = {
  name: string;
  label: string;
  hint?: string;
  onFileSelect?: (file: any) => void;
} & Partial<Pick<HTMLInputElement, 'disabled' | 'required' | 'type'>>;

const DocumentUploadInput: React.FC<InputProps> = ({
  name,
  label,
  hint,
  onFileSelect,
  ...props
}) => {
  const [file, setFile] = useState<File>();
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    e.stopPropagation();
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      if (onFileSelect) {
        onFileSelect(e.target.files[0]);
      }
    }
  }

  function handleButtonClick(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    fileInputRef.current?.click();
  }

  return (
    <FormGroup error={!!error} className="bg-white radius-sm padding-4">
      <Label error={!!error} htmlFor={name} requiredMarker={props.required}>{label}</Label>
      <span className='text-base'>{hint}</span>
      <ErrorMessage>{error}</ErrorMessage>
      {!file && (
        <div className={styles.file}>
          <span
            className='text-blue text-underline'
            onClick={handleButtonClick}
            style={{ cursor: 'pointer' }}
          >
            Choose file
          </span>
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
        </div>
      )}
      {file && (
        <div className={styles.selected}>
          <div className={styles.selectedHeader}>
            <strong>Selected file</strong>
            <span>
              <span
                className='text-blue text-underline'
                onClick={handleButtonClick}
                style={{ cursor: 'pointer' }}
              >
                Change File
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
