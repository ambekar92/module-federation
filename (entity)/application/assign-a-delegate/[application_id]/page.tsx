'use client'
import React from 'react'
import { Provider } from 'react-redux'
import store from '../store/store'
import AddDelegateForm from '../components/AddDelegateForm'

const AddDelegatePage = () => {
  return (
    <Provider store={store}>
      <AddDelegateForm />
    </Provider>
  )
}

export default AddDelegatePage
