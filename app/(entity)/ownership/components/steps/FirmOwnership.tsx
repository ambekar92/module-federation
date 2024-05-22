import { Button, ButtonGroup, Grid, Label, TextInput } from '@trussworks/react-uswds';
import { Control, Controller, UseFormGetValues, UseFormReset, UseFormSetValue, UseFormStateReturn, UseFormTrigger, UseFormWatch } from 'react-hook-form';
import Select, { MultiValue } from 'react-select';
import Styles from '../OwnershipControlForm.module.scss';
import NavigationButtons from '../fragments/NavigationButtons';
import OwnerTable from '../fragments/OwnerTable';
import { addOrUpdateOwner, calculateEligiblePrograms, selectForm, setDisplayDisadvantageError, setDisplayPercentWarning, setEditingOwner, setSelectedOptions, setStep, updateInputKey } from '../store/formSlice';
import { useFormDispatch, useFormSelector } from '../store/hooks';
import { firmOwnershipRadioInputs, firmOwnershipTextInputs } from '../utils/data';
import { getTotalOwnershipPercentage } from '../utils/helpers';
import { OwnershipInputsType, SelectOption, socialDisadvantages } from '../utils/types';

interface Props {
	control: Control<OwnershipInputsType>;
	setValue: UseFormSetValue<OwnershipInputsType>;
  trigger: UseFormTrigger<OwnershipInputsType>;
	getValues: UseFormGetValues<OwnershipInputsType>;
	reset: UseFormReset<OwnershipInputsType>;
	watch: UseFormWatch<OwnershipInputsType>;
	touchedFields?: UseFormStateReturn<OwnershipInputsType>['touchedFields'];
}

const textFieldKeys: (keyof OwnershipInputsType)[] = ['firstName', 'middleInitial', 'lastName'];
const radioFieldKeys: (keyof OwnershipInputsType)[] = ['gender', 'usCitizen', 'veteran'];

