'use client'
import { Provider } from 'react-redux';
import applicationStore from './redux/applicationStore';
import { OwnershipStep } from './fragments/';

function ApplicationPage() {
  return (
    <Provider store={applicationStore}>
      <OwnershipStep />
    </Provider>
  )
}
export default ApplicationPage
