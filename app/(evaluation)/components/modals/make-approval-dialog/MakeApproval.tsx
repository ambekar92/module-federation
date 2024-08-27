'use client'
import React, { RefObject, useState, ChangeEvent } from 'react'
import {
  Button,
  ButtonGroup,
  Label,
  Modal,
  ModalFooter,
  ModalHeading,
  Table,
  ModalRef,
} from '@trussworks/react-uswds'

interface MakeApprovalProps {
  modalRef: RefObject<ModalRef>
  title: string
  handleAction: () => void
}

const approvalLetter = {
  data: {
    date: '06/08/2024',
    businessPOC: 'Business POC',
    businessName: 'Business name',
    businessAddress: 'Business address',
    businessDevelopmentProgram: '8(a) Business Development (8(a) BD) Program',
    hUBZoneProgram: 'HUBZone Program',
    womenOwnedSmallBusiness: 'Women-Owned Small Business (WOSB)',
    economicallyDisadvantaged: 'Economically Disadvantaged Women-Owned Small Business (EDWOSB)',
    veteranOwnedSmallBusiness: 'Veteran-Owned Small Business (VOSB)',
    serviceDisabledVeteranOwnedSmallBusiness: 'Service-Disabled Veteran-Owned Small Business (SDVOSB)',
    eligible: '8(a)/HUBZone/WOSB/EDWOSB/VOSB/SDVOSB',
    publicSearchName: 'Public search name',
    dateYear: '06, 2024',
  }
}

