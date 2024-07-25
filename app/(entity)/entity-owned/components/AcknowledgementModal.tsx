'use client'
import React from 'react'
import {
  Modal,
  ModalHeading,
  ModalFooter,
  ButtonGroup,
  Button,
  Label,
} from '@trussworks/react-uswds'

interface AcknowledgementModalProps {
  open: boolean
  onClick: () => void
  heading?: string
}

const AcknowledgementModal: React.FC<AcknowledgementModalProps> = ({
  open,
  onClick,
  heading = '',
}) => {
  return (
    <>
      {open && (
        <>
          <Modal
            className="usa-modal--sm"
            forceAction
            aria-labelledby="modal-heading"
            aria-describedby="modal-description"
            isInitiallyOpen
            renderToPortal={false}
            id="acknowledgement-modal"
          >
            <ModalHeading id="acknowledgement-modal-heading">
              <Label htmlFor="acknowledgement-modal" className="text-bold">
                <h3>{heading}</h3>
              </Label>
            </ModalHeading>
            {/* <Grid row>
              <Grid>
                {' '} */}
            <Label htmlFor="acknowledgement-modal" className="text-normal">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </Label>
            {/* </Grid>
            </Grid> */}
            <ModalFooter>
              <ButtonGroup className="float-left">
                <Button type="button" className="float-right" onClick={onClick}>
                  Continue
                </Button>
              </ButtonGroup>
            </ModalFooter>
          </Modal>
        </>
      )}
    </>
  )
}
export default AcknowledgementModal
