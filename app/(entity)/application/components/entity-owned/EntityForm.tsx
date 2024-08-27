import { zodResolver } from '@hookform/resolvers/zod'
import {
  ErrorMessage,
  Grid,
  Label,
  Select,
  TextInput,
} from '@trussworks/react-uswds'
import { useEffect } from 'react'
import {
  Controller,
  FormProvider,
  SubmitHandler,
  useForm,
} from 'react-hook-form'
import ActionButtons from './shared/ActionButtons'
import ContactInfo from './shared/ContactInfo'
import ContactLocation from './shared/ContactLocation'
import { defaultValues } from './constants'
import { EntityFormType, schema } from './schema'
import { entityTypes } from './helpers'

type Props = {
  handleAddEntity: SubmitHandler<any>
  editedItem: EntityFormType | null
}

const EntityForm = ({ handleAddEntity, editedItem }: Props) => {
  const methods = useForm({
    resolver: zodResolver(schema),
    defaultValues,
  })

  const entityOptions = entityTypes.map((entityType) => ({
    value: entityType.value,
    label: entityType.label,
  }))

  useEffect(() => {
    if (editedItem) {
      methods.reset(editedItem as EntityFormType)
    }
  }, [editedItem, methods])

  return (
    <>
      <div>
        <Grid row className="display-flex flex-column">
          <Label
            className="margin-top-0"
            htmlFor="entityType"
            requiredMarker={true}
          >
            Controlling Entity Type
          </Label>
          <Controller
            name={'entityType'}
            control={methods.control}
            render={({ field }) => (
              <Select
                className="maxw-full"
                id={'entityType'}
                value={field.value as any}
                name={'entityType'}
                onChange={field.onChange}
              >
                <>
                  <option>--</option>
                  {entityTypes.map((entityType, index) => {
                    return (
                      <option
                        key={`entity-option-${index}`}
                        value={entityType.value}
                      >
                        {entityType.label}
                      </option>
                    )
                  })}
                </>
              </Select>
            )}
          />
        </Grid>

        <Grid row className="display-flex flex-column">
          <Label htmlFor="entityName" requiredMarker={true}>
            Controlling Entity Name
          </Label>
          <Controller
            name={'entityName'}
            control={methods.control}
            render={({ field }) => (
              <TextInput
                className="maxw-full"
                value={field.value}
                name={'entityName'}
                onChange={field.onChange}
                type="text"
                id="entityName"
                placeholder="--"
                validationStatus={
                  field.value
                    ? !methods.formState.errors?.entityName?.message
                      ? 'success'
                      : 'error'
                    : methods.formState.errors?.entityName?.message
                      ? 'error'
                      : undefined
                }
              />
            )}
          />
          <ErrorMessage>
            {methods.formState.errors?.firstName?.message}
          </ErrorMessage>
        </Grid>

        <h3 className="margin-y-0 padding-top-2">Contact Information</h3>

        <Grid row gap="md">
          <Grid
            className="display-flex flex-column"
            mobile={{ col: 2 }}
            tablet={{ col: 2 }}
          >
            <Label htmlFor="prefix">Prefix</Label>
            <Controller
              name={'prefix'}
              control={methods.control}
              render={({ field }) => (
                <Select
                  id={'prefix'}
                  value={field.value}
                  name={'prefix'}
                  onChange={field.onChange}
                >
                  <option>--</option>
                  {}
                  <option value="mr">Mr.</option>
                  <option value="ms">Ms.</option>
                  <option value="mrs">Mrs.</option>
                </Select>
              )}
            />
          </Grid>

          <Grid
            className="display-flex flex-column"
            mobile={{ col: 10 }}
            tablet={{ col: 5 }}
          >
            <Label htmlFor="first_name" requiredMarker={true}>
              First Name
            </Label>

            <Controller
              name={'firstName'}
              control={methods.control}
              render={({ field }) => (
                <TextInput
                  className="maxw-full"
                  value={field.value}
                  name={'firstName'}
                  onChange={field.onChange}
                  type="text"
                  id="first_name"
                  placeholder="--"
                  validationStatus={
                    field.value
                      ? !methods.formState.errors?.firstName?.message
                        ? 'success'
                        : 'error'
                      : methods.formState.errors?.firstName?.message
                        ? 'error'
                        : undefined
                  }
                />
              )}
            />
            <ErrorMessage>
              {methods.formState.errors?.firstName?.message}
            </ErrorMessage>
          </Grid>

          <Grid
            className="display-flex flex-column"
            mobile={{ col: 12 }}
            tablet={{ col: 5 }}
          >
            <Label htmlFor="middle_name">Middle Name</Label>
            <Controller
              name={'middleName'}
              control={methods.control}
              render={({ field }) => (
                <TextInput
                  value={field.value}
                  name={'middleName'}
                  onChange={field.onChange}
                  className="maxw-full"
                  type="text"
                  id="middle_name"
                  placeholder="--"
                />
              )}
            />
          </Grid>
        </Grid>

        <Grid row gap="md">
          <Grid
            className="display-flex flex-column"
            mobile={{ col: 10 }}
            tablet={{ col: 10 }}
          >
            <Label requiredMarker={true} htmlFor="last_name">
              Last Name
            </Label>

            <Controller
              name={'lastName'}
              control={methods.control}
              render={({ field }) => (
                <TextInput
                  value={field.value}
                  name={'lastName'}
                  onChange={field.onChange}
                  className="maxw-full"
                  type="text"
                  id="last_name"
                  placeholder="--"
                  validationStatus={
                    field.value
                      ? !methods.formState.errors?.lastName?.message
                        ? 'success'
                        : 'error'
                      : methods.formState.errors?.lastName?.message
                        ? 'error'
                        : undefined
                  }
                />
              )}
            />
            <ErrorMessage>
              {methods.formState.errors?.lastName?.message}
            </ErrorMessage>
          </Grid>

          <Grid
            className="display-flex flex-column"
            mobile={{ col: 2 }}
            tablet={{ col: 2 }}
          >
            <Label htmlFor={'suffix'}>Suffix</Label>
            <Controller
              name={'suffix'}
              control={methods.control}
              render={({ field }) => (
                <Select
                  id={'suffix'}
                  value={field.value}
                  name={'suffix'}
                  onChange={field.onChange}
                >
                  <option>--</option>
                  <option value="jr">Jr.</option>
                  <option value="sr">Sr.</option>
                  <option value="i">I</option>
                  <option value="ii">II</option>
                  <option value="iii">III</option>
                </Select>
              )}
            />
          </Grid>
        </Grid>
        <FormProvider {...methods}>
          <ContactInfo />
          <ContactLocation />
          <ActionButtons handleAddEntity={handleAddEntity} />
        </FormProvider>
      </div>
    </>
  )
}

export default EntityForm