const MakeApproval: React.FC<MakeApprovalProps> = ({
  modalRef,
  title,
  handleAction,
}) => {
  const [requiredFields, setRequiredFields] = useState(true)

  const handleActionSubmit = async () => {
    handleAction()
    onClose()
  }

  const onChange = (e: any, field: string) => {
    if (field === 'signature') {
      setRequiredFields(!e.target.checked)
    }
  }

  const onClose = () => {
    setRequiredFields(true)
    modalRef.current?.toggleModal()
  }

  return (
    <>
      <Modal
        forceAction
        ref={modalRef}
        aria-labelledby="modal-heading"
        aria-describedby="modal-description"
        isLarge
        id="make-approval-modal"
      >
        <ModalHeading id="make-approval-modal-heading">
          <Label htmlFor="make-approval-modal">
            <h2 className="text-bold">{title}</h2>
          </Label>
        </ModalHeading>

        <div>
          <div className="display-flex flex-row flex-justify">
            <Label className="text-light" htmlFor="action-modal-notes-table">
              Combined Approval Letter
            </Label>
            <Button type="button" className="float-left" outline>
              View PDF
            </Button>
          </div>
          <Table bordered fullWidth>
            <tbody>
              <tr>
                <td>
                  <p className='margin-0'>{approvalLetter?.data.date}</p>
                  <p className='margin-0'>{approvalLetter?.data.businessPOC} (Qualifying Owner)</p>
                  <p className='margin-0'>{approvalLetter?.data.businessName}</p>
                  <p className='margin-0'>{approvalLetter?.data.businessAddress}</p>

                  <p>Dear {approvalLetter?.data.businessPOC},</p>

                  <p>Congratulations! I am pleased to inform you that {approvalLetter?.data.businessName} has been approved for the following U.S. Small Business Administration (SBA) certification(s):</p>

                  <p className='margin-0'>{approvalLetter?.data.businessDevelopmentProgram}</p>
                  <p className='margin-0'>{approvalLetter?.data.hUBZoneProgram}</p>
                  <p className='margin-0'>{approvalLetter?.data.womenOwnedSmallBusiness}</p>
                  <p className='margin-0'>{approvalLetter?.data.economicallyDisadvantaged}</p>
                  <p className='margin-0'>{approvalLetter?.data.veteranOwnedSmallBusiness}</p>
                  <p className='margin-0'>{approvalLetter?.data.serviceDisabledVeteranOwnedSmallBusiness}</p>

                  <p>{approvalLetter?.data.businessName} is eligible for {approvalLetter?.data.eligible} contracts and will be identified as a certified {approvalLetter?.data.eligible} program participant in {approvalLetter?.data.publicSearchName} as of the date of this letter, {approvalLetter?.data.dateYear}.</p>

                  <p>To align with your existing {approvalLetter?.data.eligible} certification, your effective date for recertification for all your SBA certifications is {approvalLetter?.data.dateYear}. Your first certification renewal will be due {approvalLetter?.data.date}.</p>

                  <p>Responsibilities</p>

                  <p>The information below sets forth requirements related to your business&apos; continued eligibility and its responsibilities as a certified program participant:</p>

                  <p>Reporting Changes: You are required to notify SBA in writing of changes to your business that could affect its eligibility. Please refer to the attached supplemental pages for more details and examples.</p>

                  <p>System for Award Management (SAM.gov): You must keep the business&apos; SAM.gov profile and DSBS records up-to-date in order for the business to receive benefits from our Programs (i.e., to be identified by contracting officers as eligible to be awarded small business set-aside contracts and to be paid under any such contracts). You must validate your business&apos; SAM.gov information at least annually or your SAM.gov registration will become inactive. If you need assistance in updating the business&apos; SAM.gov or DSBS information, please go to the SAM.gov Help Desk at https://fsd.gov/fsd-gov/home.do.</p>

                  <p>Notices from SBA: You are responsible for responding to notices from SBA, including but not limited to notices regarding certification renewals, eligibility reviews, protests, proposed decertification and termination actions, and recertification requirements. All SBA Programs send such notices to the business&apos; email address listed in its MySBA Profile. If the business fails to respond to these notices, SBA will propose the business for decertification or termination and may subsequently decertify or terminate it from participation in SBA Programs. Therefore, it is critical that you keep the business&apos; SAM.gov and MySBA profiles current, including listing an active email address for contacting the business, and check your email&apos;s SPAM folder to make sure that you are receiving emails from SBA.</p>

                  <p>Contracting Requirements: You are required to comply with limitations on subcontracting requirements and nonmanufacturer rule when performing any small business set-aside contracts (see 13 CFR 125.6)</p>

                  <p>Resources and More Information</p>

                  <p>As a certified {approvalLetter?.data.eligible} program participant, there are valuable free resources available to you, including:</p>

                  <p>SBA Resource Partners: For general assistance on various topics, information on SBA programs, and upcoming small business events in your area. You can find your local resource partner by visiting: https://www.sba.gov/tools/local-assistance.</p>

                  <p>The “Contract Opportunities” function in SAM.gov (https://sam.gov/content/opportunities) serves as a central listing for Federal procurement opportunities. Anyone interested in doing business with the government can use this system to search opportunities. In addition, the “Contract Data” function in SAM.gov (https://sam.gov/content/contract-data) is a database</p>

                </td>
              </tr>
            </tbody>
          </Table>

          <Label htmlFor="action-modal" className="text-bold">
            <h4>Signature</h4>
          </Label>
          <div className="padding-bottom-4">
            <input
              className="usa-checkbox__input"
              id="action-modal-signature-checkbox"
              type="checkbox"
              value="checked"
              name="checked"
              onClick={(e) => {
                onChange(e, 'signature')
              }}
            />
            <Label
              className="usa-checkbox__label maxw-full width-full"
              htmlFor="action-modal-signature-checkbox"
            >
              By clicking this checkbox, you are attesting that you&apos;ve done a thorough review and are ready to officially approve or deny the certifications listed in this application. Once you select “Sign and Submit”, the applicant will be notified and receive their official letters.
            </Label>
          </div>
        </div>

        <ModalFooter>
          <ButtonGroup className="float-left">
            <Button
              type="button"
              className="float-left"
              onClick={handleActionSubmit}
              disabled={requiredFields}
            >
              Sign and Submit
            </Button>
            <Button
              type="button"
              className="float-left"
              onClick={onClose}
              outline
            >
              Cancel
            </Button>
          </ButtonGroup>
        </ModalFooter>
      </Modal>
    </>
  )
}

export default MakeApproval
