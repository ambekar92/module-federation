import { INVITATION_ROUTE, QUESTIONNAIRE_ROUTE } from '@/app/constants/local-routes';
import { APPLICATION_STEP_ROUTE, buildRoute } from '@/app/constants/url';
import { useSessionUCMS } from '@/app/lib/auth';
import { InvitationType } from '@/app/services/types/application-service/Application';
import { CustomTable } from '@/app/shared/components/CustomTable';
import Spinner from '@/app/shared/components/spinner/Spinner';
import TooltipIcon from '@/app/shared/components/tooltip/Tooltip';
import { useApplicationContext } from '@/app/shared/hooks/useApplicationContext';
import { useUpdateApplicationProgress } from '@/app/shared/hooks/useUpdateApplicationProgress';
import { Question } from '@/app/shared/types/questionnaireTypes';
import { Role } from '@/app/shared/types/role';
import { Permission } from '@/app/tarmac/types';
import { Button, ButtonGroup, Grid, GridContainer, Label, TextInput } from '@trussworks/react-uswds';
import axios from 'axios';
import { capitalize } from 'lodash';
import Link from 'next/link';
import { useEffect, useMemo, useRef, useState } from 'react';
import useSWR, { mutate } from 'swr';
import InviteContributorModal from '../components/contributor-invite/InviteContributorModal';
import { Contributor } from '../components/contributor-invite/types';
import { useRedirectIfNoOwners } from '../hooks/useRedirectNoOwners';
import { setStep } from '../redux/applicationSlice';
import { useApplicationDispatch } from '../redux/hooks';
import { applicationSteps } from '../utils/constants';
import { convertOperatorAnswerToContributors, convertOwnerAnswerToContributors } from '../utils/convertToContributor';
import { useUserApplicationInfo } from '../utils/useUserApplicationInfo';

