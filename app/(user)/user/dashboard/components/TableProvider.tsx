'use client'

import { Role } from '@/app/shared/types/role';
import { Grid, ModalRef } from '@trussworks/react-uswds';
import { useRouter } from 'next/navigation';

import { ReassignType } from '@/app/(evaluation)/components/modals/reassign-user-modal/types';
import { useSessionUCMS } from '@/app/lib/auth';
import { isRole } from '@/middleware';
import React, { useEffect, useRef, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useIsReviewersDashboard } from '../hooks/useIsReviewersDashboard';
import { DashboardSearchParams } from '../types';
import HeaderOverview from './HeaderOverview';
import ReassignTeamModal from './modal/ReassignTeamModal';
import TableContent from './TableContent';

const TableProvider: React.FC<{searchParams: DashboardSearchParams}> = ({ searchParams }) => {
  const sessionData = useSessionUCMS();
  const router = useRouter();
  const modalRef = useRef<ModalRef | null>(null);
  const [isClient, setIsClient] = useState(false);
  const [modalParams, setModalParams] = useState(searchParams);
  const isReviewersDashboard = useIsReviewersDashboard();

  const methods = useForm({
    defaultValues: {
      userId: sessionData.data?.user_id,
      selectedRole: '',
    },
  });

  const { watch } = methods;
  const selectedRole = watch('selectedRole');

  useEffect(() => {
    setIsClient(true);
  }, []);

  function onReassign(applicationId: number, currentUserId: string | number | null, userRole: string | null) {
    const newModalParams = {
      ...modalParams,
      application_id: applicationId.toString(),
      current_user_id: currentUserId?.toString(),
      user_role: selectedRole
    };
    setModalParams(newModalParams);
    const currentUrl = new URL(window.location.href);
    currentUrl.searchParams.set('application_id', applicationId.toString());
    router.push(currentUrl.toString(), {scroll: false});
    modalRef.current?.toggleModal();
  }

  if (!isClient) {
    return null;
  }

  if (!sessionData.data || isRole(sessionData.data?.permissions, Role.EXTERNAL)) {
    return null;
  }

  return (
    <FormProvider {...methods}>
      <Grid className="mobile:grid-col-12 desktop:grid-col-12 border-bottom-1px display-flex flex-align-center flex-row flex-justify">
        <h2 className='margin-right-2'>
          {!isReviewersDashboard ? 'My Tasks' : 'Analyst Overview'}
        </h2>
      </Grid>
      {isReviewersDashboard && <HeaderOverview />}
      <TableContent
        searchParams={searchParams}
        onReassign={onReassign}
      />
      <ReassignTeamModal
        modalRef={modalRef}
        reassignType={ReassignType.REASSIGN_ANALYST}
        applicationId={Number(modalParams.application_id)}
        user_id={Number(modalParams.current_user_id)}
        current_user_role={modalParams.user_role}
      />
    </FormProvider>
  );
};

export default TableProvider;
