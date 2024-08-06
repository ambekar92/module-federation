'use client'
import dynamic from 'next/dynamic'
import React from 'react'
import { Provider } from 'react-redux'
import ApplicationLayout from '../../components/ApplicationLayout'
import applicationStore from '../../redux/applicationStore'
import ContributorInvitation from '../../sections/ContributorInvitation'
import ControlAndOperations from '../../sections/ControlAndOperations'
import DocumentUpload from '../../sections/DocumentUpload'
import EligiblePrograms from '../../sections/EligiblePrograms'
import Ownership from '../../sections/Ownership'
import ControlAndOpsQuestions from '../../sections/questionnaires/static/ControlAndOpsQuestions'
import OwnershipQuestions from '../../sections/questionnaires/static/OwnershipQuestions'
import EntityOwned from '../../sections/EntityOwned'
import { useParams } from 'next/navigation'

// Import the Attestation component dynamically and disable SSR
// NOTE: This is really just to allow the build to work will need to be fixed once API is up -KJ
const SignPage = dynamic(() => import('../../sections/Sign'), {
  ssr: false,
})

interface ApplicationPageProps {
  params: {
    contributor_id: string
    section?: string
  }
}

const ApplicationPage: React.FC<ApplicationPageProps> = () => {
  let content
  const params = useParams()
  const contributorId = parseInt(params.contributor_id as string, 10)
  const section = params.section as string | undefined

  switch (section) {
    case 'entity-owned':
      content = <EntityOwned contributorId={contributorId} />
      break
    case 'ownership':
      content = <OwnershipQuestions contributorId={contributorId} />
      break
    case 'control-and-operations':
      content = <ControlAndOpsQuestions contributorId={contributorId} />
      break
    case 'ownership-test':
      content = <Ownership contributorId={contributorId} />
      break
    case 'eligible-programs':
      content = <EligiblePrograms contributorId={contributorId} />
      break
    case 'control-and-ops-test':
      content = <ControlAndOperations contributorId={contributorId} />
      break
    case 'contributor-invite':
      content = <ContributorInvitation contributorId={contributorId} />
      break
    case 'document-upload':
      content = <DocumentUpload contributorId={contributorId} />
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
