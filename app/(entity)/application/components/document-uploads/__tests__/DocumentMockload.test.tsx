import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import DocumentMockload from '../DocumentMockload';
import { documentSections } from '../utils/mockHelpers';

jest.mock('next-auth/react', () => ({
  useSession: () => ({
    data: {
      user: {
        name: 'Test User'
      }
    },
    status: 'authenticated'
  })
}));

describe('DocumentMockload', () => {
  beforeEach(() => {
    render(<DocumentMockload />);
  });

  it('renders the document sections correctly', () => {
    documentSections.forEach(section => {
      expect(screen.getByText(section.sectionName)).toBeInTheDocument();
      section.subSectionNames.forEach(subSection => {
        expect(screen.getByText(subSection)).toBeInTheDocument();
      });
    });
  });

  it('toggles edit mode when edit button is clicked', async () => {
    const editButtons = await screen.findAllByText('Edit');
    await userEvent.click(editButtons[0]);
    expect(screen.getAllByText('Save')[0]).toBeInTheDocument();
    await userEvent.click(editButtons[0]);
    expect(screen.queryByText('Save')).not.toBeInTheDocument();
  });
});
