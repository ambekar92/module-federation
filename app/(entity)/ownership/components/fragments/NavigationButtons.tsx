import { Button, ButtonGroup } from '@trussworks/react-uswds';
import { selectForm } from '../store/formSlice';
import { useFormSelector } from '../store/hooks';
import Link from 'next/link';

interface Props {
	handlePrevStep: () => void;
	handleNextStep?: () => void;
	href?: string;
	linkDisabled?: boolean;
}

const NavigationButtons = ({ handleNextStep, handlePrevStep, href, linkDisabled }: Props) => {
  const { currentStep } = useFormSelector(selectForm);

  return (
    <div className="display-flex flex-column flex-align-end margin-top-8 margin-right-05">
      <ButtonGroup>
        <Button type="button" outline onClick={handlePrevStep} disabled={currentStep === 0}>
					Back
        </Button>
        {href ? (
          linkDisabled
            ? (
              <Button disabled type='button'>
								Next
              </Button>
            ): (
              <Link href={href} className='usa-button'>
								Next
          		</Link>
            )
        ): (
          <Button type="button" onClick={handleNextStep} disabled={currentStep === 5}>
						Next
          </Button>
        )}

      </ButtonGroup>
    </div>
  )
}
export default NavigationButtons
