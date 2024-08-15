'use client'
import { INVITATION_ROUTE, QUESTIONNAIRE_ROUTE } from '@/app/constants/routes';
import { APPLICATION_STEP_ROUTE, buildRoute } from '@/app/constants/url';
import fetcher from '@/app/services/fetcher';
import { InvitationType } from '@/app/services/types/application-service/Application';
import { CustomTable } from '@/app/shared/components/CustomTable';
import { useApplicationContext } from '@/app/shared/hooks/useApplicationContext';
import useFetchOnce from '@/app/shared/hooks/useFetchOnce';
import { useUpdateApplicationProgress } from '@/app/shared/hooks/useUpdateApplicationProgress';
import { Question } from '@/app/shared/types/questionnaireTypes';
import { Button, ButtonGroup, Grid, GridContainer, Label, TextInput } from '@trussworks/react-uswds';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import InviteContributorModal from '../components/contributor-invite/InviteContributorModal';
import { Contributor } from '../components/contributor-invite/types';
import { selectApplication, setContributors, setIsAddingContributor, setStep } from '../redux/applicationSlice';
import { useApplicationDispatch, useApplicationSelector } from '../redux/hooks';
import { applicationSteps } from '../utils/constants';
import { convertOperatorAnswerToContributors, convertOwnerAnswerToContributors } from '../utils/convertToContributor';
import { useUserApplicationInfo } from '../utils/useUserApplicationInfo';
import useSWR from 'swr';

