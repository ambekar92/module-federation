import ProgramCard from '@/app/shared/components/ownership/ProgramCard';
import { UseFormGetValues, UseFormRegister, UseFormWatch } from 'react-hook-form';
import { selectForm, setStep } from '../store/formSlice';
import { useFormDispatch, useFormSelector } from '../store/hooks';
import { OwnershipInputsType } from '../utils/types';
import NavigationButtons from '../fragments/NavigationButtons';
import { Alert, Grid } from '@trussworks/react-uswds';
import Styles from '../OwnershipControlForm.module.scss';
interface Props {
	watch: UseFormWatch<OwnershipInputsType>;
	getValues: UseFormGetValues<OwnershipInputsType>;
	register: UseFormRegister<OwnershipInputsType>;
}

const EligiblePrograms = ({ register, watch }: Props) => {
  const { currentStep, eligiblePrograms } = useFormSelector(selectForm);
  const dispatch = useFormDispatch();
  const registeredValues = watch(eligiblePrograms.map(program => program.registration));
  const noCheckboxChecked = registeredValues.every(state => !state);

  const handlePreviousStep = () => {
    if (currentStep > 0) {
      dispatch(setStep(currentStep - 1))
    }
  }
  if(currentStep === 2) {
    return (
      <div>
        {eligiblePrograms.length === 0
          ? <Alert className={Styles.alert} type='warning' headingLevel='h3' noIcon>
						Based on your responses, you are not eligible for the 8(a) Business Development Program as it requires US citizenship. Review the eligibility criteria detailed <a href='/'>here</a>.
          </Alert>
          : <Grid row gap>
            {eligiblePrograms.map((program, index) => (
              <Grid key={index} className='margin-bottom-2' tablet={{ col: 6 }}>
                <ProgramCard
                  className={`height-full ${registeredValues[index] ? 'blue-bg' : ''}`}
                  program={program.name}
                  description={program.description}
                  details={program.details}
                  input={<input className="custom-checkbox" type="checkbox" {...register(program.registration)} />}
                />
              </Grid>
            ))}
          </Grid>
        }

        <NavigationButtons href='/additional-information/eighta' linkDisabled={noCheckboxChecked} handlePrevStep={handlePreviousStep} />
      </div>
    )
  } else {
    return <></>
  }
}
export default EligiblePrograms
