'use client'
import CustomHeader from '@/app/shared/components/forms/CustomHeader';
import QAWrapper from '@/app/shared/components/forms/QAWrapper';
import StepsIndicator from '@/app/shared/components/forms/StepsIndicator';
import CloseIcon from '@mui/icons-material/Close';
import SaveIcon from '@mui/icons-material/Save';
import { Button, ButtonGroup, Modal, ModalFooter, ModalHeading, ModalRef, ModalToggleButton } from '@trussworks/react-uswds';
import Link from 'next/link';
import { useRef, useState } from 'react';
import AttestationJSON from '../utils/form-data.json';
import MainContent from './MainContent';
import Sidebar from './Sidebar';

const Attestation = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const modalRef = useRef<ModalRef>(null);

  const handleNext = () => {
    if (currentStep < AttestationJSON.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleFormSubmit = () => {
    setFormSubmitted(true);
  }

  const handleModalToggle = () => {
    if(formSubmitted) {
      setFormSubmitted(false);
    }
    modalRef.current?.toggleModal();
  }

  return (
    <section>
      <CustomHeader title='Application'>
        <ButtonGroup>
          <Button className='padding-1 display-flex flex-align-center' outline type='button'>
            <CloseIcon fontSize='medium' /> Close
          </Button>
          <Button className='padding-1 display-flex flex-align-center' outline type='button'>
            <SaveIcon fontSize='medium' className='margin-right-05' /> Save
          </Button>
        </ButtonGroup>
      </CustomHeader>

      <StepsIndicator
        currentStep={currentStep}
        steps={AttestationJSON.map(section => section.sectionName)}
        headingLevel="h4"
      />

      <QAWrapper
        sidebar={<Sidebar sections={AttestationJSON} handleStep={setCurrentStep} />}
        mainContent={<MainContent currentSection={AttestationJSON[currentStep]} />}
      />

      <ButtonGroup className='display-flex flex-justify flex-fill border-top padding-y-2'>
        <Button type='button' onClick={handlePrevious} disabled={currentStep === 0}>
          Previous
        </Button>
        {currentStep === AttestationJSON.length - 1
          ? <Button type='button' onClick={handleModalToggle}>Submit</Button>
          : <Button type='button' onClick={handleNext}>Next</Button>
        }
      </ButtonGroup>

      <Modal ref={modalRef} id="example-modal-1" aria-labelledby="modal-1-heading" aria-describedby="modal-1-description">
        <ModalHeading id="modal-1-heading">
          {formSubmitted ? 'Submission Successful' : 'Are you sure?'}
        </ModalHeading>
        <div className="usa-prose">
          <p id="modal-1-description">
            {formSubmitted ? 'Your business plan has been submitted. Check your email for further instructions.' : 'Are you sure you’re ready to submit your business plan?'}
          </p>
        </div>
        <ModalFooter>
          <ButtonGroup>
            {formSubmitted
              ? (
                <Link className='usa-button usa-button' href='/'>
									Close
                </Link>
              )
              : (
							 	<Button type='button' onClick={formSubmitted ? handleModalToggle : handleFormSubmit} className='usa-button'>
									Submit
                </Button>
              )
            }
            {!formSubmitted && (
              <ModalToggleButton modalRef={modalRef} closer unstyled className="padding-105 text-center">
                Go back
              </ModalToggleButton>
            )}
          </ButtonGroup>
        </ModalFooter>
      </Modal>
    </section>
  )
}
export default Attestation;
