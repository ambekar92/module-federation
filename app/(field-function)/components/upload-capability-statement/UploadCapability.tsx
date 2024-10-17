'use client'

import React, { useState } from 'react'
import { Alert, Button, ButtonGroup, Card, FileInput, Grid, Label, Link, Table } from '@trussworks/react-uswds'
import styles from './UploadCapability.module.scss'
import ArrowForwardIosOutlinedIcon from '@mui/icons-material/ArrowForwardIosOutlined';
import DocumentUploadInput from './DocumentUploadInput';
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';

const UploadCapability = () => {

  const [fileData, setFileData] = useState<File | null>(null)
  const [showUpload, setShowUpload] = useState(false)
  const [hideSuccessMsg, setHideSuccessMsg] = useState(false)
  const [showSubmitted, setShowSubmitted] = useState(false)
  const [documentCount, setDocumentCount] = useState(0)

  const handleFileSelect = (file: any) => {
    if (file === 'Delete') {
      setFileData(null)
    } else {
      setFileData(file)
    }
  }
  const handleSubmit = () => {
    setHideSuccessMsg(true)
    setShowSubmitted(true)
    setShowUpload(false)
    setFileData(null)

    setDocumentCount(prevCount => prevCount + 1);
  }
  const handleClose = () => {
    setHideSuccessMsg(false)
  }

  return (
    <>
      <Grid row>
        <Grid col={6}>
          <h1>Welcome [User]</h1>
        </Grid>
        <Grid col={6} className="display-flex flex-justify-end margin-bottom-1">
          <ButtonGroup type="default">
            <Button type="button"
              outline
            >
              {/* <span><AppRegistrationOutlinedIcon className='margin-right-1' /></span>  */}
              <span className='margin-bottom-2' style={{ marginBottom: '15px' }}>Invitation Code </span>
            </Button>
            <Button
              type="button"
              outline
            >
              Apply
            </Button>
          </ButtonGroup>
        </Grid>
      </Grid>

      <hr style={{ margin: '0' }} />

      <Grid row>
        <Grid col={9}>
          <p className='margin-top-2 margin-bottom-1 text'>
            <Link href='#'>Home </Link> <ArrowForwardIosOutlinedIcon style={{ fontSize: '10px' }} />
            <Link href='/dashboard/8-a'>8(a) Business Development </Link> <ArrowForwardIosOutlinedIcon style={{ fontSize: '10px' }} />
            Capability Statement
          </p>
          <h2 className='margin-top-2 margin-bottom-1 text'>Capability Statement</h2>
        </Grid>
        <Grid col={3} className="display-flex flex-justify-end margin-top-6">

          <ButtonGroup type="default">
            {
              fileData &&
              (<Button
                type="button"
                secondary
                onClick={handleSubmit}
              >
                <span className='margin-bottom-2' style={{ marginBottom: '15px' }}>Submit </span>
              </Button>)
            }
            <Button
              type="button"
              onClick={() => setShowUpload(!showUpload)}
            >
              Upload
            </Button>
          </ButtonGroup>

        </Grid>
        <Grid col={12}>
          <p className='margin-top-1 margin-bottom-1 text font-sans-md'>
            Upload your business&apos;s capability statement here.
          </p>
        </Grid>
        <Grid col={12}>
          <p className='margin-top-0 margin-bottom-1 font-sans-3xs text'>
            Please be advised that the Capability Statement will be published to the SBS (Small Business Search)
            which is a public website. External users will see your Capability Statement
          </p>
        </Grid>

        <Grid col={12} className='margin-top-2'>
          {
            hideSuccessMsg &&
            <Alert type="success" headingLevel="h4" slim cta={<span onClick={handleClose}><CloseOutlinedIcon style={{ marginRight: '8px' }} /></span>}>
              Your document was successfully uploaded
            </Alert>
          }

          {/* <Alert type="error" headingLevel="h4" slim>
            There was an issue uploading your document. Please try again
          </Alert> */}
        </Grid>

      </Grid>

      {
        showUpload &&
        (
          <>
            <Grid row className='margin-top-3 margin-bottom-1'>
              <Grid col={2} >
                <span className='font-sans-md'>UPLOADED DOCUMENTS</span>
              </Grid>
              <Grid col={10}>
                <hr className={styles['hrColor']} />
              </Grid>
            </Grid>

            <Grid row className='margin-top-1 margin-bottom-3'>
              <Grid col={12} >
                <DocumentUploadInput
                  name="uploadCapability"
                  label=""
                  hint=""
                  onFileSelect={handleFileSelect}
                />
              </Grid>
            </Grid>
          </>
        )
      }

      {
        showSubmitted &&
        (
          <>
            <Grid row className='margin-top-3 margin-bottom-1'>
              <Grid col={2} >
                <span className='font-sans-md'>SUBMITTED DOCUMENTS</span>
              </Grid>
              <Grid col={10}>
                <hr className={styles['hrColor']} />
              </Grid>
            </Grid>

            {documentCount > 0 &&
              Array.from({ length: documentCount }, (_, index) => (
                <Grid row className={styles['submittedDoc']} key={index}>
                  <Grid col={1}>
                    <div className='padding-2'>
                      <ImageOutlinedIcon style={{ fontSize: '30px' }} />
                    </div>
                  </Grid>
                  <Grid col={2}>
                    <div>
                      <p className='text-bold margin-bottom-0'>Document name</p>
                      <p className='text-base margin-top-0 font-sans-3xs'>25 MB</p>
                    </div>
                  </Grid>
                </Grid>
              ))

            }

          </>
        )
      }

    </>
  )
}

export default UploadCapability
