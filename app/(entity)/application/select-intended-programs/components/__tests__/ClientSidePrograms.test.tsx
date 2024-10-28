import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom';
import ClientSidePrograms from '../ClientSidePrograms';

// Example interfaces (simplified)
interface ProgramOption {
  id: number;
  name: string;
  description: string;
  details: string;
  disadvantages: string[];
  registration: boolean;
}

interface Application {
  id: number;
  entity: EntitiesType;
  sam_entity: string;
  application_type: string;
  workflow_state: string;
  owner_user_id: number;
}

interface EntitiesType {
  id: number;
  sam_entity: string;
  type: string;
  structure: string;
  owner_user_id: number;
}

const mockProgramOptions: ProgramOption[] = [
  {
    id: 1,
    name: 'Program 1',
    description: 'Description for Program 1',
    details: 'Details for Program 1',
    disadvantages: ['Disadvantage 1', 'Disadvantage 2'], // Must be an array of strings
    registration: true
  },
  {
    id: 2,
    name: 'Program 2',
    description: 'Description for Program 2',
    details: 'Details for Program 2',
    disadvantages: ['Disadvantage 1', 'Disadvantage 2'], // Must be an array of strings
    registration: false
  }
];

const mockApplications: Application[] = [
  {
    id: 1,
    entity: {
      id: 1,
      sam_entity: 'SAM001',
      type: 'Corporation',
      structure: 'LLC',
      owner_user_id: 1001
    },
    sam_entity: 'SAM001',
    application_type: 'Loan',
    workflow_state: 'draft',
    owner_user_id: 1001
  }
];

const mockEntities: EntitiesType[] = [
  {
    id: 1,
    sam_entity: 'SAM001',
    type: 'Corporation',
    structure: 'LLC',
    owner_user_id: 1001
  }
];

describe('ClientSidePrograms Component', () => {

  it('renders the programs and allows program selection', () => {
    render(
      <ClientSidePrograms
        entityId="1"
        initialSelectedPrograms={[]}
        sbaProgramOptions={mockProgramOptions}
        applicationData={mockApplications}
        entityData={mockEntities}
      />
    );

    // Check that the program cards are rendered
    mockProgramOptions.forEach((program) => {
      expect(screen.getByText(program.name)).toBeInTheDocument();
    });

    // Simulate clicking a checkbox
    const checkbox = screen.getAllByRole('checkbox')[0];
    fireEvent.click(checkbox);
    expect(checkbox).toBeChecked();
  });

  it('disables actions when the session user does not match the owner', () => {
    render(
      <ClientSidePrograms
        entityId="1"
        initialSelectedPrograms={[]}
        sbaProgramOptions={mockProgramOptions}
        applicationData={mockApplications}
        entityData={mockEntities}
      />
    );

    const nextButton = screen.getByRole('button', { name: /Next/i });
    expect(nextButton).toBeDisabled();  // Assuming the button should be disabled based on user logic
  });
});