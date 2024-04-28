import { Button, Grid, Label, Select, TextInput } from '@trussworks/react-uswds';
import { Control, Controller, UseFormGetValues, UseFormReset, UseFormSetValue, UseFormTrigger } from 'react-hook-form';
import EmployeeTable from '../fragments/EmployeeTable';
import NavigationButtons from '../fragments/NavigationButtons';
import { addOrUpdateEmployee, selectForm, setDisplayAddEmployeeWarning, setEditingEmployee, setEmployees, setStep } from '../store/formSlice';
import { useFormDispatch, useFormSelector } from '../store/hooks';
import { EmployeeType, OwnershipInputsType } from '../utils/types';

interface Props {
	control: Control<OwnershipInputsType>;
	setValue: UseFormSetValue<OwnershipInputsType>;
	reset: UseFormReset<OwnershipInputsType>;
	trigger: UseFormTrigger<OwnershipInputsType>;
	getValues: UseFormGetValues<OwnershipInputsType>
}

const ControlAndOperation = ({ control, setValue, reset, trigger, getValues }: Props) => {
  const dispatch = useFormDispatch();
  const {
    currentStep, employees,
    displayAddEmployeeWarning, editingEmployee
  } = useFormSelector(selectForm);

  const handleNextStep = () => {
    if(employees.length > 0) {
      dispatch(setStep(currentStep + 1));
      dispatch(setDisplayAddEmployeeWarning(false));
    } else {
      dispatch(setDisplayAddEmployeeWarning(true))
    }
  }

  const handlePreviousStep = () => {
    if (currentStep > 0) {
      dispatch(setStep(currentStep - 1))
    }
  }

  const handleAddOrEditEmployee = async () => {
    const isValid = await trigger(['name', 'role', 'position', 'licenseHolder']);
    if (!isValid) {
      return;
    }

    const formData = getValues(); // Retrieves all data from the form
    const employeeData: EmployeeType = {
      ...formData,
      id: editingEmployee ? editingEmployee.id : new Date().getTime() // Use existing id or assign a new one
    };

    if (editingEmployee) {
      // Update existing employee
      const updatedEmployees = employees.map(emp => emp.id === editingEmployee.id ? employeeData : emp);
      dispatch(setEmployees(updatedEmployees));
    } else {
      // Add new employee
      dispatch(addOrUpdateEmployee(employeeData));
    }

    reset({
      name: '',
      role: undefined,
      position: '',
      licenseHolder: undefined,
    });
    dispatch(setEditingEmployee(null)); // Clear editing state
  };

  if(currentStep === 2) {
    return (
      <div>
        <div className="wrapper">
          <p>
            Detail how the company is controlled. Include all officers, board members, and key employees.
          </p>
          <Grid row gap='md' className='margin-bottom-4'>
            <Grid desktop={{ col: 3 }} tablet={{ col: 6 }} mobile={{ col: 12 }}>
              <Label htmlFor="name" requiredMarker>
                Name
              </Label>
              <Controller
                control={control}
                name="name"
                render={({ field: { ref, ...field } }) => (
                  <TextInput className='width-full maxw-full' type="text" id="name" inputRef={ref} {...field} value={field.value} />
                )}
              />
            </Grid>

            <Grid desktop={{ col: 3 }} tablet={{ col: 6 }} mobile={{ col: 12 }}>
              <Label htmlFor="role" requiredMarker>
								Principal Type (Officer, Director, Member)
              </Label>
              <Controller
                control={control}
                name="role"
                render={({ field: { ...field } }) => (
                  <Select style={{ height: '56px' }} className='width-full maxw-full' id="role" {...field}>
                    <option selected={field.value === undefined || field.value === ''} disabled>
                      - Select -
                    </option>
                    <option value="principal">Principal</option>
                    <option value="partner">Partner</option>
                    <option value="member">Member</option>
                    <option value="officer">Officer</option>
                    <option value='board_member'>Board Member</option>
                    <option value="board_director">Board Director</option>
                    <option value="other">Other</option>
                  </Select>
                )}
              />
            </Grid>

            <Grid desktop={{ col: 3 }} tablet={{ col: 6 }} mobile={{ col: 12 }}>
              <Label htmlFor="position" requiredMarker>
                Position
              </Label>
              <Controller
                control={control}
                name="position"
                render={({ field: { ref, ...field } }) => (
                  <TextInput className='width-full maxw-full' type="text" id="position" inputRef={ref} {...field} value={field.value} />
                )}
              />
            </Grid>

            <Grid desktop={{ col: 3 }} tablet={{ col: 6 }} mobile={{ col: 12 }}>
              <Label htmlFor="licenseHolder" requiredMarker>
                License Holder
              </Label>
              <Controller
                control={control}
                name="licenseHolder"
                render={({ field: { ...field } }) => (
                  <Select style={{ height: '56px' }} className='width-full maxw-full' id="licenseHolder" {...field}>
                    <option selected={field.value === undefined} disabled>
                      - Select -
                    </option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </Select>
                )}
              />
            </Grid>
          </Grid>
          <div className="flex-col flex-end container-button-add">
            <Button className="button button-add" type="button" onClick={() => handleAddOrEditEmployee()}>
              {editingEmployee ? 'Save Changes' : 'Add'}
            </Button>

            {displayAddEmployeeWarning && (
              <div className="usa-input-helper-text">
                <span className="error-message">One Employee Required*</span>
              </div>
            )}
          </div>
        </div>

        {employees.length > 0 && (
          <EmployeeTable setValue={setValue} reset={reset} />
        )}
        <NavigationButtons handleNextStep={handleNextStep} handlePrevStep={handlePreviousStep} />
      </div>
    )
  } else {
    return <></>
  }
}
export default ControlAndOperation
