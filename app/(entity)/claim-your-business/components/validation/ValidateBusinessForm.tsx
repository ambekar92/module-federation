import { buildRoute, SELECT_INTENDED_PROGRAMS_PAGE } from '@/app/constants/url'
import { useSessionUCMS } from '@/app/lib/auth'
import { Show } from '@/app/shared/components/Show'
import {
  Button,
  ButtonGroup,
  Grid,
  GridContainer,
  Label,
  Link,
  Select
} from '@trussworks/react-uswds'
import { lowerCase } from 'lodash'
import { useEffect, useState } from 'react'
import { CmbResponseType } from '../../utils/types'
import ConfirmModal from '../modals/ConfirmModal'
import ErrorModal from '../modals/ErrorModal'
import SuccessModal from '../modals/SuccessModal'
import ValidationTable from './ValidationTable'

interface ValidateBusinessFormProps {
  samData: CmbResponseType
}
const BusinessStructureOptions = [
  'Sole Proprietorship',
  'Partnership',
  'Corporation',
  'Limited Liability Company',
]

function ValidateBusinessForm({ samData }: ValidateBusinessFormProps) {
  const [open, setOpen] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')
  const [isPostSuccessful, setPostSuccessful] = useState(false)
  const [entityId, setEntityId] = useState<number | undefined>()
  const [selectedStructure, setSelectedStructure] = useState<string>('');
  const [structureError, setStructureError] = useState(false)
  const session = useSessionUCMS()
  const entityStructure = samData?.sam_entity_structure

  const handleClose = () => {
    setOpen(false)
    if (errorMsg !== '') {
      setErrorMsg('')
    }
  }

  const handleOpen = () => {
    if (!selectedStructure) {
      setStructureError(true)
      return
    }
    setStructureError(false)

    if (session && session.data.user_id === 0) {
      setErrorMsg('cannot create entity')
    }
    setOpen(true)
  }

  useEffect(() => window.scrollTo({ top: 0, behavior: 'smooth' }), [])

  return (
    <>
      <GridContainer containerSize="widescreen">
        <Show>
          <Show.When isTrue={open && errorMsg === 'success'}>
            <SuccessModal open={open} handleClose={handleClose} />
          </Show.When>
        </Show>

        <Show>
          <Show.When isTrue={open && errorMsg === 'network error'}>
            <ErrorModal
              open={open}
              handleClose={handleClose}
              error={errorMsg}
            />
          </Show.When>
        </Show>

        <Show>
          <Show.When isTrue={open && errorMsg === ''}>
            <ConfirmModal
              handleClose={handleClose}
              handleOpen={handleOpen}
              open={open}
              selectedStructure={selectedStructure}
              setErrorMsg={setErrorMsg}
              setPostSuccessful={setPostSuccessful}
              business={samData}
              setEntityId={setEntityId}
            />
          </Show.When>
        </Show>

        <Show>
          <Show.When isTrue={open && errorMsg !== ''}>
            <ErrorModal
              open={open}
              handleClose={handleClose}
              error={errorMsg}
            />
          </Show.When>
        </Show>

        <Grid row>
          <Grid col={12}>
            <h1 className="underline-heading border-bottom-1px border-base-lighter padding-bottom-2">Claim Your Business</h1>
          </Grid>
        </Grid>
        <Grid row gap>
          <Grid
            mobile={{ col: 12 }}
            desktop={{ col: 6 }}
            style={{ marginBottom: '1rem' }}
          >
            <div className='margin-bottom-3'>
              <Label className={'maxw-full text-bold display-flex'} requiredMarker htmlFor='business-type'>
								Confirm your Business Type
              </Label>
              <Select
                id='business-type'
                name='business-type'
                value={selectedStructure}
                onChange={(e) => setSelectedStructure(e.target.value)}
                disabled={isPostSuccessful}
              >
                <option value="">- Select -</option>
                {BusinessStructureOptions.map((option, idx) => (
                  <option key={idx} value={lowerCase(option)}>
                    {option}
                  </option>
                ))}
              </Select>
              {structureError && <p style={{ color: '#e41d3d' }}>Please select your business type.</p>}
            </div>
            {samData.sam_entity.length > 0 && (
              <div className="margin-bottom-4">
                <div className="default-table">
                  <ValidationTable
                    profiles={{
                      ...samData,
                      sam_entity: [samData.sam_entity[0]],
                    }}
                  />
                </div>
              </div>
            )}
            {samData.sam_entity.length > 1 && (
              <>
                <h2>Associated Businesses</h2>
                {samData.sam_entity.slice(1).map((entity, index) => (
                  <div key={index} className="margin-bottom-4">
                    <div className="default-table">
                      <ValidationTable
                        profiles={{
                          ...samData,
                          sam_entity: [entity],
                        }}
                      />
                    </div>
                  </div>
                ))}
              </>
            )}
          </Grid>
        </Grid>
        <Grid row>
          <Grid col={12}>
            <ButtonGroup
              className="display-flex flex-justify width-full padding-y-2"
              type="default"
            >
              <Link
                href="/claim-your-business"
                className="usa-button usa-button--outline"
              >
								Back
              </Link>
              {isPostSuccessful ? (
                entityId ? (
                  <Link
                    href={buildRoute(SELECT_INTENDED_PROGRAMS_PAGE, {
                      entity_id: entityId,
                    })}
                    className="usa-button usa-button"
                  >
										Continue
                  </Link>
                ) : (
                  <Button disabled type="button">
										Continue
                  </Button>
                )
              ) : (
                <Button onClick={handleOpen} type="button">
									Next
                </Button>
              )}
            </ButtonGroup>
          </Grid>
        </Grid>
      </GridContainer>
    </>
  )
}

export default ValidateBusinessForm
