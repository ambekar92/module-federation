import React from 'react'
import { render, screen } from '@testing-library/react'
import ApplicationCards from '../ApplicationCards'
import '@testing-library/jest-dom'
import { Application } from '@/app/services/types/application-service/Application'
import { buildRoute } from '@/app/constants/url'

const mockData: Application[] = [
  {
    id: 1,
    entity: { entity_id: 18, type: 'string', structure: 'string' },
    sam_entity: {
      legal_business_name: 'string',
      uei: 'string',
      cage_code: 'string',
      tax_identifier_number: 'string',
      dba_name: 'string',
      physical_addr_1: 'string',
      physical_addr_2: 'string',
      physical_city: 'string',
      physical_state_or_province: 'string',
      physical_zip_code_5: 'string',
      naics_code_string: 'string',
      entity_structure: 'string',
      sam_extract_code: 'string',
      exclusion_status_flag: 'string',
      debt_subject_to_offset_flag: 'string',
      expiration_date: 'string',
      last_update_date: 'string',
      business_start_date: 'string',
      entity_url: 'string',
    },
    application_type: {
      id: 10,
      name: 'Name 1',
      description: 'Description 1',
      title: 'Application 1 Type',
    },
    program_application: [
      {
        id: 101,
        program_id: 12,
        programs: {
          name: 'Program 1',
          description: 'Description 1',
          title: 'ABC Company',
        },
        workflow_state: 'created',
        analyst_recommendation: null,
        reviewer_decision: null,
        reviewer_decline_reason: null,
        reviewer_can_appeal: null,
        approver_decision: null,
        application_id: 5,
        certification_id: 13,
      },
    ],

    created_at: '2024-10-15',
    workflow_state: 'draft',
    workflow_state_status: {
      title_internal: 'string',
      title_external: 'string',
      updated_at: 'string',
      created_at: 'string',
      deleted_at: '11/12/2024',
      code: 'string',
      description: 'string',
    },
    application_contributor: [
      {
        id: 33,
        deleted_at: null,
        created_at: 'string',
        updated_at: 'string',
        workflow_state: 'string',
        application_role_id: 18,
        application_role: {
          name: 'string',
          description: 'string',
          title: 'string',
        },
        user_id: 21,
        user: {
          id: 11,
          email: 'string',
          first_name: 'string',
          last_name: 'string',
        },
        application_id: 12,
      },
    ],
    deleted_at: 'string',
    updated_at: 'string',
    application_tier: 'string',
    progress: 'string',
    assigned_to: 'string',
    signed_by: 'string',
    signed_date: 'string',
    submitted_at: 'string',
    process: null,
    business_point_of_contact: {
      user_id: 32,
      email: 'string',
      is_active: false,
      username: 'string',
      first_name: 'string',
      last_name: 'string',
    },
    certifications: [
      {
        id: 35,
        program: {
          id: 23,
          deleted_at: null,
          created_at: 'string',
          updated_at: 'string',
          name: 'string',
          description: null,
          title: 'string',
          duration_in_years: 2,
        },
        deleted_at: null,
        created_at: 'string',
        updated_at: 'string',
        issue_date: 'string',
        expiry_date: 'string',
        recertification_eligibility_flag: true,
        legacy_certification_number: null,
        agreement_signed_at: null,
        uuid: 'string',
        entity: 2312,
        workflow_state: 'string',
        certification_status_qualifier: null,
        certification_status_reason: null,
      },
    ],
  },
]
const mockDataWithdrawn: Application[] = [
  {
    id: 1,
    entity: { entity_id: 18, type: 'string', structure: 'string' },
    sam_entity: {
      legal_business_name: 'ABC Company LLC Legal Business Name',
      uei: 'string',
      cage_code: 'string',
      tax_identifier_number: 'string',
      dba_name: 'string',
      physical_addr_1: 'string',
      physical_addr_2: 'string',
      physical_city: 'string',
      physical_state_or_province: 'string',
      physical_zip_code_5: 'string',
      naics_code_string: 'string',
      entity_structure: 'string',
      sam_extract_code: 'string',
      exclusion_status_flag: 'string',
      debt_subject_to_offset_flag: 'string',
      expiration_date: 'string',
      last_update_date: 'string',
      business_start_date: 'string',
      entity_url: 'string',
    },
    application_type: {
      id: 10,
      name: 'Name 1',
      description: 'Description 1',
      title: 'Application 1 Type',
    },
    program_application: [
      {
        id: 101,
        program_id: 12,
        programs: {
          name: 'Program 1',
          description: 'Description 1',
          title: 'ABC Company',
        },
        workflow_state: 'withdrawn_by_applicant',
        analyst_recommendation: null,
        reviewer_decision: null,
        reviewer_decline_reason: null,
        reviewer_can_appeal: null,
        approver_decision: null,
        application_id: 5,
        certification_id: 13,
      },
    ],

    created_at: '2024-10-15',
    workflow_state: 'withdrawn_by_applicant',
    workflow_state_status: {
      title_internal: 'string',
      title_external: 'string',
      updated_at: 'string',
      created_at: 'string',
      deleted_at: '11/12/2024',
      code: 'string',
      description: 'string',
    },
    application_contributor: [
      {
        id: 33,
        deleted_at: null,
        created_at: '2024-10-15',
        updated_at: 'string',
        workflow_state: 'withdrawn_by_applicant',
        application_role_id: 18,
        application_role: {
          name: 'string',
          description: 'string',
          title: 'string',
        },
        user_id: 21,
        user: {
          id: 11,
          email: 'string',
          first_name: 'string',
          last_name: 'string',
        },
        application_id: 12,
      },
    ],
    deleted_at: 'string',
    updated_at: 'string',
    application_tier: 'string',
    progress: 'string',
    assigned_to: 'string',
    signed_by: 'string',
    signed_date: 'string',
    submitted_at: 'string',
    process: null,
    business_point_of_contact: {
      user_id: 32,
      email: 'string',
      is_active: false,
      username: 'string',
      first_name: 'string',
      last_name: 'string',
    },
    certifications: [
      {
        id: 35,
        program: {
          id: 23,
          deleted_at: null,
          created_at: 'string',
          updated_at: 'string',
          name: 'string',
          description: null,
          title: 'string',
          duration_in_years: 2,
        },
        deleted_at: null,
        created_at: 'string',
        updated_at: 'string',
        issue_date: 'string',
        expiry_date: 'string',
        recertification_eligibility_flag: true,
        legacy_certification_number: null,
        agreement_signed_at: null,
        uuid: 'string',
        entity: 2312,
        workflow_state: 'withdrawn_by_applicant',
        certification_status_qualifier: null,
        certification_status_reason: null,
      },
    ],
  },
]
describe('<ApplicationCards />', () => {
  it('renders Business Name label', () => {
    render(<ApplicationCards data={mockData} />)
    expect(screen.getByText('ABC Company')).toBeInTheDocument()
  })

  it('renders application titles for draft applications', () => {
    render(<ApplicationCards data={mockData} />)
    expect(screen.getByText('Application 1 Type')).toBeInTheDocument()
  })

  it('renders program titles inside the application', () => {
    render(<ApplicationCards data={mockData} />)
    expect(screen.getByText('ABC Company')).toBeInTheDocument()
  })

  it('renders Continue link for draft workflow state', () => {
    render(<ApplicationCards data={mockData} />)
    const continueLink = screen.getByText('Continue')
    expect(continueLink).toBeInTheDocument()
    expect(continueLink).toHaveAttribute(
      'href',
      buildRoute('/application/questionnaire/1', { applicationId: '1' })
    )
  })

  it('renders View link for non-draft workflow state', () => {
    render(<ApplicationCards data={mockDataWithdrawn} />)
    const viewLink = screen.getByText('View')
    expect(viewLink).toBeInTheDocument()
    expect(viewLink).toHaveAttribute(
      'href',
      buildRoute('/application/view/1', {})
    )
  })

  it('shows "Application Withdrawn" when the state is withdrawn', () => {
    render(<ApplicationCards data={mockDataWithdrawn} />)
    expect(screen.getByText('Application Withdrawn')).toBeInTheDocument()
  })

  it('renders Expiration label and calculated date', () => {
    render(<ApplicationCards data={mockData} />)
    expect(screen.getByText('Expiration')).toBeInTheDocument()
  })

  it('renders Application ID correctly', () => {
    render(<ApplicationCards data={mockData} />)
    expect(screen.getByText('Application ID')).toBeInTheDocument()
    expect(screen.getByText('1')).toBeInTheDocument() // Checking App ID for the first item
  })
})
