'use client'
import { DRAFT_RTF_ITEMS_ROUTE, RTF_ITEMS_ROUTE } from '@/app/constants/routes'
import { useSessionUCMS } from '@/app/lib/auth'
import { axiosInstance } from '@/app/services/axiosInstance'
import fetcher from '@/app/services/fetcher'
import { IRTFItems } from '@/app/services/types/evaluation-service/RTFItems'
import { REASON_CODE_ROUTE, ReasonCode } from '@/app/services/types/evaluation-service/ReasonCodes'
import useFetchOnce from '@/app/shared/hooks/useFetchOnce'
import { Button, Grid, Table } from '@trussworks/react-uswds'
import dynamic from 'next/dynamic'
import { useParams } from 'next/navigation'
import React, { useEffect, useMemo, useState } from 'react'
import DeleteConfirmationModal from '../modals/request-info/DeleteConfirmationModal'
import RequestInfoModal from '../modals/request-info/RequestInfoModal'
import styles from './ReturnToBusiness.module.scss'

const FinalizeReturnToFirm = dynamic(
  () => import('./modals/FinalizeReturnToFirm'),
  { ssr: false }
)

export interface ReasonState {
  id: number | null;
  title: string;
}

const ReturnToBusinessDataTable: React.FC = () => {
  const sessionData = useSessionUCMS()
  const params = useParams<{application_id: string}>()
  const { data: draftData, error } = useFetchOnce<IRTFItems[]>(`${DRAFT_RTF_ITEMS_ROUTE}/${params.application_id}`, fetcher)
  const { data: reasonCodes, error: reasonError } = useFetchOnce<ReasonCode[]>(REASON_CODE_ROUTE, fetcher)
  const [tableData, setTableData] = useState<IRTFItems[]>([])
  const [rowId, setRowId] = useState<number | null>(null)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [finalizeModal, setFinalizeModal] = useState(false)
  const [reason, setReason] = useState<ReasonState>({ id: null, title: '' })
  const [explanation, setExplanation] = useState<string>('')

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

  const handleEdit = (item: IRTFItems) => {
    setReason({
      id: item.reason,
      title: reasonCodeMap[item.reason] || ''
    });
    setExplanation(item.explanation);
    setRowId(item.id);
    setIsModalOpen(true);
  }

  const handleCloseModal = () => {
    setIsModalOpen(false);
  }

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

      const response = await axiosInstance.put(RTF_ITEMS_ROUTE, requestData);

      if (response.data) {
        const updatedTableData = tableData.map(item =>
          item.id === rowId ? { ...item, reason: response.data.reason_id, explanation: response.data.explanation } : item
        );
        setTableData(updatedTableData);
        setIsModalOpen(false);
      }
    } catch (error: any) {
      // Handle error
    }
  }

  const handleDelete = (id: number) => {
    setRowId(id);
    setIsDeleteModalOpen(true);
  }

  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false);
  }

  const handleDeleteConfirm = async () => {
    try {
      await axiosInstance.delete(`${RTF_ITEMS_ROUTE}?id=${rowId}&author_id=${sessionData.data?.user_id}`);
      const updatedTableData = tableData.filter(item => item.id !== rowId);
      setTableData(updatedTableData);
      setIsDeleteModalOpen(false);
    } catch (error: any) {
      // Handles error lol -KJ
    }
  }

  const handleFinalize = () => {
    setFinalizeModal(true);
  }

  const closeFinalizeModal = () => {
    setFinalizeModal(false);
  }

  const sentData = (data: any) => {
    setFinalizeModal(false);
    // Pending finalize logic here
  }

  if (error || reasonError) {return <div>Failed to load data</div>}
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
                  <span>Explanation</span>
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
              {tableData.map((item) => (
                <tr key={item.id}>
                  <td>{reasonCodeMap[item.reason] || 'Unknown Reason'}</td>
                  <td>{item.explanation}</td>
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

        <div className="margin-top-2">
          <Button
            type="button"
            className="float-left usa-button"
            onClick={handleFinalize}
          >
            {sessionData?.data?.permissions[0]?.slug === 'screener' ||
            sessionData?.data?.permissions[0]?.slug === 'analyst'
              ? 'Finalize RFI'
              : 'Finalize RTF'}
          </Button>
        </div>
      </Grid>

      <RequestInfoModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        reason={reason}
        setReason={setReason}
        explanation={explanation}
        setExplanation={setExplanation}
        reasonCodes={reasonCodes}
        onSave={handleSaveData}
      />

      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={handleCloseDeleteModal}
        onDelete={handleDeleteConfirm}
      />

      <FinalizeReturnToFirm
        open={finalizeModal}
        handleSend={sentData}
        handleCancel={closeFinalizeModal}
        tableData={tableData}
        reasonCodeMap={reasonCodeMap}
      />
    </>
  )
}

export default ReturnToBusinessDataTable
