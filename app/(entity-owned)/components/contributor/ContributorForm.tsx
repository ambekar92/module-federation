'use client'
import { Button, ButtonGroup, ErrorMessage, Grid, Label, Select, Textarea, TextInput } from '@trussworks/react-uswds'
import React, { useState, useEffect, useRef } from 'react'
import { ModalRef } from '@trussworks/react-uswds'
import styles from './ContributorPage.module.scss'
import DeleteRequestModal from './DeleteRequestModal'

interface ContributorFormProps {
  data: [{
    id: string;
    isNew: string;
    contributor_name: string;
    title: string;
    associated_firms: string;
    email: string;
    isSelected: string;
    firstName: string;
    middleName: string;
    lastName: string;
    prefix: string;
    suffix: string;
    phone_number: string;
    country_code: string;
  }]
  target: {
    name: any
    value: any
  }
  handleCancelFrom: () => void
  handleSaveFrom: (data: any, type: any) => void
  handleDeleteData: (id: any) => void
}

const ContributorForm: React.FC<ContributorFormProps> = ({
  data,
  handleCancelFrom,
  handleSaveFrom,
  handleDeleteData
}) => {
  const deleteRequestRef = useRef<ModalRef>(null)

  const intialData = {
    id: "",
    isNew: "",
    contributor_name: "",
    title: "",
    associated_firms: "",
    email: "",
    isSelected: "",
    firstName: "",
    middleName: "",
    lastName: "",
    prefix: "",
    suffix: "",
    phone_number: "",
    country_code: "",
  }
  const [formInputs, setFormInputs] = useState(intialData);
  const [modalData, setModalData] = useState('')
  const [saveStatus, setSaveStatus] = useState(true)

  const onInputChange: React.FC<ContributorFormProps> = ({ target: { name, value } }) => {
    setFormInputs((formInputs) => ({ ...formInputs, [name]: value }));
    if (name === 'firstName' || name === 'lastName' || name === 'title' || name === 'middleName' || name === 'email' || name === 'phone_number') {
      if (value === '') {
        setSaveStatus(true)
      } else {
        setSaveStatus(false)
      }
    }
  };

  useEffect(() => {
    if (data.length > 0) {
      setFormInputs(data[data.length - 1])
    } else {
      setFormInputs(intialData)
    }
  }, [data])

  const handleCancel = () => {
    handleCancelFrom()
  }
  const handleSave = () => {
    if(formInputs.id){
      formInputs.contributor_name = formInputs.firstName + " " + formInputs.middleName + " " + formInputs.lastName;         
      handleSaveFrom(formInputs, 'Edit')
    }else{
      formInputs.id = Math.floor(1000 + Math.random() * 9000);
      formInputs.contributor_name = formInputs.firstName + " " + formInputs.middleName + " " + formInputs.lastName;    
      formInputs.isNew = true;    
      handleSaveFrom(formInputs, 'Save')
    }
    
    
  }
  const handleDelete = () => {
    let obj = {
      selectedId: formInputs.id,
      title: "Delete Contributor",
      description: "Do you wish to delete " + formInputs.contributor_name,
      buttonText: "Delete"
    }
    setModalData(obj);
    deleteRequestRef.current?.toggleModal()
  }
  const handleDeleteRequestFromModal = (id: any) => {
    handleDeleteData(id)
  }

  return (
    <>
      <Grid row gap='md' className={styles['formArea']}>

        <h3 className='margin-bottom-0'>Identification</h3>
        <Grid className='display-flex flex-column' mobile={{ col: 12 }} tablet={{ col: 12 }}>
          <Label htmlFor='title' className='margin-top-1'>Title / Position</Label>
          <TextInput
            id='title'
            type='text'
            className='maxw-full'
            value={formInputs.title}
            name={'title'}
            placeholder='--'
            onChange={onInputChange}
          />
        </Grid>

        <Grid className='display-flex flex-column' mobile={{ col: 2 }} tablet={{ col: 2 }}>
          <Label htmlFor='prefix'>Prefix</Label>
          <Select
            id='prefix'
            value={formInputs.prefix}
            name={'prefix'}
            placeholder='--'
            onChange={onInputChange}
          >
            <option>--</option>
            <option value="Mr">Mr</option>
            <option value="Mis">Mis</option>
          </Select>
        </Grid>
        <Grid className='display-flex flex-column' mobile={{ col: 5 }} tablet={{ col: 5 }}>
          <Label htmlFor='firstName' requiredMarker={true}>First Name</Label>
          <TextInput
            id='firstName'
            type='text'
            className='maxw-full'
            value={formInputs.firstName}
            name={'firstName'}
            placeholder='--'
            onChange={onInputChange}
          />
        </Grid>
        <Grid className='display-flex flex-column' mobile={{ col: 5 }} tablet={{ col: 5 }}>
          <Label htmlFor='middleName'>Middle Name</Label>
          <TextInput
            id='middleName'
            type='text'
            className='maxw-full'
            value={formInputs.middleName}
            name={'middleName'}
            placeholder='--'
            onChange={onInputChange}
          />
        </Grid>


        <Grid className='display-flex flex-column' mobile={{ col: 10 }} tablet={{ col: 10 }}>
          <Label htmlFor='lastName' requiredMarker={true}>Last Name</Label>
          <TextInput
            id='lastName'
            type='text'
            className='maxw-full'
            value={formInputs.lastName}
            name={'lastName'}
            placeholder='--'
            onChange={onInputChange}
          />
        </Grid>
        <Grid className='display-flex flex-column' mobile={{ col: 2 }} tablet={{ col: 2 }}>
          <Label htmlFor='suffix'>Suffix</Label>
          <Select
            id='suffix'
            value={formInputs.suffix}
            name={'suffix'}
            placeholder='--'
            onChange={onInputChange}
          >
            <option>--</option>
            <option value="Mr">Mr</option>
            <option value="Mis">Mis</option>
          </Select>
        </Grid>


        <h3 className='margin-bottom-0 margin-top-4'>Contact Information</h3>
        <Grid className='display-flex flex-column' mobile={{ col: 12 }} tablet={{ col: 12 }}>
          <Label htmlFor='email' className='margin-top-1'>Email Address</Label>
          <TextInput
            id='email'
            type='text'
            className='maxw-full'
            value={formInputs.email}
            name={'email'}
            placeholder='--'
            onChange={onInputChange}
          />
        </Grid>
        <Grid className='display-flex flex-column' mobile={{ col: 4 }} tablet={{ col: 4 }}>
          <Label htmlFor='country_code'>Country Code</Label>
          <Select
            id='country_code'
            value={formInputs.country_code}
            name={'country_code'}
            placeholder='--'
            onChange={onInputChange}
          >
            <option>--</option>
            <option value="98">98</option>
            <option value="93">93</option>
            <option value="106">106</option>
          </Select>
        </Grid>

        <Grid className='display-flex flex-column' mobile={{ col: 8 }} tablet={{ col: 8 }}>
          <Label htmlFor='phone_number'>Phone Number</Label>
          <TextInput
            id='phone_number'
            type='text'
            className='maxw-full'
            value={formInputs.phone_number}
            name={'phone_number'}
            placeholder='--'
            onChange={onInputChange}
          />
        </Grid>

        <Grid col={6} className='margin-top-2'>
          <ButtonGroup type="default">
            <Button type="button" onClick={handleSave} disabled={saveStatus}>
              Save
            </Button>
            <Button type="button" outline onClick={handleCancel}>
              Cancel
            </Button>
          </ButtonGroup>
        </Grid>
        <Grid col={6} className="display-flex flex-justify-end margin-top-2">
          <ButtonGroup type="default">
            <Button type="button" onClick={handleDelete} secondary>
              Delete
            </Button>
          </ButtonGroup>
        </Grid>


      </Grid>

      <DeleteRequestModal
        modalRef={deleteRequestRef}
        data={modalData}
        handleAction={handleDeleteRequestFromModal}
      />
    </>
  )
}

export default ContributorForm
