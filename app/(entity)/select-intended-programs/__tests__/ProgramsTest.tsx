// import { render, screen, fireEvent } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
// import Programs from '../components/Programs';
// import { sbaProgramOptions } from '../../../constants/sba-programs'; // Adjust the import path as necessary

// describe('Select Intended Programs', () => {
//   // beforeEach(() => {
//   //   render(<Programs />);
//   // });

//   it('renders all program cards', () => {
//     sbaProgramOptions.forEach(option => {
//       console.log(">> ", option) ;
      
//       expect(screen.getByText(option.name)).toBeInTheDocument();
//       expect(screen.getByText(option.description)).toBeInTheDocument();
//       expect(screen.getByText(option.details)).toBeInTheDocument();
//     });
//   });
//   it('toggles program selection on checkbox click', () => {
//     sbaProgramOptions.forEach(option => {
//       const checkbox = screen.getByLabelText(option.name) as HTMLInputElement;
//       expect(checkbox.checked).toBeFalsy();
//       userEvent.click(checkbox);
//       expect(checkbox.checked).toBeTruthy();
//       userEvent.click(checkbox);
//       expect(checkbox.checked).toBeFalsy();
//     });
//   });
// });

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
// import '@testing-library/jest-dom/extend-expect';
import Programs from '../components/Programs';
import { sbaProgramOptions } from '../../../constants/sba-programs'; 

describe('Programs Component', () => {
  test('selects and deselects programs', () => {
    render(<Programs />);

    sbaProgramOptions.forEach((program) => {
      const programLabel = screen.getByText(program.name);

      const checkbox = programLabel.closest('h2').querySelector('input');

      expect(checkbox).not.toBe();

      fireEvent.click(programLabel);
      expect(checkbox).toBeDefined();

      fireEvent.click(programLabel);
      expect(checkbox).not.toBe();
    });
  });

  test('disables and enables the Next button based on selection', () => {
    render(<Programs />);

    const nextButton = screen.getByRole('button', { name: /next/i });

    expect(nextButton).toBeDisabled();

    const firstProgramLabel = screen.getByText(sbaProgramOptions[0].name);
    fireEvent.click(firstProgramLabel);

    expect(nextButton).not.toBe();

    fireEvent.click(firstProgramLabel);

    expect(nextButton).toBeDisabled();
  });
  
});