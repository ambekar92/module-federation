'use client'
import { Button, ButtonGroup, ErrorMessage, Grid, Label, Select, Textarea, TextInput } from '@trussworks/react-uswds'
import React, { useState, useEffect, useRef } from 'react'
import { ModalRef } from '@trussworks/react-uswds'
import styles from './SubsidiaryPage.module.scss'
import DeleteRequestModal from './DeleteRequestModal'

interface SubsidiariesFormProps {
  data: [{
    id: string;
    isNew: string;
    subsidiary_name: string;
    parent_company: string;
    address: string;
    owner: string;
    email: string;
    phone_number: string;
    notes: string;
  }]
  target: {
    name: any
    value: any
  }
  handleCancelFrom: () => void
  handleSaveFrom: (data: any) => void
  handleDeleteData: (id: any) => void
}

const SubsidiariesForm: React.FC<SubsidiariesFormProps> = ({
  data,
  handleCancelFrom,
  handleSaveFrom,
  handleDeleteData
}) => {
  const deleteRequestRef = useRef<ModalRef>(null)

  const intialData = {
    id:"",
    subsidiary_name: "",
    parent_company: "",
    address: "",
    owner: "",
    email: "",
    phone_number: "",
    notes: ""
  }
  const [formInputs, setFormInputs] = useState(intialData);
  const [modalData, setModalData] = useState('')
  const [saveStatus, setSaveStatus] = useState(true)

  const onInputChange: React.FC<SubsidiariesFormProps> = ({ target: { name, value } }) => {
    setFormInputs((formInputs) => ({ ...formInputs, [name]: value }));
    if(name === 'subsidiary_name'){
      if(value === ''){
        setSaveStatus(true)
      }else{
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
    formInputs.id = Math.floor(1000 + Math.random() * 9000);
    handleSaveFrom(formInputs)
  }
  const handleDelete = () => {
    let obj = {
      selectedId: formInputs.id,
      title: "Delete Subsidiary",
      description: "Do you wish to delete " + formInputs.subsidiary_name,
      buttonText: "Delete"
    }
    setModalData(obj);
    deleteRequestRef.current?.toggleModal()
  }
  const handleDeleteRequestFromModal = (id:any) => {
    handleDeleteData(id)
  }

  return (
    <>
      <Grid row gap='md' className={styles['formArea']}>
        <Grid className='display-flex flex-column' mobile={{ col: 8 }} tablet={{ col: 8 }}>
          <Label htmlFor='subsidiary_name' requiredMarker={true}>Subsidiary Name</Label>
          <TextInput
            id='subsidiary_name'
            type='text'
            className='maxw-full'
            value={formInputs.subsidiary_name}
            name={'subsidiary_name'}
            placeholder='--'
            onChange={onInputChange}
          />
          {/* <ErrorMessage>Error msg</ErrorMessage> */}
        </Grid>
        <Grid className='display-flex flex-column' mobile={{ col: 4 }} tablet={{ col: 4 }}>
          <Label htmlFor='parent_company'>Parent Company</Label>
          <Select
            id='parent_company'
            value={formInputs.parent_company}
            name={'parent_company'}
            placeholder='--'
            onChange={onInputChange}
          >
            <option>--</option>
            <option value="[Controlling Entity]">[Controlling Entity]</option>
            <option value="Holding Company A">Holding Company A</option>
          </Select>
        </Grid>

        <Grid className='display-flex flex-column' mobile={{ col: 12 }} tablet={{ col: 12 }}>
          <Label htmlFor='address'>Address</Label>
          <TextInput
            id='address'
            type='text'
            className='maxw-full'
            value={formInputs.address}
            name={'address'}
            placeholder='--'
            onChange={onInputChange}
          />
        </Grid>

        <Grid className='display-flex flex-column' mobile={{ col: 12 }} tablet={{ col: 12 }}>
          <Label htmlFor='owner'>Owner</Label>
          <TextInput
            id='owner'
            type='text'
            className='maxw-full'
            value={formInputs.owner}
            name={'owner'}
            placeholder='--'
            onChange={onInputChange}
          />
        </Grid>

        <Grid className='display-flex flex-column' mobile={{ col: 12 }} tablet={{ col: 12 }}>
          <Label htmlFor='email'>Email</Label>
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

        <Grid className='display-flex flex-column' mobile={{ col: 12 }} tablet={{ col: 12 }}>
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
        <Grid className='display-flex flex-column' mobile={{ col: 12 }} tablet={{ col: 12 }}>
          <Label htmlFor='notes'>Notes</Label>
          <Textarea
            className="display-flex flex-col maxw-full width-full"
            id="notes"
            name="notes"
            value={formInputs.notes}
            placeholder='--'
            onChange={onInputChange}
          />
        </Grid>
        <Grid col={6}>
          <ButtonGroup type="default">
            <Button type="button" onClick={handleSave} disabled={saveStatus}>
              Save
            </Button>
            <Button type="button" outline onClick={handleCancel}>
              Cancel
            </Button>
          </ButtonGroup>
        </Grid>
        <Grid col={6} className="display-flex flex-justify-end">
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

export default SubsidiariesForm
