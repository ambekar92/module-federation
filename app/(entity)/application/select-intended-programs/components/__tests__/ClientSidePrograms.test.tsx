import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ClientSidePrograms from '../ClientSidePrograms';
import '@testing-library/jest-dom';
import { ProgramOption } from '@/app/constants/sba-programs';
import { Application } from '@/app/services/types/application-service/Application';
import { EntitiesType, Entity } from '@/app/shared/types/responses';
import { useRouter } from 'next/router';

interface ClientSideProgramsProps {
  entityId: string
  initialSelectedPrograms: ProgramOption[]
  sbaProgramOptions: ProgramOption[]
  applicationData: Application[] | undefined,
  entityData: EntitiesType | undefined
}

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

describe('ClientSidePrograms Component', () => {
  const mockRouter = { push: jest.fn() };
  (useRouter as jest.Mock).mockReturnValue(mockRouter);

  const mockData: ClientSideProgramsProps = {
    entityId: '1',
    initialSelectedPrograms: [{ id: 1, name: 'Program A', description: '', details: '' } as ProgramOption],
    sbaProgramOptions: [
      {
        id: 1, name: 'Program A', description: 'Description A', details: 'Details A',
        disadvantages: [],
        registration: 'eight_a'
      },
      {
        id: 2, name: 'Program B', description: 'Description B', details: 'Details B',
        disadvantages: [],
        registration: 'eight_a'
      },
    ],
    applicationData: [{ id: 1, workflow_state: 'draft' } as Application],
    entityData: [
      {
        id: 1,
        sam_entity: 'Sample SAM Entity',
        owner_user_id: 123,
        type: 'ExampleType',
      } as unknown as Entity
    ],
  };

  const mockSession = { user_id: 123 };
  const mockToggleModal = jest.fn();

  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('renders the component with no entity data', () => {
    render(<ClientSidePrograms {...mockData} entityData={[]} />);
    expect(screen.getByText(/No entity data/i)).toBeInTheDocument();
  });

  it('renders program cards correctly', () => {
    render(<ClientSidePrograms {...mockData} />);
    const programACard = screen.getByText('Program A');
    const programBCard = screen.getByText('Program B');
    expect(programACard).toBeInTheDocument();
    expect(programBCard).toBeInTheDocument();
  });

  it('checks if the checkbox state changes on click', () => {
    render(<ClientSidePrograms {...mockData} />);
    const checkbox = screen.getByRole('checkbox', { name: /Program A/i });
    expect(checkbox).toBeChecked();

    fireEvent.click(checkbox);
    expect(checkbox).not.toBeChecked();
  });

  it('checks for button disable state when isSubmitting is true', () => {
    render(<ClientSidePrograms {...mockData} />);
    const button = screen.getByRole('button', { name: /Next/i });
    
    fireEvent.click(button);
    expect(button).toBeDisabled();
  });

  it('redirects to ASSIGN_DELEGATE_PAGE on submit when application is in draft', async () => {
    render(<ClientSidePrograms {...mockData} />);
    const button = screen.getByRole('button', { name: /Next/i });

    fireEvent.click(button);
    expect(mockRouter.push).toHaveBeenCalledWith(expect.stringContaining('ASSIGN_DELEGATE_PAGE'));
  });

  it('displays error message in modal on post failure', async () => {
    render(<ClientSidePrograms {...mockData} />);
    const button = screen.getByRole('button', { name: /Next/i });
    fireEvent.click(button);

    expect(screen.getByText('An error occurred')).toBeInTheDocument();
    expect(mockToggleModal).toHaveBeenCalled();
  });
});
