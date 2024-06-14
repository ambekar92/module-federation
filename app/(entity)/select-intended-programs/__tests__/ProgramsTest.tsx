import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Programs from '../components/Programs';
import { sbaProgramOptions } from '../../../constants/sba-programs'; // Adjust the import path as necessary

describe('Select Intended Programs', () => {
  // beforeEach(() => {
  //   render(<Programs />);
  // });

  it('renders all program cards', () => {
    sbaProgramOptions.forEach(option => {
      console.log(">> ", option) ;
      
      expect(screen.getByText(option.name)).toBeInTheDocument();
      expect(screen.getByText(option.description)).toBeInTheDocument();
      expect(screen.getByText(option.details)).toBeInTheDocument();
    });
  });
  it('toggles program selection on checkbox click', () => {
    sbaProgramOptions.forEach(option => {
      const checkbox = screen.getByLabelText(option.name) as HTMLInputElement;
      expect(checkbox.checked).toBeFalsy();
      userEvent.click(checkbox);
      expect(checkbox.checked).toBeTruthy();
      userEvent.click(checkbox);
      expect(checkbox.checked).toBeFalsy();
    });
  });
});