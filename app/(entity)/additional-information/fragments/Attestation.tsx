'use client'
import CustomHeader from '@/app/shared/components/forms/CustomHeader';
import QAWrapper from '@/app/shared/components/forms/QAWrapper';
import StepsIndicator from '@/app/shared/components/forms/StepsIndicator';
import CloseIcon from '@mui/icons-material/Close';
import SaveIcon from '@mui/icons-material/Save';
import { Button, ButtonGroup, Modal, ModalFooter, ModalHeading, ModalRef, ModalToggleButton } from '@trussworks/react-uswds';
import Link from 'next/link';
import { useRef, useState } from 'react';
import QuestionContent from '../components/QuestionContent';
import Sidebar from '../components/Sidebar';
import AttestationJSON from '../components/form-data.json';
import { sections } from '../utils/helpers';

const Attestation = () => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const modalRef = useRef<ModalRef>(null);

  const handleModalToggle = () => {
    if(formSubmitted) {
      setFormSubmitted(false);
    }
    modalRef.current?.toggleModal();
  }

  return (
    <section>
      <CustomHeader title='Additional Information'>
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
        currentStep={3}
        steps={sections.map(section => section.sectionName)}
        headingLevel="h4"
      />

      <QAWrapper
        sidebar={<Sidebar sections={sections} />}
        mainContent={<QuestionContent currentSection={AttestationJSON[1]} />}
      />

      <ButtonGroup className='display-flex flex-justify flex-fill border-top padding-y-2'>
        <Link className='usa-button' href='/additional-information/eighta?step=4'>
          Previous
        </Link>
        <Button type='button' onClick={handleModalToggle}>Submit</Button>
      </ButtonGroup>

      <Modal ref={modalRef} id="example-modal-1" aria-labelledby="modal-1-heading" aria-describedby="modal-1-description">
        <ModalHeading id="modal-1-heading">
          {formSubmitted ? 'Submission Successful' : 'Are you sure?'}
        </ModalHeading>
        <div className="usa-prose">
          <p id="modal-1-description">
					 Are you sure you&apos;re ready to submit your application?
          </p>
        </div>
        <ModalFooter>
          <ButtonGroup>
            <Link className='usa-button usa-button' href='/user/firm/dashboard'>
							Submit
            </Link>
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
