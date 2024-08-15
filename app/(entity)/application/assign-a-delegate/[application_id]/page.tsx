'use client'
import React from 'react'
import { Provider } from 'react-redux'
import store from '../store/store'
import AddDelegateForm from '../components/AddDelegateForm'
import TooltipIcon from '@/app/shared/components/tooltip/Tooltip'

const AddDelegatePage = () => {
  return (
    <Provider store={store}>
      <h1 className='margin-left-2'>Assign a Delegate<TooltipIcon text='Secondary user invoiced with the applying firm that may have ownership or control in business. These individuals can manage the entire application process outside of QO (Qualifying Owners) specific tasks.'/></h1>
      <AddDelegateForm />
    </Provider>
  )
}

export default AddDelegatePage
