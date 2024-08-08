'use client'

import { useSessionUCMS } from '@/app/lib/auth'
import { ApplicationFilterType } from '@/app/services/queries/application-service/applicationFilters'
import { IRTFRequestItem } from '@/app/services/types/evaluation-service/RTFItems'
import { getUserRole } from '@/app/shared/utility/getUserRole'
import { Grid, ModalRef, Table } from '@trussworks/react-uswds'
import { useParams } from 'next/navigation'
import React, { useMemo, useRef, useState } from 'react'
import { useApplicationData } from '../../../firm/useApplicationData'
import styles from '../RtfRfi.module.scss'
import ViewSentRTFModal from '../modals/ViewSentRTFModal'
import ViewSentRFIModal from '../modals/ViewSentRFIModal'
import { ReasonCode } from '@/app/services/types/evaluation-service/ReasonCodes'

interface SentRtfTableProps {
  requestData: IRTFRequestItem[] | null;
  reasonCodes: ReasonCode[] | undefined;
}

const SentRtfTable: React.FC<SentRtfTableProps> = ({ requestData, reasonCodes }) => {
  const sessionData = useSessionUCMS()
  const params = useParams<{application_id: string}>()
  const userRole = getUserRole(sessionData?.data?.permissions || [])
  const { applicationData } = useApplicationData(ApplicationFilterType.id, params.application_id)
  const [selectedItem, setSelectedItem] = useState<IRTFRequestItem | null>(null);
  const viewSentRTFModalRef = useRef<ModalRef>(null);
  const viewSentRFIModalRef = useRef<ModalRef>(null);

  const handleViewClick = (item: IRTFRequestItem) => {
    setSelectedItem(item);
    if(userRole === 'screener') { viewSentRTFModalRef.current?.toggleModal(); } else{ viewSentRFIModalRef.current?.toggleModal(); }
  };

  const isScreener = userRole === 'screener'
  const getNameText = useMemo(() => (isScreener ? 'Return to Business' : 'Request for Information'), [isScreener])

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      month: '2-digit',
      day: '2-digit',
      year: 'numeric'
    })
  }

  const reasonCodeMap = useMemo(() => {
    if (reasonCodes) {
      return reasonCodes.reduce((acc, code) => {
        acc[code.id] = code.title;
        return acc;
      }, {} as Record<number, string>);
    }
    return {};
  }, [reasonCodes]);
  if (!requestData || !applicationData) {return null;}

  return (
    <Grid row>
      <div className="width-full">
        <p className="text-bold">Sent</p>
        <Table bordered={false} fullWidth>
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Number of Reasons</th>
              <th scope="col">Status</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {requestData.map((item) => (
              <tr key={item.id}>
                <td>{`${applicationData.sam_entity.legal_business_name} - ${getNameText} - ${formatDate(item.opened)}`}</td>
                <td>Contains {item.items.length} {isScreener ? 'RTBs' : 'RFIs'}</td>
                <td>Sent</td>
                <td>
                  <span
                    className={styles.actionButton}
                    onClick={() => handleViewClick(item)}
                    style={{marginLeft: 0}}
                  >
                    View
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
      <ViewSentRTFModal
        selectedItem={selectedItem}
        reasonCodeMap={reasonCodeMap}
        modalRef={viewSentRTFModalRef}
        applicationName={applicationData.sam_entity.legal_business_name}
      />
      <ViewSentRFIModal
        selectedItem={selectedItem}
        reasonCodeMap={reasonCodeMap}
        modalRef={viewSentRFIModalRef}
        applicationName={applicationData.sam_entity.legal_business_name}
      />
    </Grid>
  )
}

export default SentRtfTable
