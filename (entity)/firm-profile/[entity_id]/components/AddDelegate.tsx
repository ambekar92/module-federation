'use client'

import React from 'react'
import { Provider } from 'react-redux'
import store from './store/store'
import AddDelegateForm from './fragments/AddDelegateForm'

export default function AddDelegateToEntity(): JSX.Element {
  return (
    <Provider store={store}>
      <AddDelegateForm />
    </Provider>
  )
}
