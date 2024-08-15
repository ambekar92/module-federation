'use client'

import React, { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ModalRef } from '@trussworks/react-uswds';

import ReassignUserModal from '@/app/(evaluation)/components/modals/reassign-user-modal/ReassignUserModal';
import { ReassignType } from '@/app/(evaluation)/components/modals/reassign-user-modal/types';
import { useSessionUCMS } from '@/app/lib/auth';
import { Role } from '@/app/shared/types/role';
import { isRole } from '@/middleware';
import { DashboardSearchParams, IColumn, supervisorColumns, userColumns } from '../types';
import Header from './Header';
import { useCurrentPath } from '../hooks/useCurrentPath';
import TableContent from './TableContent';
import { UserTaskDashboard } from '@/app/services/types/evaluation-service/UserTaskDashboard';

const TableProvider: React.FC<{searchParams: DashboardSearchParams, tasks: UserTaskDashboard[] | undefined}> = ({ searchParams, tasks }) => {
  const sessionData = useSessionUCMS();
  const { isReviewersDashboard } = useCurrentPath();
  const [columns, setColumns] = useState<IColumn[]>(isReviewersDashboard ? supervisorColumns : userColumns);
  const router = useRouter();
  const modalRef = useRef<ModalRef | null>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!sessionData.data) {return;}
    if (isRole(sessionData.data.permissions, Role.EXTERNAL)) {
      setColumns(userColumns);
    } else {
      setColumns(supervisorColumns);
    }
  }, [sessionData, sessionData?.data?.permissions?.length]);

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
    <div>
      <Header />
      {tasks && (
        <TableContent
          tasks={tasks}
          columns={columns}
          searchParams={searchParams}
          sessionData={sessionData.data}
          onReassign={onReassign}
        />
      )}
      <ReassignUserModal
        modalRef={modalRef}
        reassignType={ReassignType.REASSIGN_ANALYST}
        applicationId={Number(searchParams.application_id)}
      />
    </div>
  );
};

export default TableProvider;
