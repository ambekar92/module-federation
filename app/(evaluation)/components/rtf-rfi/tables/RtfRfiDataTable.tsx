// Todo need to find a better way not to include useApplicationData everywhere to check view permission
'use client'
import { RFI_CANCEL_ROUTE, RFI_ITEMS_ROUTE, RTF_ITEMS_ROUTE } from '@/app/constants/routes'
import { useSessionUCMS } from '@/app/lib/auth'
import { axiosInstance } from '@/app/services/axiosInstance'
import { IRTFItems } from '@/app/services/types/evaluation-service/RTFItems'
import { ReasonCode } from '@/app/services/types/evaluation-service/ReasonCodes'
import { getUserRole } from '@/app/shared/utility/getUserRole'
import { Button, Grid, ModalRef, Table } from '@trussworks/react-uswds'
import { useParams } from 'next/navigation'
import React, { useEffect, useMemo, useRef, useState } from 'react'
import DeleteConfirmationModal from '../../modals/request-info/DeleteConfirmationModal'
import RequestInfoModal from '../../modals/request-info/RequestInfoModal'
import styles from '../RtfRfi.module.scss'
import FinalizeRequestForInformation from '../modals/FinalizeRequestForInformation'
import FinalizeReturnToFirm from '../modals/FinalizeReturnToFirm'
import { useApplicationData } from '@/app/(evaluation)/firm/useApplicationData';
import { ApplicationFilterType } from '@/app/services/queries/application-service/applicationFilters';

export interface ReasonState {
  id: number | null;
  title: string;
}

interface RtfRfiDataTableProps {
  draftData: IRTFItems[] | null;
  reasonCodes: ReasonCode[] | null;
	mutateDraft: () => void;
  mutateRequest: () => void;
}

const RtfRfiDataTable: React.FC<RtfRfiDataTableProps> = ({ draftData, reasonCodes, mutateDraft, mutateRequest }) => {
  const sessionData = useSessionUCMS()
  const params = useParams<{application_id: string}>()
  const { applicationData, mutate } = useApplicationData(ApplicationFilterType.id, params.application_id)
  const userRole = getUserRole(sessionData?.data?.permissions || []);
  const [tableData, setTableData] = useState<IRTFItems[]>([]);
  const [rowId, setRowId] = useState<number | null>(null)
  const [reason, setReason] = useState<ReasonState>({ id: null, title: '' })
  const [explanation, setExplanation] = useState<string>('')

  // Modal Refs
  const requestInfoModalRef = useRef<ModalRef>(null);
  const deleteConfirmationModalRef = useRef<ModalRef>(null);
  const finalizeRequestForInformationRef = useRef<ModalRef>(null);
  const finalizeReturnToFirmRef = useRef<ModalRef>(null);

  useEffect(() => {
    if (draftData) {
      setTableData(draftData)
    }
  }, [draftData])

  const reasonCodeMap = useMemo(() => {
    if (reasonCodes) {
      return reasonCodes.reduce((acc, code) => {
        acc[code.id] = code.title;
        return acc;
      }, {} as Record<number, string>);
    }
    return {};
  }, [reasonCodes]);

  const handleSaveData = async () => {
    try {
      const requestData = {
        id: rowId,
        application_id: params.application_id,
        author_id: sessionData.data?.user_id,
        explanation,
        reason_id: reason.id,
        reason: reason.title
      };

      await axiosInstance.put(userRole === 'screener' ? RTF_ITEMS_ROUTE : RFI_CANCEL_ROUTE, requestData);

      mutateDraft();
      requestInfoModalRef.current?.toggleModal();
    } catch (error) {
      // Error handled lol -KJ
    }
  }

  const handleEdit = (item: IRTFItems) => {
    setReason({
      id: item?.reason?.id || null,
      title: reasonCodeMap[item?.reason?.id] || ''
    });
    setExplanation(item.explanation);
    setRowId(item.id);
    requestInfoModalRef.current?.toggleModal();
    return
  }

  const handleDelete = (id: number) => {
    setRowId(id);
    deleteConfirmationModalRef.current?.toggleModal();
    return;
  }

  const handleDeleteConfirm = async () => {
    try {
      await axiosInstance.delete(`${userRole === 'screener' ? RTF_ITEMS_ROUTE : RFI_ITEMS_ROUTE}?id=${rowId}&author_id=${sessionData.data?.user_id}`);
      mutateDraft(); // Refresh draft data
      deleteConfirmationModalRef.current?.toggleModal();
    } catch (error: any) {
      // Error handled lol -KJ
    }
  }

  const handleFinalize = () => {
    if (userRole === 'screener') {
      finalizeReturnToFirmRef.current?.toggleModal();
      return
    } else {
      finalizeRequestForInformationRef.current?.toggleModal();
      return
    }
  }

  if (!draftData || !reasonCodes) {return <div>Loading...</div>}

  return (
    <>
      <Grid row>
        <div className="width-full">
          <p className="text-bold">Created</p>
          <Table bordered={false} fullWidth>
            <thead>
              <tr>
                <th scope="col">
                  <span>Reason</span>
                </th>
                <th scope="col">
                  <span>Section</span>
                </th>
                <th scope="col">
                  <span>Status</span>
                </th>
                <th scope="col">
                  <span>Action</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {tableData && tableData.length !== 0 && tableData.map((item) => (
                <tr key={item.id}>
                  <td>{item?.reason?.title}</td>
                  <td>{item?.application_section?.title}</td>
                  <td>Created</td>
                  <td>
                    <span
                      style={{marginLeft: 0}}
                      className={`${styles['actionButton']}`}
                      onClick={() => handleEdit(item)}
                    >
                      Edit
                    </span>
                    <span
                      className={`${styles['actionButton']} margin-left-4`}
                      onClick={() => handleDelete(item.id)}
                    >
                      x Delete
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>

        {((userRole === 'screener' && applicationData?.process.data.step === 'screening' && applicationData?.workflow_state === 'under_review') ||
          (userRole === 'analyst' && applicationData?.process.data.step === 'analyst' && applicationData?.process.data?.review_start === true )) && (
          <div className="margin-top-2">
            <Button
              type="button"
              className="float-left usa-button"
              onClick={handleFinalize}
            >
              {userRole === 'screener' ? 'Finalize Return to Business' : 'Finalize Request for Information' }
            </Button>
          </div>)}
      </Grid>

      <RequestInfoModal
        modalRef={requestInfoModalRef}
        userRole={userRole}
        reason={reason}
        setReason={setReason}
        explanation={explanation}
        setExplanation={setExplanation}
        reasonCodes={reasonCodes}
        onSave={handleSaveData}
      />

      <DeleteConfirmationModal
        modalRef={deleteConfirmationModalRef}
        userRole={userRole}
        onDelete={handleDeleteConfirm}
      />

      <FinalizeRequestForInformation
        modalRef={finalizeRequestForInformationRef}
        applicationId={params.application_id}
        tableData={tableData}
        reasonCodeMap={reasonCodeMap}
        mutateDraft={mutateDraft}
        mutateRequest={mutateRequest}
      />

      <FinalizeReturnToFirm
        modalRef={finalizeReturnToFirmRef}
        tableData={tableData}
        reasonCodeMap={reasonCodeMap}
        mutateDraft={mutateDraft}
        mutateRequest={mutateRequest}
      />
    </>
  )
}

export default RtfRfiDataTable
