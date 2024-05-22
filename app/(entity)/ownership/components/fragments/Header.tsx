import { Grid } from '@trussworks/react-uswds'
import { useFormSelector } from '../store/hooks'
import { selectForm } from '../store/formSlice'
import { formSteps } from '../utils/types'

const Header = () => {
  const { currentStep } = useFormSelector(selectForm)
  return (
    <Grid row>
      {currentStep < formSteps.length && (
        <div className="header">
          <h1 className="underline-heading">{formSteps[currentStep].name}</h1>
          {formSteps[currentStep].description && <p className="my-default">{formSteps[currentStep].description}</p>}
        </div>
      )}
    </Grid>
  )
}
export default Header
