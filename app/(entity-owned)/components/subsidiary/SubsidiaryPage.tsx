'use client'

import React, { useState, useRef, useEffect } from 'react';
import styles from './SubsidiaryPage.module.scss'
import SubsidiariesForm from './SubsidiariesForm';
import { ModalRef, Alert } from '@trussworks/react-uswds'
import SubsidiariesTable from './SubsidiariesTable';
import { IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close'

import { Button, ButtonGroup, FormGroup, Grid, Icon, InputGroup, InputSuffix, TextInput } from '@trussworks/react-uswds'

import useSWR from 'swr'
import fetcher from '@/app/services/fetcher'
import { SUBSIDIARY_PARENT_ENTITY } from '@/app/constants/routes';
import { createSubsidiary } from '@/app/services/api/subsidiary-service/createSubsidiary';
import { updateSubsidiary } from '@/app/services/api/subsidiary-service/updateSubsidiary';
import { deleteSubsidiary } from '@/app/services/api/subsidiary-service/deleteSubsidiary';


const SubsidiaryPage = () => {
  const acceptRequestRef = useRef<ModalRef>(null)
  const [selectedRowData, setSelectedRowData] = useState<any[]>([])
  const [formData, setFormData] = useState<any[]>([])
  const [tableData, setTableData] = useState<any[]>([])

  const [updatedTableData, setUpdatedTableData] = useState([])

  const [searchName, setSearchName] = useState('')
  const [showForm, setShowForm] = useState(false)
  const [showAlert, setShowAlert] = useState(false)

  const subsidiariesTableData = [
    {
      id: 1,
      subsidiary_name: 'Holding Company A',
      parent_company: '[Controlling Entity]',
      address: '123 Main St, Anytown, CA',
      owner: 'Jane Smith',
      email: 'Jabeoe@gmail.com',
      phone_number: '+1 (555) 555-1221',
      notes: 'Note Text',
      isSelected: false
    },
    {
      id: 2,
      subsidiary_name: 'Firm A1',
      parent_company: 'Holding Company A',
      address: '123 Main St, Anytown, CA',
      owner: 'Jane Smith',
      email: 'Jabeoe@gmail.com',
      phone_number: '+1 (555) 555-1221',
      notes: 'Note Text',
      isSelected: false
    },
    {
      id: 3,
      subsidiary_name: 'Firm A2',
      parent_company: 'Holding Company A',
      address: '123 Main St, Anytown, CA',
      owner: 'Jane Smith',
      email: 'Jabeoe@gmail.com',
      phone_number: '+1 (555) 555-1221',
      notes: 'Note Text',
      isSelected: false
    },
    {
      id: 4,
      subsidiary_name: 'Holding Company B',
      parent_company: '[Controlling Entity]',
      address: '123 Main St, Anytown, CA',
      owner: 'Jane Smith',
      email: 'Jabeoe@gmail.com',
      phone_number: '+1 (555) 555-1221',
      notes: 'Note Text',
      isSelected: false
    },
    {
      id: 5,
      subsidiary_name: 'Holding Company C',
      parent_company: 'Holding Company A',
      address: '123 Main St, Anytown, CA',
      owner: 'Jane Smith',
      email: 'Jabeoe@gmail.com',
      phone_number: '+1 (555) 555-1221',
      notes: 'Note Text',
      isSelected: false
    }
  ];

  const [dataCopy, setDataCopy] = useState<any[]>([])
  const [shouldFetch, setShouldFetch] = useState(true)

  const parent_entity_id = 1;
  const owner_user_id = 1;
  const { data: responseData, error: responseError, mutate } = useSWR(
    () => shouldFetch && `${SUBSIDIARY_PARENT_ENTITY}?parent_entity_id=${parent_entity_id}&owner_user_id=${owner_user_id}`,
    fetcher)

  useEffect(() => {
    if (responseData) {
      setTableData(responseData)
      setDataCopy(responseData)
    }
    if (responseError) {
      //use dummy data if API endpoint is down
      setShouldFetch(false)
      setTableData(subsidiariesTableData)
      setDataCopy(subsidiariesTableData)
    }
  }, [responseData, responseError])


  const handleFormRequest = (param: any, id: any) => {
    const updatedItems = formData.filter(item => item.id !== id);
    const selectedItem = formData.filter(item => item.id === id);
    setFormData(updatedItems)

    const newId = Math.floor(Math.random() * 1000) + 1;
    const reviewed = {
      id: newId,
      date: selectedItem[0]?.date,
      applicantFirm: selectedItem[0]?.companyName,
      owner: selectedItem[0]?.contactPerson,
      address: selectedItem[0]?.address,
      contact: '-',
      status: param === 'Reject' ? 'Rejected' : 'Accepted',
      isNew: true
    };

    setTableData(prevItems => {
      const updatedItems = [...prevItems, reviewed];
      return updatedItems.sort((a, b) => b.id - a.id); // Sort by id in ascending order
    });

    // Remove the highlight after 2 seconds
    setTimeout(() => {
      setTableData(prevItems => {
        return prevItems.map(item => {
          if (item.id === newId) {
            return { ...item, isNew: false };
          }
          return item;
        });
      });
    }, 2000);
  }

  const handleTableRequest = (data: any) => {
    const filteredItems = data.filter((item: any) => item.isSelected === true);
    if (filteredItems.length > 0) {
      setShowForm(true)
    } else {
      setShowForm(false)
    }
    setSelectedRowData(filteredItems)
    setUpdatedTableData(data);
  }

  const handleCloseFilterMenu = (id: any) => {
    setUpdatedTableData((prevItems: any) =>
      prevItems.map((item: any) =>
        item.id === id ? { ...item, isSelected: false } : item
      )
    );
  }

  const handleSearch = () => {
    if (searchName === '') {
      setTableData(subsidiariesTableData)
    } else {
      const filteredItems = tableData.filter(item =>
        item.subsidiary_name.toLowerCase().includes(searchName.toLowerCase())
      );
      if (filteredItems.length > 0) {
        const updatedItems = filteredItems.map(item => ({
          ...item,
          isSelected: true
        }));
        setTableData(updatedItems)
      }
    }
  }

  useEffect(() => {
    if (updatedTableData.length > 0) {
      setTableData(updatedTableData)
    }
  }, [updatedTableData])

  useEffect(() => {
    if (searchName === '') {
      setTableData(subsidiariesTableData)
    }
  }, [searchName])

  const addNew = () => {
    setShowForm(true)
  }
  const handleSaveFrom = async (data: any) => {
    // setTableData([...tableData, data])
    console.log(">> data", data);
    
    setShowForm(false)
    if (!data?.isNew) {
      const url = `${SUBSIDIARY_PARENT_ENTITY}`;
      await updateSubsidiary(url, data);
      await mutate();
    } else {
      const url = `${SUBSIDIARY_PARENT_ENTITY}`;
      await createSubsidiary(url, data);
      await mutate();
    }
    // setTableData([...tableData, data])
    setTableData(dataCopy)
  }
  const handleDeleteData = async (id: any) => {
    const url = `${SUBSIDIARY_PARENT_ENTITY}`;
    await deleteSubsidiary(url, id);
    await mutate();

    const filteredItems = tableData.filter(item => item.id !== id);
    setTableData(filteredItems)
    setShowForm(false)
    setShowAlert(true)

    // Remove the highlight after 2 seconds
    setTimeout(() => {
      setShowAlert(false)
    }, 3000);
  }

  return (
    <>
      <Grid row>
        <Grid col={6}>
          <h1 className="margin-bottom-0">Subsidiaries</h1>
        </Grid>
        <Grid col={6} className="display-flex flex-justify-end">
          <FormGroup>
            <InputGroup className={styles['searchBox']}>
              <TextInput
                id="search"
                name="search"
                type="search"
                onChange={(e) => setSearchName(e.target.value)}
              />
              <InputSuffix className={styles['searchBtn']}>
                <Icon.Search
                  onClick={handleSearch}
                />
              </InputSuffix>
            </InputGroup>
          </FormGroup>
        </Grid>
      </Grid>

      <hr style={{ margin: '1rem 0' }} />

      <Grid row>
        <Grid col={6}>
          <h2 className="margin-top-1">Subsidiaries</h2>
        </Grid>
        <Grid col={6} className="display-flex flex-justify-end">
          <ButtonGroup type="default">
            <Button
              type="button"
              outline
              disabled={(selectedRowData.length > 1 || selectedRowData.length === 0) ? true : false}
            >
              Edit
            </Button>
            <Button
              type="button"
              onClick={addNew}
              disabled={(selectedRowData.length > 0) ? true : false}
            >
              Add New
            </Button>
          </ButtonGroup>
        </Grid>

        {
          showAlert &&
          <Grid col={12} className="margin-bottom-105">
            <Alert type="success" headingLevel="h4" noIcon>
              Record Deleted Successfully.
            </Alert>
          </Grid>
        }

        <Grid row className='margin-bottom-105'>

          {selectedRowData.map((item, index) => (
            <div key={index} className={styles['filterSelected']}>
              <span>{item.subsidiary_name}</span>
              <IconButton
                id="fade-button"
                aria-controls={'fade-menu'}
                aria-haspopup="true"
                aria-expanded={'true'}
                onClick={() => handleCloseFilterMenu(item?.id)}
                className={styles['filterBtn']}
                disableRipple
              >
                <CloseIcon />
              </IconButton>
            </div>
          ))
          }

        </Grid>
      </Grid>

      <SubsidiariesTable
        subsidiariesTableData={tableData as any}
        handleTableAction={handleTableRequest}
      />

      {
        showForm &&
        <SubsidiariesForm
          data={selectedRowData as any}
          handleCancelFrom={() => setShowForm(false)}
          handleSaveFrom={handleSaveFrom}
          handleDeleteData={handleDeleteData}
        />
      }

    </>
  )
}

export default SubsidiaryPage