function ContributorInvitation() {
  useUpdateApplicationProgress('Contributor Invitation');
  const { applicationId, contributorId, applicationData } = useApplicationContext();
  const ownerEmail = applicationData?.application_contributor[0].user.email;
  const { updateUserApplicationInfo } = useUserApplicationInfo();
  const session = useSessionUCMS();
  const dispatch = useApplicationDispatch();

  const [isAddingContributor, setIsAddingContributor] = useState(false);
  const [contributors, setContributors] = useState<Contributor[]>([]);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [emailAddress, setEmailAddress] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  const initialContributorsRef = useRef<Contributor[]>([]);

  const hasPermission = (permissions: Permission[], targetPermission: string) => {
    return permissions?.some(permission => permission.slug === targetPermission);
  };

  const isQualifyingOwner = hasPermission(session.data?.permissions, Role.QUALIFYING_OWNER) || hasPermission(session.data?.permissions, 'qualifying-owner');
  const isPrimaryQualifyingOwner = hasPermission(session.data?.permissions, Role.PRIMARY_QUALIFYING_OWNER) || hasPermission(session.data?.permissions, 'primary-qualifying-owner');
  const isDelegate = hasPermission(session.data?.permissions, Role.DELEGATE);

  const { data: invitationData, error: invitationError } = useSWR<InvitationType[]>(contributorId ? `${INVITATION_ROUTE}/${contributorId}`: null);
  const { data: operatorData } = useSWR<Question[]>(contributorId ? `${QUESTIONNAIRE_ROUTE}/${contributorId}/control-and-operation` : null);
  const { data: ownerData } = useSWR<Question[]>(applicationData ? `${QUESTIONNAIRE_ROUTE}/${applicationData?.application_contributor[0].id}/owner-and-management` : null);
  const applicationRole = applicationData?.application_contributor.filter(contributor => contributor.id === contributorId);
  useRedirectIfNoOwners({ ownerData, applicationId , applicationRole});

  const is8aOrEdwosb = useMemo(() => applicationData?.program_application?.some(program =>
    program.id === 1 || program.id === 6
  ), [applicationData]);

  useEffect(() => {
    if (contributors.length > 0 && initialContributorsRef.current.length === 0) {
      initialContributorsRef.current = JSON.parse(JSON.stringify(contributors));
    }
  }, [contributors]);

  useEffect(() => {
    dispatch(setStep(applicationSteps.contributorInvitation.stepIndex));
  }, [dispatch]);

  useEffect(() => {
    if (applicationId && applicationData && session.data?.permissions) {
      if (!isPrimaryQualifyingOwner && !isDelegate) {
        window.location.href = buildRoute(APPLICATION_STEP_ROUTE, {
          applicationId,
          stepLink: applicationSteps.sign.link
        });
      } else if (applicationData.workflow_state !== 'draft' && applicationData.workflow_state !== 'returned_to_firm') {
        window.location.href = `/application/view/${applicationId}`;
      }
    }
  }, [applicationData, applicationId, isQualifyingOwner, isPrimaryQualifyingOwner, isDelegate, session.data?.permissions]);

  useEffect(() => {
    if (applicationData && ownerData && ownerData[0]?.answer && ownerData[0]?.answer.value.answer && Array.isArray(ownerData[0]?.answer.value.answer) && ownerData[0]?.answer.value.answer.length > 0) {
      const ownerContributors = convertOwnerAnswerToContributors(ownerData[0].answer, applicationData);
      setContributors(prevContributors => {
        const updatedContributors = [...prevContributors];
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
        return updatedContributors;
      });
    }
  }, [ownerData]);

  useEffect(() => {
    if (operatorData && operatorData[0].answer && operatorData[0].answer.value?.answer && Array.isArray(operatorData[0].answer.value.answer) && operatorData[0].answer.value.answer.length > 0) {
      const operatorContributors = convertOperatorAnswerToContributors(operatorData[0].answer);
      setContributors(prevContributors => {
        const updatedContributors = [...prevContributors];
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
        return updatedContributors;
      });
    }
  }, [operatorData]);

  useEffect(() => {
    if (invitationData && invitationData.length > 0) {
      const apiContributors: Contributor[] = invitationData
        .filter((item: InvitationType) =>
          item.invitation_status !== 'removed' &&
          item.application_role.name !== 'primary-qualifying-owner' &&
          item.application_role.name !== 'delegate' &&
          item.application_role.name !== 'qualifying-owner' &&
          item.application_role.name !== 'non-qualifying-owner' &&
          (isQualifyingOwner ? item.application_role.name === 'spouse-of-qualifying-owner' : true)
        )
        .map((item: InvitationType) => ({
          firstName: item.first_name,
          lastName: item.last_name,
          emailAddress: item.email,
          contributorRole: item.application_role.name === 'spouse-of-qualifying-owner'
            ? 'role_spouse'
            : 'role_other'
        }));

      setContributors(prevContributors => {
        const mergedContributors = [...prevContributors];
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
        return mergedContributors;
      });
    }
  }, [invitationData, isQualifyingOwner]);

  const handleAddNew = () => {
    setIsAddingContributor(true);
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

      // if (emailAddress.toLowerCase() === ownerEmail?.toLowerCase()) {
      //   alert('You cannot add the owner as a contributor.');
      //   return;
      // }

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
        const isDuplicate = contributors.some(
          c => c.emailAddress.toLowerCase() === newContributor.emailAddress.toLowerCase() && c.contributorRole === newContributor.contributorRole
        );
        if (isDuplicate) {
          alert('A contributor with this email and role already exists.');
          return;
        }
        updatedContributors = [...contributors, newContributor];
      }

      setContributors(updatedContributors);
      updateUserApplicationInfo({ contributors: updatedContributors });
      setFirstName('');
      setLastName('');
      setEmailAddress('');
      setIsAddingContributor(false);
    } else {
      alert('Please fill out all required fields.');
    }
  };

  /**
   * Deletes a contributor from the application, given its roleIndex and role.
   * If the contributor has an invitation, it is deleted as well.
   * @param {number} roleIndex - The index of the contributor in the contributors array
   * filtered by role.
   * @param {string} role - The role of the contributor to delete.
   * @throws {Error} If the contributor is not found.
   */
  const handleDeleteContributor = async (roleIndex: number, role: string) => {
    const contributorsOfRole = contributors.filter(c => {
      if (role === 'role_owner') {
        return c.contributorRole === 'role_owner' || c.contributorRole === 'role_owner_eligible';
      }
      return c.contributorRole === role;
    });

    if (roleIndex >= contributorsOfRole.length) {
      throw new Error('Contributor not found');
    }

    const contributorToDelete = contributorsOfRole[roleIndex];

    const invitationToDelete = invitationData?.find(invitation =>
      invitation.email.toLowerCase() === contributorToDelete.emailAddress.toLowerCase()
    );

    if (invitationToDelete) {
      try {
        await axios.delete(`${INVITATION_ROUTE}?invitation_id=${invitationToDelete.id}`);
        const updatedInvitationData = invitationData?.filter(invitation => invitation.id !== invitationToDelete.id);
        mutate(`${INVITATION_ROUTE}/${contributorId}`, updatedInvitationData, false);
      } catch (error) {
        // Error handled
      }
    }

    const updatedContributors = contributors.filter(contributor =>
      !(contributor.emailAddress.toLowerCase() === contributorToDelete.emailAddress.toLowerCase() &&
				(contributor.contributorRole === contributorToDelete.contributorRole ||
				 (role === 'role_owner' && (contributor.contributorRole === 'role_owner' || contributor.contributorRole === 'role_owner_eligible')))
      )
    );

    setContributors(updatedContributors);
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
    setIsAddingContributor(true);
  };

  const handleEditSpouse = (index: number) => {
    const spouses = contributors.filter(contributor => contributor.contributorRole === 'role_spouse');
    const spouse = spouses[index];
    setFirstName(spouse.firstName || '');
    setLastName(spouse.lastName || '');
    setEmailAddress(spouse.emailAddress);
    setEditingIndex(contributors.indexOf(spouse));
    setIsAddingContributor(true);
  };

  const handleEditOther = (index: number) => {
    const others = contributors.filter(contributor => contributor.contributorRole === 'role_other');
    const other = others[index];
    setFirstName(other.firstName || '');
    setLastName(other.lastName || '');
    setEmailAddress(other.emailAddress);
    setEditingIndex(contributors.indexOf(other));
    setIsAddingContributor(true);
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
    { id: 'Status', headerName: 'Invitation Status' },
  ];

  const spouseTableRows = contributors
    .filter(contributor => contributor.contributorRole === 'role_spouse')
    .map((contributor, index) => ({
      id: index,
      Name: `${contributor.firstName} ${contributor.lastName}`,
      Role: roleDisplayName(contributor.contributorRole),
      Email: contributor.emailAddress,
      Status: (() => {
        const status: string = invitationData?.find(
          invitation => invitation.email.toLowerCase() === contributor.emailAddress.toLowerCase() &&
												invitation.application_role.name === 'spouse-of-qualifying-owner'
        )?.invitation_status || 'Unsent';
        return status === 'send' ? 'Sent' : capitalize(status);
      })()
    }));

  const ownerTableRows = contributors
    .filter(contributor =>
      (contributor.contributorRole === 'role_owner' || contributor.contributorRole === 'role_owner_eligible') &&
			contributor.emailAddress.toLowerCase() !== ownerEmail?.toLowerCase()
    )
    .map((contributor, index) => ({
      id: index,
      Name: `${contributor.firstName} ${contributor.lastName}`,
      Role: roleDisplayName(contributor.contributorRole),
      Email: contributor.emailAddress,
      Status: (() => {
        const status: string = invitationData?.find(
          invitation => invitation.email.toLowerCase() === contributor.emailAddress.toLowerCase() &&
												invitation.application_role.name !== 'other-individuals' &&
												invitation.application_role.name !== 'spouse-of-qualifying-owner' &&
												invitation.application_role.name !== 'delegate'
        )?.invitation_status || 'Unsent';
        return status === 'send' ? 'Sent' : capitalize(status);
      })()
    }));

  const operatorTableRows = contributors
    .filter(contributor =>
      contributor.contributorRole === 'role_other' &&
			contributor.emailAddress.toLowerCase() !== ownerEmail?.toLowerCase()
    )
    .map((contributor, index) => ({
      id: index,
      Name: `${contributor.firstName} ${contributor.lastName}`,
      Role: roleDisplayName(contributor.contributorRole),
      Email: contributor.emailAddress,
      Status: (() => {
        const status: string = invitationData?.find(
          invitation => invitation.email.toLowerCase() === contributor.emailAddress.toLowerCase() &&
												invitation.application_role.name === 'other-individuals'
        )?.invitation_status || 'Unsent';
        return status === 'send' ? 'Sent' : capitalize(status);
      })()
    }));

  const closeModal = () => {
    setShowModal(false);
    initialContributorsRef.current = JSON.parse(JSON.stringify(contributors));
  }

  const handleNextClick = () => {
    const allContributors = contributors.filter(
      contributor => contributor.emailAddress.toLowerCase() !== ownerEmail?.toLowerCase()
    );

    if (allContributors.length === 0) {
      window.location.href = buildRoute(APPLICATION_STEP_ROUTE, {
        applicationId: applicationId,
        stepLink: applicationSteps.sign.link
      });
    } else {
      const hasUnsentInvitations = allContributors.some(contributor => {
        let invitation;
        if (contributor.contributorRole === 'role_spouse') {
          invitation = invitationData?.find(
            inv =>
              inv.first_name.toLowerCase() === contributor.firstName?.toLowerCase() &&
							inv.last_name.toLowerCase() === contributor.lastName?.toLowerCase() &&
							inv.application_role.name === 'spouse-of-qualifying-owner'
          );
        } else {
          invitation = invitationData?.find(
            inv => inv.email.toLowerCase() === contributor.emailAddress.toLowerCase()
          );
        }
        return !invitation || invitation.invitation_status === 'unsent' || invitation.invitation_status === 'removed';
      });

      if (hasUnsentInvitations) {
        setShowModal(true);
      } else {
        window.location.href = buildRoute(APPLICATION_STEP_ROUTE, {
          applicationId: applicationId,
          stepLink: applicationSteps.sign.link
        });
      }
    }
  }

  if(invitationError) {
    // Handle error
  }

  if(!ownerData) {
    return <Spinner />
  }
  return (
    <>
      <h1>Contributor Invitations<TooltipIcon text='A contributor may add information to the application; however, the contributor can only see the information he/she is providing. Everyone contributing to your Firm must provide their contribution details before you can submit your Firm’s application.' /></h1>

      {isQualifyingOwner ? (
        <>
          <h3 className="margin-y-0">As a qualifying owner, you can invite your spouse as a contributor.</h3>
          <hr className="margin-y-3 width-full border-base-lightest" />

          {spouseTableRows.length === 0 && (
            <div className="margin-left-auto">
              <Button type="button" outline onClick={handleAddNew}>
								Invite Spouse
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
                <Button type='button' onClick={handleAddOrUpdateContributor}>Add Spouse</Button>
                <Button
                  type='button'
                  unstyled
                  className='padding-x-2'
                  onClick={() => {
                    setFirstName('');
                    setLastName('');
                    setEmailAddress('');
                    setEditingIndex(null);
                    setIsAddingContributor(false);
                  }}
                >
									Cancel
                </Button>
              </ButtonGroup>
            </GridContainer>
          )}

          {spouseTableRows.length > 0 && (
            <>
              <h2>Spouse</h2>
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
        </>
      ) : (
        <>
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
                    setIsAddingContributor(false);
                  }}
                >
									Cancel
                </Button>
              </ButtonGroup>
            </GridContainer>
          )}

          {ownerTableRows.length > 0 && (
            <>
              <h2>Owners<TooltipIcon text='An applicant or Participant must be at least 51 percent unconditionally and directly owned by one or more socially and economically disadvantaged individuals who are citizens of the United States, except for concerns owned by Indian tribes, Alaska Native Corporations, Native Hawaiian Organizations, or Community Development Corporations.' /></h2>
              {
                is8aOrEdwosb ? (
                  <>
                    <p>Your firm must be at least 51% owned by one or more economically disadvantaged individuals to qualify for the SBA program. If you do not own 51% or more of the firm, send the other owner(s) who are claiming economic disadvantage an invitation to submit their information and questionnaire.</p>
                    <p>Note: An individual can only claim disadvantage for SBA certification once in their lifetime. If you own 51% or more of the firm, the other owner(s) do not need to submit their information and questionnaire</p>
                  </>
                )
                  : (
                    <p>Each person you invite to contribute will receive an email with instructions for creating their profile and submitting their information.</p>
                  )
              }
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
        </>
      )}
      <InviteContributorModal
        contributors={contributors}
        open={showModal}
        handleCancel={closeModal}
        contributorId={contributorId}
        applicationId={applicationId}
        entityId={applicationData?.entity.entity_id}
        invitationData={invitationData}
      />
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
        <Button type='button' onClick={handleNextClick}>
          Next
        </Button>
      </ButtonGroup>
    </>
  );
}
export default ContributorInvitation
