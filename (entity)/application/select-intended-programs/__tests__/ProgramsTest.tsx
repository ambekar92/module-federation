import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Programs from '../components/Programs';
import { sbaProgramOptions } from '../../../../constants/sba-programs';

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
    expect(nextButton).not.toBeEnabled();

    fireEvent.click(firstProgramLabel);
    expect(nextButton).toBeDisabled();
  });

});
