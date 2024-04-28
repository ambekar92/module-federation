import { Control, Controller } from 'react-hook-form'
import { OwnershipInputsType } from '../utils/types';
import NavigationButtons from '../fragments/NavigationButtons';
import { useFormDispatch, useFormSelector } from '../store/hooks';
import { selectForm, setStep } from '../store/formSlice';
interface Props {
	control: Control<OwnershipInputsType>;
}
const SupportingDocs = ({ control }: Props) => {
  const { currentStep } = useFormSelector(selectForm);
  const dispatch = useFormDispatch();

  const handleNextStep = () => {
    dispatch(setStep(currentStep + 1));
  }

  const handlePreviousStep = () => {
    if (currentStep > 0) {
      dispatch(setStep(currentStep - 1))
    }
  }

  if(currentStep === 3) {
    return (
      <>
        <div className="container-documentation">
          <div className="wrapper">
            <h2>License Holder</h2>
            <p>Upload any applicable licenses which you have indicated are critical to your business.</p>
            <Controller
              name="fileLicenseHolder"
              control={control}
              defaultValue={undefined}
              render={({ field, fieldState: { error } }) => (
                <div className='margin-bottom-4'>
                  <div className="container-input-file">
                    <input
                      type="file"
                      className="input-file"
                      onChange={(e) => field.onChange(e.target.files)}
                    />
                  </div>

                  {error && (
                    <div className="usa-input-helper-text">
                      <span className="error-message">{error.message}</span>
                    </div>
                  )}
                </div>
              )}
            />
          </div>

          <div className="wrapper">
            <h2>Shareholder Meeting Minutes</h2>
            <p>
							Upload your most recent six months of shareholder meeting minutes detailing the election of
							the Board of Directors.
            </p>
            <Controller
              name="fileShareholderMeetingMinutes"
              control={control}
              defaultValue={undefined}
              render={({ field, fieldState: { error } }) => (
                <div className='margin-bottom-4'>
                  <div className="container-input-file">
                    <input
                      type="file"
                      className="input-file"
                      onChange={(e) => field.onChange(e.target.files)}
                    />
                  </div>
                  {error && (
                    <div className="usa-input-helper-text">
                      <span className="error-message">{error.message}</span>
                    </div>
                  )}
                </div>
              )}
            />
          </div>

          <div className="wrapper">
            <h2>Board of Directors Meeting Minutes</h2>
            <p>
							Upload your most recent six months Board of Directors meeting minutes detailing the election
							of Officers.
            </p>
            <Controller
              name="fileBoardMeetingMinutes"
              control={control}
              defaultValue={undefined}
              render={({ field, fieldState: { error } }) => (
                <div className='margin-bottom-4'>
                  <div className="container-input-file">
                    <input
                      type="file"
                      className="input-file"
                      onChange={(e) => field.onChange(e.target.files)}
                    />
                  </div>
                  {error && (
                    <div className="usa-input-helper-text">
                      <span className="error-message">{error.message}</span>
                    </div>
                  )}
                </div>
              )}
            />
          </div>

          <div className="wrapper">
            <h2>Articles of Incorporation</h2>
            <p>
							The articles of incorporation — or a certificate of incorporation — is a comprehensive legal
							document that lays out the basic outline of your business. It&apos;s required by every state when
							you incorporate. The most common information included is the company name, business purpose,
							number of shares offered, value of shares, directors, and officers.
            </p>
            <Controller
              name="fileArticlesIncorporation"
              control={control}
              defaultValue={undefined}
              render={({ field, fieldState: { error } }) => (
                <div className='margin-bottom-4'>
                  <div className="container-input-file">
                    <input
                      type="file"
                      className="input-file"
                      onChange={(e) => field.onChange(e.target.files)}
                    />
                  </div>
                  {error && (
                    <div className="usa-input-helper-text">
                      <span className="error-message">{error.message}</span>
                    </div>
                  )}
                </div>
              )}
            />
          </div>

          <div className="wrapper">
            <h2>Bylaws</h2>
            <p>
							Bylaws (called resolutions for nonprofits) are the internal governance documents of a
							corporation. They define how key business decisions are made, as well as officer and
							shareholders&apos; duties, powers, and responsibilities. It&apos;s widely recommended to create one to
							protect yourself and your business, even if your state doesn’t mandate it.
            </p>
            <Controller
              name="fileBylaws"
              control={control}
              defaultValue={undefined}
              render={({ field, fieldState: { error } }) => (
                <div className='margin-bottom-4'>
                  <div className="container-input-file">
                    <input
                      type="file"
                      className="input-file"
                      onChange={(e) => field.onChange(e.target.files)}
                    />
                  </div>
                  {error && (
                    <div className="usa-input-helper-text">
                      <span className="error-message">{error.message}</span>
                    </div>
                  )}
                </div>
              )}
            />
          </div>

          <div className="wrapper">
            <h2>Stock Certificates and Ledger</h2>
            <p>
							A stock ledger lists all share-related transactions for a company. It states the name of the
							owner of each block of shares, as well as the number of shares owned by each investor, the
							type of shares purchased, and the date of each purchase and the amount paid.
            </p>
            <Controller
              name="fileStockCertsAndLedgers"
              control={control}
              defaultValue={undefined}
              render={({ field, fieldState: { error } }) => (
                <div className='margin-bottom-4'>
                  <div className="container-input-file">
                    <input
                      type="file"
                      className="input-file"
                      onChange={(e) => field.onChange(e.target.files)}
                    />
                  </div>
                  {error && (
                    <div className="usa-input-helper-text">
                      <span className="error-message">{error.message}</span>
                    </div>
                  )}
                </div>
              )}
            />
          </div>
          <NavigationButtons handleNextStep={handleNextStep} handlePrevStep={handlePreviousStep} />
        </div>
      </>
    )
  } else {
    return <></>
  }
}
export default SupportingDocs
