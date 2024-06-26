'use client'
import dynamic from 'next/dynamic';
import { useSearchParams } from 'next/navigation';
import React from 'react';
import { Provider } from 'react-redux';
import applicationStore from '../redux/applicationStore';
import EightaQuestions from '../sections/questionnaires/EightaQuestions';
import IndividualQuestions from '../sections/questionnaires/IndividualQuestions';
import Ownership from '../sections/Ownership';
import ApplicationLayout from '../components/ApplicationLayout';
import DocumentUpload from '../sections/DocumentUpload';
import ControlAndOperations from '../sections/ControlAndOperations';
import EligiblePrograms from '../sections/EligiblePrograms';
import Questionnaires from '../components/questionnaire/Questionnaires';
import ContributorInvitation from '../sections/ContributorInvitation';
import ProgramSpecificQuestions from '../sections/questionnaires/ProgramSpecificQuestions';
import OwnershipQuestions from '../sections/questionnaires/OwnershipQuestions';
import ControlAndOpsQuestions from '../sections/questionnaires/ControlAndOpsQuestions';
import QuestionnairePage from '../sections/questionnaires/QuestionnairePage';
import HubzoneCalculator from '../sections/HubzoneCalculator';

// Import the Attestation component dynamically and disable SSR
// NOTE: This is really just to allow the build to work will need to be fixed once API is up -KJ
const SignPage = dynamic(() => import('../sections/Sign'), {
  ssr: false
});

interface AdditionalInfoPageProps {
  params: {
    section?: string;
  };
}

const ApplicationPage: React.FC<AdditionalInfoPageProps> = ({ params: { section } }) => {
  const searchParams = useSearchParams();
  const stepParam = searchParams.get('step');
  const indexParam = searchParams.get('index');
  const step = stepParam ? parseInt(stepParam, 10) : 0;
  const index = indexParam ? parseInt(indexParam, 10) : 1;

  let content;
  switch (section) {
    case 'ownership-test':
      content = <OwnershipQuestions />
      break;
    case 'control-and-ops-test':
      content = <ControlAndOpsQuestions />
      break;
    case 'ownership':
      content = <Ownership />;
      break;
    case 'eligible-programs':
      content = <EligiblePrograms />;
      break;
    case 'control-and-operations':
      content = <ControlAndOperations />;
      break;
    case 'questionnaires':
      content = <Questionnaires />
      break;
    case 'questionnaire':
      content = <QuestionnairePage index={index} />
      break;
    case 'questionnaire-individual':
      content = <IndividualQuestions step={step} />;
      break;
    case 'questionnaire-eight-a':
      content = <EightaQuestions step={step} />;
      break;
    case 'questionnaire-program-specific':
      content = <ProgramSpecificQuestions step={step} />;
      break;
    case 'questionnaire-hubzone-calculator':
      content = <HubzoneCalculator />
      break;
    case 'document-upload':
      content = <DocumentUpload />;
      break;
    case 'contributor-invite':
      content = <ContributorInvitation />
      break;
    case 'sign':
      content = <SignPage />
      break;
    default:
      content = null;
  }

  return (
    content && (
      <Provider store={applicationStore}>
        <ApplicationLayout>
          {content}
        </ApplicationLayout>
      </Provider>
    )
  );
};

export default ApplicationPage;
