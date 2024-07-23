import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import { ErrorMessage, FormGroup, Label } from '@trussworks/react-uswds';
import React, { useState } from 'react';
import { Controller, FieldValues, Path, useFormContext } from 'react-hook-form';
import styles from './DocumentUpload.module.scss';

type InputProps<T extends FieldValues> = {
    name: Path<T>;
    label: string;
    hint?: string;
} & Partial<Pick<HTMLInputElement, 'disabled' | 'required' | 'type'>>

const DocumentUpload = <T extends FieldValues>({ name, label, hint, ...props }: InputProps<T>) => {
    const { control } = useFormContext<T>();
    const [file, setFile] = useState<File>();

    function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
        setFile(e.target.files![0])
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
                    {!file && <div className={styles.file}>
                        <span className='text-blue text-underline'>Choose file</span>
                        <input onChange={handleFileChange} type="file" id={name} value={field.value} name={field.name} className={styles['hidden-input']} />
                    </div>}
                    {
                        file && <div className={styles.selected}>
                            <div className={styles.selectedHeader}>
                                <strong>Selected file</strong>
                                <span>
                                    <input onChange={handleFileChange} type="file" id={name} value={field.value} name={field.name} className={styles['hidden-input']} />
                                    <span className='text-blue text-underline'>Change File</span>
                                </span>
                            </div>
                            <div className={styles.fileInfo}>
                                <InsertDriveFileIcon sx={{fontSize: '2rem', color: '#1a4480'}} />
                                <span>{file.name}</span>
                            </div>
                        </div>
                    }
                </FormGroup>
            )}
        />
    )
}

export default DocumentUpload