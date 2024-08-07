import { Show } from '@/app/shared/components/Show'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button, ButtonGroup, ErrorMessage, Grid, Label, Radio, Select, TextInput } from '@trussworks/react-uswds'
import { Controller, useForm } from 'react-hook-form'
import { setCurrentOperatorEditIndex, setShowControlOperationsForm } from '../../redux/applicationSlice'
import { useApplicationDispatch, useApplicationSelector } from '../../redux/hooks'
import { useUserApplicationInfo } from '../../utils/useUserApplicationInfo'
import { Contributor } from '../contributor-invite/types'
import { Prefix, PrincipalType, Suffix, YesNo, defaultValues } from './constants-types'
import { Operator, schema } from './schema'
import { useEffect } from 'react'

const convertOperatorToContributor = (operator: Operator): Contributor => ({
  contributorRole: 'role_other',
  firstName: operator.firstName,
  lastName: operator.lastName,
  emailAddress: operator.emailAddress,
});

const ControlOperationsForm = () => {
  const { formState: { errors }, handleSubmit, control, reset, setValue } = useForm({
    resolver: zodResolver(schema),
    defaultValues,
  });

  const dispatch = useApplicationDispatch();
  const { operators, contributors, currentOperatorEditIndex, showControlOperationsForm } = useApplicationSelector((state) => state.application);
  const { updateUserApplicationInfo } = useUserApplicationInfo();

  useEffect(() => {
    if (currentOperatorEditIndex !== null && operators[currentOperatorEditIndex]) {
      const operatorToEdit = operators[currentOperatorEditIndex];
      Object.keys(operatorToEdit).forEach((key) => {
        setValue(key as keyof Operator, operatorToEdit[key as keyof Operator]);
      });
    } else {
      reset(defaultValues);
    }
  }, [currentOperatorEditIndex, operators, setValue, reset]);

  function onSubmit(formData: Operator) {
    const isEditing = currentOperatorEditIndex !== null;
    let updatedOperators;
    let updatedContributors;

    if (isEditing) {
      updatedOperators = operators.map((operator, idx) =>
        idx === currentOperatorEditIndex ? formData : operator
      );
      updatedContributors = contributors.map((contributor, index) =>
        index === currentOperatorEditIndex ? convertOperatorToContributor(formData) : contributor
      );
    } else {
      updatedOperators = [...operators, formData];
      updatedContributors = [...contributors, convertOperatorToContributor(formData)];
    }

    updateUserApplicationInfo({
      operators: updatedOperators,
      contributors: updatedContributors
    });

    dispatch(setShowControlOperationsForm(false));
    dispatch(setCurrentOperatorEditIndex(null));
    reset(defaultValues);
  }

  function handleCloseForm() {
    dispatch(setShowControlOperationsForm(false));
    dispatch(setCurrentOperatorEditIndex(null));
  }

  return (
    <Show>
      <Show.When isTrue={showControlOperationsForm}>
        <Grid row gap='md'>
          <Grid className="display-flex flex-column" mobile={{ col: 2 }} tablet={{ col: 2 }}>
            <Label htmlFor='prefix'>Prefix</Label>
            <Controller<Operator>
              control={control}
              name='prefix'
              render={({ field }) => <Select
                onChange={field.onChange}
                className="height-7 radius-lg maxw-full"
                value={field.value as Prefix || ''}
                id='prefix' name='prefix'
              >
                <option value=''>--</option>
                {Object.values(Prefix).map((prefix, idx) => <option
                  value={prefix}
                  onChange={field.onChange}
                  key={idx}>{prefix}</option>)}
              </Select>}
            />
          </Grid>

          <Grid className="display-flex flex-column" mobile={{ col: 10 }} tablet={{ col: 5 }}>
            <Label requiredMarker={true} htmlFor='firstName'>First Name</Label>
            <Controller<Operator>
              control={control}
              name='firstName'
              render={({ field }) => <TextInput
                value={field.value as string}
                id='firstName'
                name='firstName'
                type='text'
                className='maxw-full'
                onChange={field.onChange}
                validationStatus = { field.value ? (!errors.firstName?.message ? 'success' : 'error'): (errors.firstName?.message ? 'error' : undefined) }
              />}
            />
            <ErrorMessage>{errors.firstName?.message}</ErrorMessage>
          </Grid>

          <Grid className="display-flex flex-column" mobile={{ col: 12 }} tablet={{ col: 5 }}>
            <Label htmlFor='middleName'>Middle Name</Label>
            <Controller<Operator>
              control={control}
              name='middleName'
              render={({ field }) => <TextInput
                value={field.value as string}
                id='middleName'
                name='middleName'
                className='maxw-full'
                type='text'
                onChange={field.onChange}
              />}
            />
          </Grid>
        </Grid>
        <Grid row gap="md">
          <Grid className="display-flex flex-column" mobile={{ col: 10 }} tablet={{ col: 10 }}>
            <Label requiredMarker={true} htmlFor='lastName'>Last Name</Label>

            <Controller<Operator>
              control={control}
              name='lastName'
              render={({ field }) => <TextInput
                className="height-7 radius-lg maxw-full"
                value={field.value as string}
                id='lastName'
                name='lastName'
                type='text'
                onChange={field.onChange}
                validationStatus = { field.value ? (!errors.lastName?.message ? 'success' : 'error'): (errors.lastName?.message ? 'error' : undefined) }
              />}
            />
            <ErrorMessage>{errors.lastName?.message}</ErrorMessage>
          </Grid>
          <Grid className="display-flex flex-column" mobile={{ col: 2 }} tablet={{ col: 2 }}>
            <Label htmlFor='suffx'>Suffix</Label>
            <Controller<Operator>
              control={control}
              name='suffix'
              render={({ field }) => <Select
                onChange={field.onChange}
                className="height-7 radius-lg maxw-full"
                value={field.value as Suffix || ''}
                id='suffix' name='suffix'
              >
                <option value=''>--</option>
                {Object.values(Suffix).map((suffix, idx) => <option
                  value={suffix}
                  onChange={field.onChange}
                  key={idx}>{suffix}</option>)}
              </Select>}
            />
          </Grid>
        </Grid>

        <>
          <Label requiredMarker={true} htmlFor='emailAddress'>Email</Label>

          <Controller<Operator>
            control={control}
            name='emailAddress'
            render={({ field }) => <TextInput
              className="height-7 radius-lg maxw-full"
              value={field.value as string}
              id='emailAddress'
              name='emailAddress'
              type='text'
              onChange={field.onChange}
              validationStatus = { field.value ? (!errors.emailAddress?.message ? 'success' : 'error'): (errors.emailAddress?.message ? 'error' : undefined) }
            />}
          />
          <ErrorMessage>{errors.emailAddress?.message}</ErrorMessage>
        </>
        <>
          <Label requiredMarker={true} htmlFor='title'>Title / Position</Label>

          <Controller<Operator>
            control={control}
            name='position'
            render={({ field }) => <TextInput
              className="height-7 radius-lg maxw-full"
              value={field.value as string}
              id='position'
              name='position'
              type='text'
              onChange={field.onChange}
              validationStatus = { field.value ? (!errors.position?.message ? 'success' : 'error'): (errors.position?.message ? 'error' : undefined) }
            />}
          />
          <ErrorMessage>{errors.position?.message}</ErrorMessage>
        </>

        <>
          <Label htmlFor='principalType' requiredMarker={true}>Principal Type (Officer, Director, Member)</Label>

          <Controller<Operator>
            control={control}
            name='principalType'
            render={({ field }) => <Select
              onChange={field.onChange}
              className="height-7 radius-lg maxw-full"
              value={field.value as PrincipalType || ''}
              id='principalType' name='principalType'
              validationStatus = { field.value ? (!errors.principalType?.message ? 'success' : 'error'): (errors.principalType?.message ? 'error' : undefined) }
            >
              <option value=''>--</option>
              {Object.values(PrincipalType).map((type, idx) => <option
                value={type}
                onChange={field.onChange}
                key={idx}>{type}</option>)}
            </Select>}
          />
          <ErrorMessage>{errors.principalType?.message}</ErrorMessage>
        </>

        <Grid col className='margin-bottom-2'>
          <Label requiredMarker={true} htmlFor='licenseHolder'>License Holder</Label>

          <Controller<Operator>
            control={control}
            name='licenseHolder'
            render={({ field }) => <Grid row gap={2}>
              <Radio name='licenseHolder' value='Yes' id='yes' label='Yes' onChange={field.onChange} className='bg-base-lightest' checked={field.value === YesNo.Yes} />
              <Radio name='licenseHolder' value='No' id='no' label='No' onChange={field.onChange} className='bg-base-lightest' checked={field.value === YesNo.No} />
            </Grid>}
          />
          <ErrorMessage>{errors.licenseHolder?.message}</ErrorMessage>
        </Grid>

        <ButtonGroup className='margin-top-6 margin-left-2'>
          <Grid gap={6} row>
            <Button onClick={handleSubmit(onSubmit)} type='submit'>{currentOperatorEditIndex !== null ? 'Update' : 'Add'}</Button>
            <Button onClick={handleCloseForm} type='button' unstyled >Cancel</Button>
          </Grid>
        </ButtonGroup>
      </Show.When>
      <Show.Otherwise>{null}</Show.Otherwise>

    </Show>

  )
}

export default ControlOperationsForm
