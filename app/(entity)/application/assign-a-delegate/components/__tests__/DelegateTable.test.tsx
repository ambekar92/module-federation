import React from 'react';
import { render, screen } from '@testing-library/react';
import DelegateTable from '../DelegateTable';
import { useFormSelector } from '../../store/hooks';

// Mocking the useFormSelector to provide mock data
jest.mock('../../store/hooks', () => ({
  useFormSelector: jest.fn(),
}));

describe('DelegateTable Component', () => {
  beforeEach(() => {
    // Resetting mocks before each test
    jest.clearAllMocks();
  });

  it('renders the table with correct headers', () => {
    // Mocking the delegates data
    (useFormSelector as jest.Mock).mockReturnValue({
      delegates: [],
    });

    render(<DelegateTable />);

    // Check for table headers
    expect(screen.getByText('First Name')).toBeInTheDocument();
    expect(screen.getByText('Last Name')).toBeInTheDocument();
    expect(screen.getByText('Email')).toBeInTheDocument();
    expect(screen.getByText('Status')).toBeInTheDocument();
  });

  it('renders the table with delegate data', () => {
    // Mocking the delegates data
    const mockDelegates = [
      { firstName: 'John', lastName: 'Doe', email: 'john.doe@example.com', status: 'Active' },
      { firstName: 'Jane', lastName: 'Smith', email: 'jane.smith@example.com', status: null },
    ];

    (useFormSelector as jest.Mock).mockReturnValue({
      delegates: mockDelegates,
    });

    render(<DelegateTable />);

    // Check if the rows render the delegate data correctly
    expect(screen.getByText('John')).toBeInTheDocument();
    expect(screen.getByText('Doe')).toBeInTheDocument();
    expect(screen.getByText('john.doe@example.com')).toBeInTheDocument();
    expect(screen.getByText('Active')).toBeInTheDocument();

    expect(screen.getByText('Jane')).toBeInTheDocument();
    expect(screen.getByText('Smith')).toBeInTheDocument();
    expect(screen.getByText('jane.smith@example.com')).toBeInTheDocument();
    expect(screen.getByText('Pending')).toBeInTheDocument(); // since status is null
  });

  it('renders empty table when no delegates are provided', () => {
    // Mocking the delegates data
    (useFormSelector as jest.Mock).mockReturnValue({
      delegates: [],
    });

    render(<DelegateTable />);

    // Check if no delegate rows are rendered
    const delegateTable = screen.getByTestId('testid-delegate-table');
    expect(delegateTable).toBeInTheDocument();
    expect(delegateTable.querySelector('tbody').children.length).toBe(0); // No rows
  });
});
