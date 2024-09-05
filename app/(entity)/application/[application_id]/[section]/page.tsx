'use client'
import dynamic from 'next/dynamic'
import { useParams } from 'next/navigation'
import React from 'react'
import { Provider } from 'react-redux'
import ApplicationLayout from '../../components/ApplicationLayout'
import applicationStore from '../../redux/applicationStore'
import ContributorInvitation from '../../sections/ContributorInvitation'
import DocumentUpload from '../../sections/DocumentUpload'
import EligiblePrograms from '../../sections/EligiblePrograms'
import EntityOwned from '../../sections/EntityOwned'
import ControlAndOpsQuestions from '../../sections/questionnaires/static/ControlAndOpsQuestions'
import OwnershipQuestions from '../../sections/questionnaires/static/OwnershipQuestions'

// Import the Attestation component dynamically and disable SSR
// NOTE: This is really just to allow the build to work will need to be fixed once API is up -KJ
const SignPage = dynamic(() => import('../../sections/Sign'), {
  ssr: false,
})

interface ApplicationPageProps {
  params: {
    application_id: string
    section?: string
  }
}

const ApplicationPage: React.FC<ApplicationPageProps> = () => {
  if (process.env.NEXT_PUBLIC_DEBUG_MODE) {
    console.log('ApplicationPage');
  }
  let content
  const params = useParams()
  const section = params.section as string | undefined

  switch (section) {
    case 'entity-owned':
      content = <EntityOwned />
      break
    case 'ownership':
      content = <OwnershipQuestions />
      break
    case 'control-and-operations':
      content = <ControlAndOpsQuestions />
      break
    case 'eligible-programs':
      content = <EligiblePrograms />
      break
    case 'contributor-invite':
      content = <ContributorInvitation />
      break
    case 'document-upload':
      content = <DocumentUpload />
      break
    case 'sign':
      content = <SignPage />
      break
    default:
      content = null
  }

  return (
    <Provider store={applicationStore}>
      <ApplicationLayout>{content}</ApplicationLayout>
    </Provider>
  )
}

export default ApplicationPage