function ContributorInvitation() {
  useUpdateApplicationProgress('Contributor Invitation');
  const { applicationId, contributorId, applicationData } = useApplicationContext();

  const dispatch = useApplicationDispatch();
  const { updateUserApplicationInfo } = useUserApplicationInfo();
  const { isAddingContributor, contributors } = useApplicationSelector(selectApplication);

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [emailAddress, setEmailAddress] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  const prevInvitationDataRef = useRef<InvitationType[] | null>(null);

  const { data: invitationData, error: invitationError } = useSWR<InvitationType[]>(contributorId ? `${INVITATION_ROUTE}/${contributorId}`: null, fetcher);
  const { data: ownerData } = useSWR<Question[]>(contributorId ? `${QUESTIONNAIRE_ROUTE}/${contributorId}/owner-and-management` : null, fetcher);
  const { data: operatorData } = useSWR<Question[]>(contributorId ? `${QUESTIONNAIRE_ROUTE}/${contributorId}/control-and-operation` : null, fetcher);

  useEffect(() => {
    if (ownerData && ownerData[0].answer) {
      const ownerContributors = convertOwnerAnswerToContributors(ownerData[0].answer);
      dispatch((dispatch, getState) => {
        const currentState = selectApplication(getState());
        const updatedContributors = [...currentState.contributors];

        ownerContributors.forEach(newOwner => {
          const existingIndex = updatedContributors.findIndex(c =>
            c.emailAddress === newOwner.emailAddress &&
						(c.contributorRole === 'role_owner' || c.contributorRole === 'role_owner_eligible')
          );
          if (existingIndex === -1) {
            updatedContributors.push(newOwner);
          } else {
            updatedContributors[existingIndex] = { ...updatedContributors[existingIndex], ...newOwner };
          }
        });

        dispatch(setContributors(updatedContributors));
      });
    }
  }, [ownerData, dispatch]);

  useEffect(() => {
    if (operatorData && operatorData[0].answer?.value && Array.isArray(operatorData[0].answer.value) && operatorData[0].answer.value.length > 0) {
      const operatorContributors = convertOperatorAnswerToContributors(operatorData[0].answer);
      dispatch((dispatch, getState) => {
        const currentState = selectApplication(getState());
        const updatedContributors = [...currentState.contributors];

        operatorContributors.forEach(newOperator => {
          const existingIndex = updatedContributors.findIndex(c =>
            c.emailAddress === newOperator.emailAddress && c.contributorRole === 'role_other'
          );
          if (existingIndex === -1) {
            updatedContributors.push(newOperator);
          } else {
            updatedContributors[existingIndex] = { ...updatedContributors[existingIndex], ...newOperator };
          }
        });

        dispatch(setContributors(updatedContributors));
      });
    }
  }, [operatorData, dispatch]);

  useEffect(() => {
    dispatch(setStep(applicationSteps.contributorInvitation.stepIndex));
    dispatch(setIsAddingContributor(false));
  }, [dispatch]);

  // Converts Invitation data users into contributors
  useEffect(() => {
    if (invitationData && invitationData !== prevInvitationDataRef.current) {
      prevInvitationDataRef.current = invitationData;

      const apiContributors: Contributor[] = invitationData
        .filter((item: InvitationType) => item.invitation_status !== 'removed')
        .map((item: InvitationType) => ({
          firstName: item.first_name,
          lastName: item.last_name,
          emailAddress: item.email,
          contributorRole: item.application_role.name === 'spouse-of-qualifying-owner'
            ? 'role_spouse'
            : item.application_role.name === 'delegate'
              ? 'role_other'
              : 'role_other' as 'role_owner' | 'role_other' | 'role_spouse',
        }));

      dispatch((dispatch, getState) => {
        const currentState = selectApplication(getState());
        const currentContributors = currentState.contributors;
        const mergedContributors = [...currentContributors];
        apiContributors.forEach(apiContributor => {
          const existingIndex = mergedContributors.findIndex(
            c => c.emailAddress === apiContributor.emailAddress && c.contributorRole === apiContributor.contributorRole
          );
          if (existingIndex === -1) {
            mergedContributors.push(apiContributor);
          } else {
            mergedContributors[existingIndex] = {
              ...mergedContributors[existingIndex],
              ...apiContributor
            };
          }
        });

        dispatch(setContributors(mergedContributors));
      });
    }
  }, [dispatch, invitationData]);

  const handleAddNew = () => {
    dispatch(setIsAddingContributor(true));
    setFirstName('');
    setLastName('');
    setEmailAddress('');
    setEditingIndex(null);
  };

  const handleAddOrUpdateContributor = () => {
    const requiredFieldsFilled =
			firstName.trim() !== '' &&
			lastName.trim() !== '' &&
			emailAddress.trim() !== '';

    if (requiredFieldsFilled) {
      const newContributor: Contributor = {
        firstName,
        lastName,
        emailAddress,
        contributorRole: 'role_spouse',
      };

      let updatedContributors;
      if (editingIndex !== null) {
        updatedContributors = contributors.map((contributor, index) => {
          if (index === editingIndex) {
            return { ...newContributor, contributorRole: contributor.contributorRole };
          }
          return contributor;
        });
        setEditingIndex(null);
      } else {
        // Check for duplicates
        const isDuplicate = contributors.some(
          c => c.emailAddress === newContributor.emailAddress && c.contributorRole === newContributor.contributorRole
        );
        if (isDuplicate) {
          alert('A contributor with this email and role already exists.');
          return;
        }
        updatedContributors = [...contributors, newContributor];
      }

      dispatch(setContributors(updatedContributors));
      updateUserApplicationInfo({ contributors: updatedContributors });

      setFirstName('');
      setLastName('');
      setEmailAddress('');
      dispatch(setIsAddingContributor(false));
    } else {
      alert('Please fill out all required fields.');
    }
  };

  const handleDeleteContributor = (roleIndex: number, role: string) => {
		interface Accumulator {
			result: Contributor[];
			roleIndex: number;
		}

		const updatedContributors = contributors.reduce((acc: Accumulator, contributor: Contributor) => {
		  if ((role === 'role_owner' && (contributor.contributorRole === 'role_owner' || contributor.contributorRole === 'role_owner_eligible')) ||
					contributor.contributorRole === role) {
		    if (acc.roleIndex !== roleIndex) {
		      acc.result.push(contributor);
		    }
		    acc.roleIndex++;
		  } else {
		    acc.result.push(contributor);
		  }
		  return acc;
		}, { result: [], roleIndex: 0 } as Accumulator).result;

		dispatch(setContributors(updatedContributors));
		updateUserApplicationInfo({ contributors: updatedContributors });
  };

  const handleEditOwner = (index: number) => {
    const owners = contributors.filter(contributor =>
      contributor.contributorRole === 'role_owner' || contributor.contributorRole === 'role_owner_eligible'
    );
    const owner = owners[index];
    setFirstName(owner.firstName || '');
    setLastName(owner.lastName || '');
    setEmailAddress(owner.emailAddress);
    setEditingIndex(contributors.indexOf(owner));
    dispatch(setIsAddingContributor(true));
  };

  const handleEditSpouse = (index: number) => {
    const spouses = contributors.filter(contributor => contributor.contributorRole === 'role_spouse');
    const spouse = spouses[index];
    setFirstName(spouse.firstName || '');
    setLastName(spouse.lastName || '');
    setEmailAddress(spouse.emailAddress);
    setEditingIndex(contributors.indexOf(spouse));
    dispatch(setIsAddingContributor(true));
  };

  const handleEditOther = (index: number) => {
    const others = contributors.filter(contributor => contributor.contributorRole === 'role_other');
    const other = others[index];
    setFirstName(other.firstName || '');
    setLastName(other.lastName || '');
    setEmailAddress(other.emailAddress);
    setEditingIndex(contributors.indexOf(other));
    dispatch(setIsAddingContributor(true));
  };

  const roleDisplayName = (role: string) => {
    switch (role) {
      case 'role_owner_eligible':
      case 'role_owner':
        return 'Owner';
      case 'role_spouse':
        return 'Spouse';
      case 'role_other':
        return 'Other';
      default:
        return role;
    }
  };

  const tableHeaders = [
    { id: 'Name', headerName: 'Legal Name' },
    { id: 'Email', headerName: 'Email' },
  ];

  const ownerTableRows = contributors
    .filter(contributor => contributor.contributorRole === 'role_owner' || contributor.contributorRole === 'role_owner_eligible')
    .map((contributor, index) => ({
      id: index,
      Name: `${contributor.firstName} ${contributor.lastName}`,
      Role: roleDisplayName(contributor.contributorRole),
      Email: contributor.emailAddress,
    }));

  const spouseTableRows = contributors
    .filter(contributor => contributor.contributorRole === 'role_spouse')
    .map((contributor, index) => ({
      id: index,
      Name: `${contributor.firstName} ${contributor.lastName}`,
      Role: roleDisplayName(contributor.contributorRole),
      Email: contributor.emailAddress,
    }));

  const operatorTableRows = contributors
    .filter(contributor => contributor.contributorRole === 'role_other')
    .map((contributor, index) => ({
      id: index,
      Name: `${contributor.firstName} ${contributor.lastName}`,
      Role: roleDisplayName(contributor.contributorRole),
      Email: contributor.emailAddress,
    }));

  const closeModal = () => {
    setShowModal(false)
  }

  const handleNextClick = () => {
    if(contributors.length > 0) {
      setShowModal(true);
    }
  }

  if(invitationError) {
    // eslint-disable-next-line no-console
    console.log(invitationError);;
  }

  return (
    <>
		  <div>
        <h1>Contributor Invitations</h1>
      </div>
      <InviteContributorModal
        contributors={contributors}
        open={showModal}
        handleCancel={closeModal}
        contributorId={contributorId}
        applicationId={applicationId}
        entityId={applicationData?.entity.entity_id}
      />
      <h3 className="margin-y-0">Each person you invite to contribute will receive an email with instructions for creating their profile and submitting their information.</h3>
      <hr className="margin-y-3 width-full border-base-lightest" />

      {contributors.length === 0 && (
        <div className="margin-left-auto">
          <Button type="button" outline onClick={handleAddNew}>
          	Invite Spouses
          </Button>
        </div>
      )}

      {isAddingContributor && (
        <GridContainer containerSize='widescreen' className='width-full padding-y-2 margin-top-2 bg-base-lightest'>
          <Grid row gap='md'>
            <Grid className="display-flex flex-column" mobile={{ col: 12 }} tablet={{ col: 6 }}>
              <Label htmlFor="first_name">First Name</Label>
              <TextInput
                className="maxw-full"
                type="text"
                id="first_name"
                placeholder="--"
                name="first_name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </Grid>

            <Grid className="display-flex flex-column" mobile={{ col: 12 }} tablet={{ col: 6 }}>
              <Label htmlFor="last_name">Last Name</Label>
              <TextInput
                className="maxw-full"
                type="text"
                id="last_name"
                placeholder="--"
                name="last_name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </Grid>
          </Grid>

          <Grid className="display-flex flex-column" row>
            <Label htmlFor="email_address">Email Address</Label>
            <TextInput
              className="maxw-full"
              type="email"
              id="email_address"
              placeholder="--"
              name="email_address"
              value={emailAddress}
              onChange={(e) => setEmailAddress(e.target.value)}
            />
          </Grid>

          <ButtonGroup className='margin-top-2'>
            <Button type='button' onClick={handleAddOrUpdateContributor}>{editingIndex !== null ? 'Update' : 'Add'}</Button>
            <Button
              type='button'
              unstyled
              className='padding-x-2'
              onClick={() => {
                setFirstName('');
                setLastName('');
                setEmailAddress('');
                setEditingIndex(null);
                dispatch(setIsAddingContributor(false));
              }}
            >
              Cancel
            </Button>
          </ButtonGroup>
        </GridContainer>
      )}

      {ownerTableRows.length > 0 && (
        <>
          <h2>Owners</h2>
          <p>Your firm must be at least 51% owned by one or more economically disadvantaged individuals to qualify for the SBA program. If you do not own 51% or more of the firm, send the other owner(s) who are claiming economic disadvantage an invitation to submit their information and questionnaire.</p>
          <p>Note: An individual can only claim disadvantage for SBA certification once in their lifetime. If you own 51% or more of the firm, the other owner(s) do not need to submit their information and questionnaire</p>
          <CustomTable
            header={tableHeaders}
            rows={ownerTableRows}
            editable={true}
            remove={true}
            onEdit={handleEditOwner}
            onDelete={(index) => handleDeleteContributor(index, 'role_owner')}
          />
        </>
      )}

      {spouseTableRows.length > 0 && (
        <>
          <h2>Spouses</h2>
          <p>If your spouse is a key employee, officer, or holds more than 20% interest in your company, they must register as a Nondisadvantaged applicant as well as your spouse.</p>
          <CustomTable
            header={tableHeaders}
            rows={spouseTableRows}
            editable={true}
            remove={true}
            onEdit={handleEditSpouse}
            onDelete={(index) => handleDeleteContributor(index, 'role_spouse')}
          />
        </>
      )}

      {operatorTableRows.length > 0 && (
        <>
          <h2>Control and Operation</h2>
          <p>Each of the following people involved with your firm must submit their information and questionnaire.</p>
          <ul>
            <li>Everyone who owns at least 20% of your firm</li>
            <li>Officers</li>
            <li>Directors</li>
            <li>Board members</li>
            <li>Managers</li>
            <li>Partners</li>
          </ul>

          <CustomTable
            header={tableHeaders}
            rows={operatorTableRows}
            editable={true}
            remove={true}
            onEdit={handleEditOther}
            onDelete={(index) => handleDeleteContributor(index, 'role_other')}
          />
        </>
      )}
      {contributors.length > 0 && (
        <div className="margin-left-auto">
          <Button type="button" outline onClick={handleAddNew}>
          Invite Spouses
          </Button>
        </div>
      )}
      <div className='flex-fill'></div>

      <ButtonGroup className='display-flex flex-justify border-top padding-y-2 margin-top-2 margin-right-2px'>
        <Link className='usa-button usa-button--outline' aria-disabled={!applicationId} href={
					 buildRoute(APPLICATION_STEP_ROUTE, {
            applicationId: applicationId,
            stepLink: applicationSteps.documentUpload.link
          })
        }>
          Previous
        </Link>
        {contributors.length === 0
          ? (
            <Link className='usa-button' aria-disabled={!applicationId} href={
              buildRoute(APPLICATION_STEP_ROUTE, {
                applicationId: applicationId,
                stepLink: applicationSteps.sign.link
              })
            }>
          		Next
        		</Link>
          ): (
            <Button type='button' onClick={handleNextClick}>
							Next
            </Button>
          )
        }
      </ButtonGroup>
    </>
  );
}
export default ContributorInvitation