const FirmOwnershipInfo = ({ control, setValue, getValues, trigger, reset, watch }: Props) => {
  const dispatch = useFormDispatch();
  const {
    currentStep, owners, editingOwner,
    selectedOptions, displayRequiredFieldsWarning,
    displayDisadvantageError, displayPercentWarning,
    displayAddOwnerWarning, inputKey
  } = useFormSelector(selectForm);

  const handleNextStep = () => {
    const totalUsedPercentage = getTotalOwnershipPercentage(owners)
    if(totalUsedPercentage === 100) {
      dispatch(setStep(currentStep + 1));
      dispatch(setDisplayPercentWarning(false));
      reset({
        firstName: '',
        middleInitial: '',
        lastName: '',
        gender: undefined,
        usCitizen: undefined,
        veteran: undefined,
        disabledVeteran: undefined,
        ownershipPercentage: undefined,
        socialDisadvantages: []
      });
      dispatch(setSelectedOptions([]));
      dispatch(setEditingOwner(null));
      dispatch(setDisplayDisadvantageError(false))
      dispatch(updateInputKey());
    } else {
      dispatch(setDisplayPercentWarning(true))
    }
  }

  const handlePreviousStep = () => {
    if (currentStep > 0) {
      dispatch(setStep(currentStep - 1))
    }
  }

  const isVeteran = watch('veteran');

  const disadvantageOptions: SelectOption[] = socialDisadvantages.map((disadvantage) => ({
    value: disadvantage.value,
    label: disadvantage.label
  }))

  const handleAddOrEdit = async () => {
    const isValid = await trigger([
      'firstName', 'lastName', 'gender',
      'usCitizen', 'veteran', 'socialDisadvantages', 'ownershipPercentage'
    ], { shouldFocus: true });
    const data = getValues();

    // Initialize updatedDisadvantages with selected options or "not_claiming" if none
    let updatedDisadvantages = selectedOptions.length > 0
      ? selectedOptions.map(option => option.value)
      : ['not_claiming'];

    // Ensure "not_claiming" is not combined with other disadvantages
    if (updatedDisadvantages.length > 1) {
      updatedDisadvantages = updatedDisadvantages.filter(d => d !== 'not_claiming');
    }

    // If there are no disadvantages, including "not_claiming", set the error
    if(updatedDisadvantages.length === 0 || selectedOptions.length === 0) {
      return dispatch(setDisplayDisadvantageError(true))
    } else {
      dispatch(setDisplayDisadvantageError(false))
    }
    if (isValid) {

      let updatedDisadvantages = data.usCitizen === 'Yes'
        ? selectedOptions.map(option => option.value)
        : ['not_claiming'];

      const manageDisadvantage = (condition: boolean, disadvantage: string) => {
        if (condition && !updatedDisadvantages.includes(disadvantage)) {
          updatedDisadvantages.push(disadvantage);
        } else if (!condition) {
          updatedDisadvantages = updatedDisadvantages.filter(d => d !== disadvantage);
        }
      };

      manageDisadvantage(data.gender === 'F', 'female');
      manageDisadvantage(data.veteran === 'Yes', 'veteran');
      manageDisadvantage(data.disabledVeteran === 'Yes' && data.veteran === 'Yes', 'disabledVeteran');

      setValue('socialDisadvantages', updatedDisadvantages, { shouldValidate: true });

      // Dispatch the thunk to update owners and calculate new eligible programs
      dispatch(addOrUpdateOwner({ ...data, socialDisadvantages: updatedDisadvantages })).then(() => {
        dispatch(calculateEligiblePrograms());
      });

      reset({
        firstName: '',
        middleInitial: '',
        lastName: '',
        gender: undefined,
        usCitizen: undefined,
        veteran: undefined,
        disabledVeteran: undefined,
        ownershipPercentage: undefined,
        socialDisadvantages: []
      });
      dispatch(setSelectedOptions([]));
      dispatch(setEditingOwner(null));
      dispatch(updateInputKey());
    }
  };

  const handleSelectChange = (newValue: MultiValue<SelectOption>) => {
    dispatch(setSelectedOptions([...newValue]));
    const values = newValue.map(option => option.value);
    setValue('socialDisadvantages', values, { shouldValidate: true });
  }

  const handleCancelEditOwner = () => {
    reset({
      ...getValues(),
      firstName: '',
      socialDisadvantages: [],
      middleInitial: '',
      lastName: '',
      gender: undefined,
      usCitizen: undefined,
      disabledVeteran: undefined,
      veteran: undefined,
      ownershipPercentage: undefined
    });
    dispatch(setEditingOwner(null))
    dispatch(setSelectedOptions([]));
    dispatch(setEditingOwner(null));
    dispatch(updateInputKey());
  }

  if(currentStep === 0) {
    return (
      <div>
        <Grid row>
          <div className='width-full'>
            <p>
						Provide information regarding the ownership of your business. Ensure that you accurately fill
						out all relevant fields.
            </p>
            <p className="text-italic text-bold text-xl">Note: Total ownership cannot exceed 100%.</p>

            <Grid row gap='md'>
              {textFieldKeys.map(key => (
                (key === 'firstName' || key === 'middleInitial' || key === 'lastName') && (
                  <Grid 
                  data-testid={`input-${key}`}
                  key={key} desktop={{col: key === 'lastName' && 5 || key === 'firstName' && 5 || key === 'middleInitial' && 2 || 12}} tablet={{col: key === 'lastName' && 12 || key === 'firstName' && 9 || key === 'middleInitial' && 3 || 12}} mobile={{col: 12}}>
                    <Label className='text-bold' htmlFor={`input-${key}`} requiredMarker={firmOwnershipTextInputs[key].required}>
                      {firmOwnershipTextInputs[key].displayName}
                    </Label>
                    <Controller
                      name={key}
                      control={control}
                      render={({ field, fieldState: { error } }) => (
                        <>
                          <TextInput
                            {...field}
                            id={`input-${key}`}
                            type="text"
                            className={`icon width-full maxw-full ${error && key !== 'middleInitial' && 'border-secondary-vivid'}`}
                            maxLength={firmOwnershipTextInputs[key].maxlength}
                            value={field.value}
                          />
                          {error && key !== 'middleInitial' && (
                            <div className='margin-top-1 usa-input-helper-text'>
                              <span className="text-secondary-vivid">Required Field</span>
                            </div>
                          )}
                        </>
                      )}
                    />
                  </Grid>
                )
              ))}
            </Grid>

            <Grid row gap={4}>
              {radioFieldKeys.map(key => (
                (key === 'gender' || key === 'usCitizen' || key === 'veteran') && (
                  <Grid key={key} col={6} tablet={{col: true}}>
                    <Label htmlFor={`input-${key}`} requiredMarker>
                      <span className='text-bold'>
                        {firmOwnershipRadioInputs[key].displayName}
                      </span>
                    </Label>
                    <Controller
                      name={key}
                      control={control}
                      render={({ field, fieldState: { error } }) => (
                        <>
                          <Grid row gap={2} >
                            {firmOwnershipRadioInputs[key].options.map(option => (
                              <div className="usa-radio" key={option} >
															 <input
                                  className="usa-radio__input"
                                  id={`${key}-${option}`}
                                  type="radio"
                                  data-testid={`${key}-${option}`}
                                  value={option}
                                  checked={field.value === option}
                                  onChange={() => field.onChange(option)}
                                />
                                <Label  className={`${Styles.usa_radio__label} usa-radio__label`} htmlFor={`${key}-${option}`}>
                                  {option}
                                </Label>
                              </div>
                            ))}
                          </Grid>
                          {error && (
                            <div data-testid={`${key}`} className='margin-top-1 usa-input-helper-text'>
                              <span className="text-secondary-vivid">Required Field</span>
                            </div>
                          )}
                        </>
                      )}
                    />
                  </Grid>
                )
              ))}

              {isVeteran === 'Yes' && (
                <Grid col={12}>
                  <Label htmlFor="disabledVeteran" requiredMarker>
                    <span className='text-bold'>
											Have one or more service-disabled veterans manage day-to-day operations and make long-term decisions.
                    </span>
                  </Label>
                  <Controller
                    name="disabledVeteran"
                    control={control}
                    render={({ field, fieldState: { error } }) => (
                      <>
                        <Grid row gap={2}>
                          <div className="usa-radio">
                            <input
                              className="usa-radio__input"
                              id="disabled-veteran-yes"
                              type="radio"
                              value="Yes"
                              checked={isVeteran === 'Yes' && field.value === 'Yes'}
                              onChange={() => field.onChange('Yes')}
                            />
                            <Label className={`${Styles.usa_radio__label} usa-radio__label`} htmlFor="disabled-veteran-yes">
                      			Yes
                            </Label>
                          </div>
                          <div className="usa-radio">
                            <input
                              className="usa-radio__input"
                              id="disabled-veteran-no"
                              type="radio"
                              value="No"
                              checked={isVeteran === 'Yes' && field.value === 'No'}
                              onChange={() => field.onChange('No')}
                            />
                            <Label className={`${Styles.usa_radio__label} usa-radio__label`} htmlFor="disabled-veteran-no">
                      				No
                            </Label>
                          </div>
                        </Grid>
                        {error && (
                          <div className='margin-top-1 usa-input-helper-text'>
                            <span className="text-secondary-vivid">Required Field</span>
                          </div>
                        )}
                      </>
                    )}
                  />
                </Grid>
              )}
            </Grid>

            <div>
              <div className='margin-top-4' data-testid='social-disadvantage'>
                <Label className="text-clamp--label" htmlFor="socialDisadvantages" requiredMarker>
                  <span className='text-bold'>
									8(a) Social Disadvantage (Choose any that apply)
                  </span>
                </Label>
                <Select
                  data-testid="social-disadvantage-select"
                  styles={{
                    control: (baseStyles, state) => ({
                      ...baseStyles,
                      marginTop: '0.5rem',
                      borderRadius: '8px',
                      minHeight: '2.45rem',
                      height: '56px',
                      borderColor: displayDisadvantageError ? '#e41d3d' : '#565c65',
                      outline: state.isFocused ? '3px solid #0f73ff' : '',
                      cursor: 'pointer'
                    })
                  }}
                  options={disadvantageOptions}
                  isMulti={true}
                  onChange={handleSelectChange}
                  value={selectedOptions}
                  isOptionDisabled={(option) =>
                    (option.value !== 'not_claiming' &&
										 selectedOptions.some((o) => o.value === 'not_claiming')) ||
									(option.value === 'not_claiming' &&
										 selectedOptions.length > 0 &&
										 selectedOptions.some((o) => o.value !== 'not_claiming'))
								 }
                />

                {displayDisadvantageError && (
                  <div className='margin-top-1 usa-input-helper-text'>
                    <span className="text-secondary-vivid">Required Field</span>
                  </div>
                )}
              </div>
            </div>

            <Grid offset={8} className="margin-top-4 display-flex flex-align-end flex-column">
              <Label htmlFor="ownershipPercentage" requiredMarker>
                <span className='text-bold'>
									Ownership Percentage
                </span>
              </Label>
              <Controller
                name="ownershipPercentage"
                control={control}
                rules={{ required: true, min: 0.01, max: 100 }}
                render={({ field: {...field}, fieldState: { error } }) => (
                  <>
                    <TextInput
                      id='ownership-percentage'
                      style={{ height: '56px' }}
                      type="number"
                      className={`width-auto margin-left-auto maxw-full ${error && 'border-secondary-vivid'}`}
                      key={inputKey}
                      {...field}
                      onChange={(e) => {
                        const value = e.target.value
                        if (value === '') {
												 field.onChange(undefined)
                        } else {
												 const numericValue = parseFloat(value)
												 if (!isNaN(numericValue) && numericValue <= 100 && numericValue >= 0.01) {
                            field.onChange(numericValue)
												 }
                        }
									 }}
                      max={100}
                      step="0.01"
                      min="0.01"
                    />
                    {error && (
                      <div className='margin-top-1 width-auto usa-input-helper-text'>
                        <span className="text-secondary-vivid">Required Field</span>
                      </div>
                    )}
                  </>
                )}
              />
            </Grid>

            <div className="float-right margin-top-4">
              <ButtonGroup>
                {editingOwner && (
                  <Button outline className="button" type="button" onClick={() => handleCancelEditOwner()}>
									Cancel
                  </Button>
                )}
                <Button className="button margin-right-0 button-add" type="button" onClick={handleAddOrEdit}>
                  {editingOwner ? 'Save Changes' : 'Add Owner'}
                </Button>
              </ButtonGroup>
              {displayRequiredFieldsWarning && (
                <div className="usa-input-helper-text">
                  <span className="text-secondary-vivid">All Fields Required*</span>
                </div>
              )}
            </div>
          </div>

          {owners.length > 0 && (
            <OwnerTable setValue={setValue} reset={reset} />
          )}

          <div className='width-full display-flex flex-column flex-align-end flex-justify-end'>
            <NavigationButtons handleNextStep={handleNextStep} handlePrevStep={handlePreviousStep} />
            {displayPercentWarning && (
              <div className="usa-input-helper-text margin-top-1 text-secondary-vivid">
                <span className="text-secondary-vivid float-right">100% Ownership Required*</span>
              </div>
            )}
            {displayAddOwnerWarning && (
              <div className="usa-input-helper-text">
                <span className="text-secondary-vivid">One Owner Required*</span>
              </div>
            )}
          </div>
        </Grid>
      </div>
    )
  } else {
    return <></>
  }
}
export default FirmOwnershipInfo
