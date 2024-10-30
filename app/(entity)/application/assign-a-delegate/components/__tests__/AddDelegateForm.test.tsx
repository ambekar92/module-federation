// AddDelegateForm.test.tsx

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import AddDelegateForm from '../AddDelegateForm';

describe('AddDelegateForm Component', () => {

  beforeEach(() => {
    jest.clearAllMocks(); // Clear any previous mocks
  });

  it('renders initial elements without crashing', () => {
    render(<AddDelegateForm />);
    expect(screen.getByText('Are You Assigning A Delegate For This Application?')).toBeInTheDocument();
    expect(screen.getByTestId('testid-yes-radio-button')).toBeInTheDocument();
    expect(screen.getByTestId('testid-no-radio-button')).toBeInTheDocument();
  });

  it('displays delegate form inputs when "Yes" is selected', () => {
    render(<AddDelegateForm />);
    const yesRadio = screen.getByTestId('testid-yes-radio-button');
    fireEvent.click(yesRadio);
    
    // Check if Delegate Form Inputs appear
    expect(screen.getByText('Delegate Form')).toBeInTheDocument(); // Adjust based on actual form labels
  });

  it('does not display delegate form inputs when "No" is selected', () => {
    render(<AddDelegateForm />);
    const noRadio = screen.getByTestId('testid-no-radio-button');
    fireEvent.click(noRadio);
    
    // Confirm that Delegate Form Inputs are not visible
    expect(screen.queryByText('Delegate Form')).not.toBeInTheDocument(); // Adjust based on actual form labels
  });

  it('shows the removal confirmation modal when removing a delegate', () => {
    render(<AddDelegateForm />);
    const noRadio = screen.getByTestId('testid-no-radio-button');
    
    // Simulate "No" selection for removal
    fireEvent.click(noRadio);

    // Check if removal modal appears
    expect(screen.getByText('Are you sure you want to remove the delegate?')).toBeInTheDocument();
  });

  it('closes the removal confirmation modal on cancel', () => {
    render(<AddDelegateForm />);
    const noRadio = screen.getByTestId('testid-no-radio-button');
    
    fireEvent.click(noRadio);

    // Confirm modal appears
    expect(screen.getByText('Are you sure you want to remove the delegate?')).toBeInTheDocument();

    // Simulate cancel action in modal
    const cancelButton = screen.getByText('Cancel');
    fireEvent.click(cancelButton);

    // Confirm modal is closed
    expect(screen.queryByText('Are you sure you want to remove the delegate?')).not.toBeInTheDocument();
  });

  it('navigates to the next step when "Next" is clicked and delegate is assigned', () => {
    render(<AddDelegateForm />);
    const yesRadio = screen.getByTestId('testid-yes-radio-button');
    fireEvent.click(yesRadio);
    
    // Check if the next button appears
    const nextButton = screen.getByText('Next');
    expect(nextButton).toBeInTheDocument();
    
    fireEvent.click(nextButton);
    // You may verify the behavior or function that should happen on "Next" click here
  });
});
