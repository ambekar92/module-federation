'use client'
import React, { RefObject } from 'react'
import {
  Button,
  ButtonGroup,
  Modal,
  ModalRef,
  Grid,
} from '@trussworks/react-uswds'
import Link from 'next/link';

interface TransferBusinessInstructionModalProps {
  modalRef: RefObject<ModalRef>
  handleAction: (selectedId: any) => void
}

const TransferBusinessInstructionModal: React.FC<TransferBusinessInstructionModalProps> = ({
  modalRef,
  handleAction,
}) => {

  const handleConfirm = () => {
    onClose()
  }

  const onClose = () => {
    modalRef.current?.toggleModal()
  }

  return (
    <>
      <Modal
        forceAction
        ref={modalRef}
        aria-labelledby="modal-heading"
        aria-describedby="modal-description"
        id="make-approval-modal"
        isLarge
        isInitiallyOpen
      >
        <div>
          <h2 className="text-uppercase">Instructions for Transferring Firms from One District Office to Another District Office</h2>

          <div className="grid-container">
            <h3 className="text-uppercase">Initiating District Office</h3>
            <ul>
              <li>Initiating District Office will identify the firm(s) proposed for transfer to another District Office (<a href="#">SBA District Offices | U.S. Small Business Administration</a>).</li>
              <li>Initiating District Office will provide the below, in writing, to the Receiving District Office with a copy to <a href="mailto:OFOBOS@sba.gov">OFOBOS@sba.gov</a>:
                <ul>
                  <li>Request should come from the District Director or Deputy District Director</li>
                  <li>Reason for Transfer (i.e., Principal Office relocation, etc.)</li>
                  <li>Firm(s) Name</li>
                  <li>Unique Entity Identifier (UEI)</li>
                  <li>Statement that the Annual Review(s)/Field Visit(s) have been completed by the Initiating District Office (if due)</li>
                  <li>Annual Reviews/Field Visits should be completed by the Initiating District Office prior to requesting transfer to another office.</li>
                </ul>
              </li>
              <li>If Receiving District Office accepts, Initiating District Office will submit the request, Receiving District Office’s acceptance, Firm(s)’s information, and the statement that the Annual Review(s)/Field Visit(s) due have been completed prior to transfer request to Will Washington (<a href="mailto:William.Washington@sba.gov">William.Washington@sba.gov</a>), with a copy to <a href="mailto:OFOBOS@sba.gov">OFOBOS@sba.gov</a>.</li>
              <li>If accepted and approved by OFO, the Initiating District Office will transfer the firm/case to the Receiving District Office in the system. The Initiating District Office will reflect in the SBA Notes that the firm was transferred to another District Office, per leadership, and provide the date of the transfer.</li>
            </ul>

            <h3 className="text-uppercase">Receiving District Office</h3>
            <ul>
              <li>Receiving District Office will review Firm(s)’s information from the Initiating District Office:
                <ul>
                  <li>Review if Transfer is appropriate</li>
                  <li>Review if Annual Review(s)/Field Visit(s) has been completed
                    <ul>
                      <li>Noteworthy: The Receiving District Office may reject this request if the Annual Review/Field Visit is overdue.</li>
                    </ul>
                  </li>
                </ul>
              </li>
              <li>Acceptance/Rejection should come from the District Director or Deputy District Director of the Receiving District Office with a copy to <a href="mailto:OFOBOS@sba.gov">OFOBOS@sba.gov</a>.</li>
              <li>If accepted and approved by OFO, the Initiating District Office will transfer the firm to the District Director or Deputy District Director in the Receiving District Office. The Receiving District Office will then assign the firm/case to a Business Opportunity Specialist (BOS) or Business Development Specialist (BDS) for servicing.</li>
            </ul>

            <h3 className="text-uppercase">Office of Field Operations (OFO)</h3>
            <ul>
              <li>Office of Field Operations (William Washington) will review the request package from the Initiating District Office and forward it to the OFO Team (<a href="mailto:CaSandra.Smith@sba.gov">CaSandra.Smith@sba.gov</a>) with a copy to <a href="mailto:OFOBOS@sba.gov">OFOBOS@sba.gov</a>.</li>
              <li>OFO (CaSandra Smith) will contact the Initiating/Receiving District Office to discuss the potential transfer and 1.10 and 1.8 Goal Adjustments (If needed).</li>
              <li>If approved, OFO (CaSandra Smith) will notify Will Washington to make the appropriate Goal Adjustments, if needed, and copy Stephon Ash, Victor Parker, Initiating District Office, and Receiving District Office.</li>
              <li>OFO will instruct the Initiating District Office to make the transfers in the system.</li>
              <li>OFO will notify the Office of Certification & Eligibility (OCE) to update the Master List to reflect the approved transfers.</li>
            </ul>

            <p>If you have any questions, please email: <a href="mailto:OFOBOS@sba.gov">OFOBOS@sba.gov</a>.</p>

            <Grid row className='margin-top-4'>
              <label className='text-bold margin-bottom-2'>Do you confirm that you have followed these instructions?</label>
              <Grid col={6} >
                <ButtonGroup type="default">
                  <Link href={'/field-function/district-office-portfolio'} className='usa-button usa-button--outline'>
                    Cancel
                  </Link>
                </ButtonGroup>
              </Grid>
              <Grid col={6} className="display-flex flex-justify-end">
                <ButtonGroup type="default">
                  <Button
                    type="button"
                    onClick={handleConfirm}
                  >
                    Confirm
                  </Button>
                </ButtonGroup>
              </Grid>

            </Grid>
          </div>
        </div>
      </Modal>
    </>
  )
}

export default TransferBusinessInstructionModal
