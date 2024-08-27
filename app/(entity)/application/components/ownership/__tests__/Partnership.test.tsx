import { screen, render } from '@testing-library/react';
import Partnership from '../Partnership';
import { configureStore } from '@reduxjs/toolkit';
import applicationSlice, { setOwnerTypeSelected } from '../../../redux/applicationSlice';
import { Provider } from 'react-redux';
import { ReactNode } from 'react';
import user from '@testing-library/user-event'

describe('Partnership', () => {
  let mockStore: any;
  beforeEach(() => {
    mockStore = configureStore({
      reducer: {application : applicationSlice}
    });

    mockStore.dispatch(setOwnerTypeSelected(true));
    const Wrapper = ({children}: {children: ReactNode}) => <Provider store={mockStore}>{children}</Provider>
    render(<Partnership />, {
      wrapper: Wrapper
    })
  });

  it('renders correctly', () => {
    const title = screen.getByRole('heading', {level: 3, name: /Identification/i})
    expect(title).toBeInTheDocument();
  });

  describe('Select Owner dropdown', () => {
    it('renders', () => {
      const label = screen.getByLabelText('Type of Owner');
      expect(label).toBeInTheDocument();
      const select = screen.getByRole('listbox');
      expect(select).toBeInTheDocument();
    })

    it('has no value', () => {
      const select = screen.getByRole('listbox');
      expect(select).toBeInTheDocument();
      expect(select).toHaveValue('')
    })

    it ('has value of "individual" when "individual" option is selected', async () =>  {
      user.setup();
      let select = screen.getByRole('listbox');
      await user.selectOptions(select, 'Individual');
      select = screen.getByRole('listbox');
      expect(select).toHaveValue('individual');
      expect(select).not.toHaveValue('organization')
    })

  })

})
