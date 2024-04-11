import React, { useRef } from 'react'
import { ButtonGroup, Modal, ModalRef, ModalHeading, ModalFooter, ModalToggleButton } from '@trussworks/react-uswds'
import '../../../styles/global.scss'

interface ModalProps {
   modalTitle: string
   subModalTitle: string
   modalBody: React.ReactNode
}

const ParticipationAgreementModal: React.FC<ModalProps> = ({ modalTitle, subModalTitle, modalBody }) => {
   const modalRef = useRef<ModalRef>(null)

   return (
      <>
         <ModalToggleButton modalRef={modalRef} opener type="button">
            Open persistent modal
         </ModalToggleButton>
         <Modal
            ref={modalRef}
            forceAction
            aria-labelledby="modal-heading"
            aria-describedby="modal-description"
            isLarge
            isInitiallyOpen={false} // set to false for the moment, until feature is fully built out so that it is persistent
            id="participation-modal"
         >
            <div className="participation-modal-heading">
               <ModalHeading id="participation-modal-heading1">{modalTitle}</ModalHeading>
               <ModalHeading id="participation-modal-heading2">{subModalTitle}</ModalHeading>
            </div>
            <hr className="top-divider" />
            <div className="usa-prose">{modalBody}</div>
            <hr className="bottom-divider" />
            <ModalFooter>
               <ButtonGroup className="default-btn">
                  <ModalToggleButton modalRef={modalRef} outline type="button">
                     Download copy
                  </ModalToggleButton>
                  <ModalToggleButton modalRef={modalRef} closer type="submit">
                     Start
                  </ModalToggleButton>
               </ButtonGroup>
            </ModalFooter>
         </Modal>
      </>
   )
}

export default ParticipationAgreementModal
