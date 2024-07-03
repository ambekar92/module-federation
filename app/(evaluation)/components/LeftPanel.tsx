'use client'
import { QUESTIONNAIRE_LIST_ROUTE } from '@/app/constants/routes'
import { fetcherGET } from '@/app/services/fetcher'
import { Link } from '@trussworks/react-uswds'
import { useParams, usePathname, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import useSWR from 'swr'
import ActionMenuModal from '../../shared/components/modals/ActionMenuModal'
import { Params, QuestionnaireItem } from '../types/types'
import ActionMenuData from './utils/actionMenuData.json'
import MenuData from './utils/menuData.json'
import { useApplicationData } from '../firm/useApplicationData'

function LeftPanel() {
  const [showModal, setShowModal] = useState(false)
const {applicationData} = useApplicationData();

  const [actionModalProps, setActionModalProps] = useState({
    title: '',
    actionLabel: '',
    userIdType: '',
    modalType: 'default',
    description: '',
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
  const [questionnaireItems, setQuestionnaireItems] = useState<{section: string, child: QuestionnaireItem[]}[]>([]);
  const [activeSection, setActiveSection] = useState<string>('');
  const [activeTitle, setActiveTitle] = useState('');
  const router = useRouter();
  const params = useParams<Params>();
  const pathname = usePathname();

  const handleAction = () => {
    setShowModal(false)
  }

  const handleCancel = () => {
    setShowModal(false)
  }

  const {data: navItems , isLoading} = useSWR<QuestionnaireItem[]>(`${QUESTIONNAIRE_LIST_ROUTE}/${params.application_id}`, fetcherGET);

  useEffect(() => {
    const sectionItemsMap = new Map<string, QuestionnaireItem[]>();
    if (navItems) {
      for (const item of navItems) {
        if (!sectionItemsMap.has(item.section)) {
          sectionItemsMap.set(item.section, [])
        } 
        sectionItemsMap.get(item.section)!.push(item)
      }
    }
    const sectionItems = Array.from(sectionItemsMap.entries()).map(([sectionName, items]) => ({section: sectionName, child: items})) // [sectionName, [items]]
    setQuestionnaireItems(sectionItems);
  }, [navItems])

  useEffect(() => {
    if (!navItems) return;
    const currentSection = navItems.find(item => item.url.includes(params.section_questions));
    if (currentSection) {
      setActiveSection(currentSection.section);
      setActiveTitle(currentSection.title);
    }
  }, [pathname])

  useEffect(() => {
    if (activeSection || activeTitle) return;
    if (!navItems) return;
    const currentSection = navItems.find(item => item.url.includes(params.section_questions));
    if (currentSection) {
      setActiveSection(currentSection.section);
      setActiveTitle(currentSection.title);
    }
  }, [activeSection, activeTitle, navItems])

  function onNavLinkClick(e: any, item: QuestionnaireItem) {
    e.preventDefault();
    router.push(`../${item.url}`);
    setActiveSection(item.section);
    setActiveTitle(item.title);
  }

  const handleActionSelect = (e: Event) => {
    /*eslint-disable eqeqeq*/
    const modalProp = ActionMenuData.data.find(
      (item) => item.id == Number(e.target?.value),
    )

    if (modalProp) {
      setActionModalProps({
        title: modalProp?.title || '',
        actionLabel: modalProp?.actionLabel || '',
        userIdType: modalProp?.userIdType || '',
        modalType: modalProp?.modalType || 'default',
        description: modalProp?.description || '',
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

  return (
    <>
      <ActionMenuModal
        open={showModal}
        title={actionModalProps.title}
        actionLabel={actionModalProps.actionLabel}
        userIdType={actionModalProps.userIdType}
        modalType={actionModalProps.modalType}
        description={actionModalProps.description}
        steps={actionModalProps.steps}
        id={actionModalProps.id}
        table={actionModalProps.table}
        tableRows={actionModalProps.tableRows}
        signature={actionModalProps.signature}
        upload={actionModalProps.upload}
        uploadStep={actionModalProps.uploadStep}
        notes={actionModalProps.notes}
        approvalLetter={actionModalProps.approvalLetter}
        handleAction={handleAction}
        handleCancel={handleCancel}
      />
      <div className="grid-container margin-top-2">
        <h2 className="margin-top-0">{applicationData?.sam_entity?.legal_business_name ?? 'N/A'}</h2>
        <div className="margin-top-1">
          {' '}
          <span className="text-bold margin-right-1">UEI</span>{' '}
          <span>{applicationData?.sam_entity?.uei ?? 'N/A'}</span>{' '}
        </div>
        <div className="margin-top-1">
          {' '}
          <span className="text-bold margin-right-1">Certification</span>{' '}
          {/* TODO not clear what key maps to this value in Application type*/}
          <span>{'N/A'}</span>{' '} 
        </div>
        <div className="margin-top-1 margin-bottom-3">
          {' '}
          <span className="usa-tag margin-top-2">Entity Owned</span>
        </div>
        <div className="usa-combo-box margin-bottom-4">
          <select
            className="usa-select"
            name="sort"
            id="sort"
            data-placeholder="sort"
            onChange={(e) => {
              handleActionSelect(e)
            }}
          >
            <option>Actions</option>
            {ActionMenuData.data.map((item, index) => {
              return (
                <option key={`action-menu-option-${index}`} value={item.id}>
                  {item.optionLabel}
                </option>
              )
            })}
          </select>
        </div>
      </div>
      <div className="grid-container">
        <nav aria-label="Side navigation">
          {isLoading && <div>Loading...</div>}
          {!isLoading && <ul className="usa-sidenav">
            
            {[...questionnaireItems, ...MenuData].map((item, index) => {
              if (item.child.length > 0) {
                return (
                  <ul key={index}>
                    <li style={{listStyle: 'none'}} className="usa-sidenav__item">
                      <Link onClick={(e) => onNavLinkClick(e, item.child[0])} href={`../${item.child[0].url}`} className={item.section === activeSection ? "usa-current" : ''}>{item.section}</Link>
                      <ul className="usa-sidenav__sublist">
                        {item.child.map((childItem, index1) => {
                          return (
                            <div key={index1}>
                              <li className="usa-sidenav__item">
                                <Link onClick={(e) => onNavLinkClick(e, childItem)} href={`../${childItem.url}`} className={childItem.title === activeTitle ? "usa-current" : ''}>{childItem.title}</Link>
                              </li>
                            </div>
                          )
                        })}
                      </ul>
                    </li>
                  </ul>
                )
              } else {
                return (
                  <ul key={index}>
                    <li style={{listStyle: 'none'}} className="usa-sidenav__item">
                      <Link onClick={(e) => onNavLinkClick(e, item as unknown as QuestionnaireItem)} href='#' className={item.section === activeSection ? "usa-current" : ''}>{item.section}</Link>
                    </li>
                  </ul>
                )
              }
            })}
          </ul>}
        </nav>
      </div>
    </>
  )
}

export default LeftPanel
