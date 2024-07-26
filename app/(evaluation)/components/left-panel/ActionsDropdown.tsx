'use client'
import ActionMenuModal from '@/app/shared/components/modals/ActionMenuModal'
import React, { useMemo, useRef, useState } from 'react';
import ActionMenuData from '../utils/actionMenuData.json'
import { useSessionUCMS } from '@/app/lib/auth';
import { Role } from '@/app/shared/types/role';
import RequestExpertModal from '../modals/RequestExpertModal';

const ActionsDropdown = () => {
  const sessionData = useSessionUCMS();
  const selectRef = useRef<HTMLSelectElement>(null);
  const [showModal, setShowModal] = useState(false);
  const [actionModalProps, setActionModalProps] = useState({
    title: '',
    actionLabel: '',
    userIdType: '',
    modalType: 'default',
    description: '',
    inputDescription: '',
    steps: [],
    id: 0,
    table: {
      step: -1,
      tableHeader: [],
      tableRows: [],
    },
    signature: {
      step: -1,
      description: '',
    },
    upload: false,
    uploadStep: -1,
    notes: {
      step: -1,
      rows: [],
    },
    approvalLetter: {
      step: -1,
      rows: [],
    },
  });

  const handleAction = () => {
    setShowModal(false)
  }

  const resetModalType = () => {
    setActionModalProps(prevState => ({
      ...prevState,
      modalType: 'default'
    }));
  };

  const handleCancel = () => {
    setShowModal(false);
    resetModalType();
    if (selectRef.current) {
      selectRef.current.selectedIndex = 0;
    }
  };

  const handleActionSelect = (e: any) => {
    /*eslint-disable eqeqeq*/
    const modalProp = ActionMenuData.data.find(
      (item) => item.id == Number(e.target.value),
    ) as any

    if (modalProp) {
      setActionModalProps({
        title: modalProp?.title || '',
        actionLabel: modalProp?.actionLabel || '',
        userIdType: modalProp?.userIdType || '',
        modalType: modalProp?.modalType || 'default',
        description: modalProp?.description || '',
        inputDescription: modalProp?.inputDescription || '',
        steps: modalProp?.steps || [],
        id: modalProp?.id,
        table: {
          step: modalProp?.table?.step,
          tableHeader: modalProp?.table?.tableHeader || [],
          tableRows: modalProp?.table?.tableRows || [],
        },
        signature: {
          step: modalProp?.signature?.step,
          description: modalProp?.signature?.description || '',
        },
        upload: modalProp?.upload,
        uploadStep: modalProp?.uploadStep,
        notes: {
          step: modalProp?.notes.step,
          rows: modalProp?.notes.rows || [],
        },
        approvalLetter: {
          step: modalProp?.approvalLetter.step,
          rows: modalProp?.approvalLetter.rows || [],
        },
      })
      setShowModal(true)
    }
  }

  const filteredActions = useMemo(() => {
    const userPermissions: Role[] = sessionData.data?.permissions?.map(p => p.slug) || [];
    // const userPermissions = ['analyst_low_criteria']

    return ActionMenuData.data.filter(action => {
      if (action.permissions.length === 0) {return true;}

      return action.permissions.some(permission =>
        userPermissions.includes(permission as Role)
      );
    });
  }, [sessionData.data?.permissions]);

  const renderModal = () => {
    switch (actionModalProps.modalType) {
      case 'requestExpert':
        return <RequestExpertModal handleCancel={handleCancel} open={showModal} />
      case 'default':
      case 'textarea':
      case 'confirmVeteranStatus':
      case 'reassign':
        return (
          <ActionMenuModal
            open={showModal}
            title={actionModalProps.title}
            actionLabel={actionModalProps.actionLabel}
            userIdType={actionModalProps.userIdType}
            modalType={actionModalProps.modalType}
            description={actionModalProps.description}
            inputDescription={actionModalProps.inputDescription}
            steps={actionModalProps.steps}
            id={actionModalProps.id}
            table={actionModalProps.table as any}
            signature={actionModalProps.signature}
            upload={actionModalProps.upload}
            uploadStep={actionModalProps.uploadStep}
            notes={actionModalProps.notes as any}
            approvalLetter={actionModalProps.approvalLetter as any}
            handleAction={handleAction}
            handleCancel={handleCancel} process_id={0}
          />
        )
      default:
        return null
    }
  }
  return (
    <div>
      <div className="usa-combo-box margin-bottom-4">
        <select
          className="usa-select"
          name="sort"
          id="sort"
          data-placeholder="sort"
          onChange={handleActionSelect}
          ref={selectRef}
        >
          <option value="">Actions</option>
          {filteredActions.map((item, index) => (
            <option key={`action-menu-option-${index}`} value={item.id}>
              {item.optionLabel}
            </option>
          ))}
        </select>
      </div>
      {renderModal()}
    </div>
  )
}

export default ActionsDropdown
