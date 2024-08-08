import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import { ErrorMessage, FormGroup, Label } from '@trussworks/react-uswds';
import React, { useRef, useState } from 'react';
import { Controller, FieldValues, Path, useFormContext } from 'react-hook-form';
import styles from './DocumentUpload.module.scss';

type InputProps<T extends FieldValues> = {
    name: Path<T>;
    label: string;
    hint?: string;
    onFileSelect?:(file:any) => void;
} & Partial<Pick<HTMLInputElement, 'disabled' | 'required' | 'type'>>

const DocumentUpload = <T extends FieldValues>({ name, label, hint, onFileSelect, ...props }: InputProps<T>) => {
  const { control } = useFormContext<T>();
  const [file, setFile] = useState<File>();
  const fileInputRef = useRef<HTMLInputElement>(null);

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      onFileSelect(e.target.files[0]);
    }
  }

  function handleButtonClick(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    fileInputRef.current?.click();
  }

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <FormGroup error={!!error} className="bg-white radius-sm padding-4">
          <Label error={!!error} htmlFor={name} requiredMarker={props.required}>{label}</Label>
          <span className='text-base'>{hint}</span>
          <ErrorMessage>{error?.message}</ErrorMessage>
          {!file && (
            <div className={styles.file}>
              <button onClick={handleButtonClick} className="usa-button usa-button--outline">
                Choose file
              </button>
              <input
                ref={fileInputRef}
                onChange={handleFileChange}
                type="file"
                id={name}
                name={field.name}
                style={{ display: 'none' }}
              />
            </div>
          )}
          {file && (
            <div className={styles.selected}>
              <div className={styles.selectedHeader}>
                <strong>Selected file</strong>
                <button onClick={handleButtonClick} className="usa-button usa-button--outline">
                  Change File
                </button>
              </div>
              <div className={styles.fileInfo}>
                <InsertDriveFileIcon sx={{fontSize: '2rem', color: '#1a4480'}} />
                <span>{file.name}</span>
              </div>
            </div>
          )}
        </FormGroup>
      )}
    />
  );
}

export default DocumentUpload;
