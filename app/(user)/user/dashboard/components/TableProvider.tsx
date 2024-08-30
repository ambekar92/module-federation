'use client'

import { ModalRef } from '@trussworks/react-uswds';
import { useRouter } from 'next/navigation';
import { Role } from '@/app/shared/types/role';

import React, { useEffect, useRef, useState } from 'react';

import ReassignUserModal from '@/app/(evaluation)/components/modals/reassign-user-modal/ReassignUserModal';
import { ReassignType } from '@/app/(evaluation)/components/modals/reassign-user-modal/types';
import { useSessionUCMS } from '@/app/lib/auth';
import { FormProvider, useForm } from 'react-hook-form';
import { DashboardSearchParams } from '../types';
import Header from './Header';
import TableContent from './TableContent';
import { isRole } from '@/middleware';

const TableProvider: React.FC<{searchParams: DashboardSearchParams}> = ({ searchParams }) => {
  const sessionData = useSessionUCMS();
  const router = useRouter();
  const modalRef = useRef<ModalRef | null>(null);
  const [isClient, setIsClient] = useState(false);

  const methods = useForm({
    defaultValues: {
      userId: sessionData.data?.user_id,
    },
  });

  useEffect(() => {
    setIsClient(true);
  }, []);

  function onReassign(applicationId: number) {
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
      <Header />

      <TableContent
        searchParams={searchParams}
        onReassign={onReassign}
      />

      <ReassignUserModal
        modalRef={modalRef}
        reassignType={ReassignType.REASSIGN_ANALYST}
        applicationId={Number(searchParams.application_id)}
      />
    </FormProvider>
  );
};

export default TableProvider;
