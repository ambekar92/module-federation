import { screen, render, waitFor } from '@testing-library/react';
import OwnershipLayout from '../OwnershipLayout';
import { Provider } from 'react-redux';
import { ReactNode } from 'react';
import user from '@testing-library/user-event'
import { configureStore, } from '@reduxjs/toolkit';
import applicationSlice, { setOwners, setOwnershipPercentageTotal } from '../../../redux/applicationSlice';
import { Owner } from '../shared/types';

describe('OwnershipLayout', () => {
  let mockStore: any;
  beforeEach(() => {
    const children = <p>children</p>;
    mockStore = configureStore({
      reducer: {
        application: applicationSlice
      }
    })
    const MockProvider = ({children}: {children: ReactNode}) => (<Provider store={mockStore}>{children}</Provider>)
    render(<OwnershipLayout>{children}</OwnershipLayout>, {
      wrapper: MockProvider
    })
  })
  it('renders correctly', () => {
    const pageTitle = screen.getByRole('heading', {level: 1, name: /Ownership/i});
    expect(pageTitle).toBeInTheDocument();

  })

  it('renders percent total correctly', () => {
    let percentTotal = screen.getByTestId('percentTotal');
    expect(percentTotal).toBeInTheDocument();

    mockStore.dispatch(setOwnershipPercentageTotal(9));

    waitFor(() => {
      percentTotal = screen.getByTestId('percentTotal');
      expect(percentTotal).toEqual(9)
    })
  })

  describe('Add Owner Button', () => {
    it('renders "Add Owner" button if owners length is zero and "Add Owner" button was not clicked', async() => {
      user.setup();
      const ownersLength = mockStore.getState().application.owners.length;
      expect(ownersLength).toBe(0);
      const addOwnerButton = screen.getByRole('button', {name: /add owner/i});
      expect(addOwnerButton).toBeInTheDocument();

    })

    it('does NOT render "Add Owner" button after it was clicked and owners length is zero', async() => {
      user.setup();
      const ownersLength = mockStore.getState().application.owners.length;
      expect(ownersLength).toBe(0);
      const addOwnerButton = screen.getByRole('button', {name: /add owner/i});
      await user.click(addOwnerButton);
      const addOwnerButtonAfterClick = screen.queryByRole('button', {name: /add owner/i});
      expect(addOwnerButtonAfterClick).not.toBeInTheDocument();

    })

    it('renders "Add Owner" button if owners length is greater than zero', async () => {
      const newOwner =  {firstName: 'Mary', lastName: 'Smith'} as unknown as Owner;
      mockStore.dispatch(setOwners([newOwner]));
      const addOwnerButton = screen.getByRole('button', {name: /add owner/i});
      expect(addOwnerButton).toBeInTheDocument();
    })

    test('"Add Owner" button is enabled if ownershipPercentageTotal is less than 100', () => {
      const ownershipPercentageTotal = mockStore.getState().application.ownershipPercentageTotal;
      expect(ownershipPercentageTotal).toBeLessThan(100)
      mockStore.dispatch(setOwners([{} as any]));
      const addOwnerButton = screen.getByRole('button', {name: /add owner/i});
      expect(addOwnerButton).toBeEnabled()
    })

    test('"Add Owner" button is disabled if ownershipPercentageTotal is 100', () => {
      mockStore.dispatch(setOwners([{} as any]));
      mockStore.dispatch(setOwnershipPercentageTotal(100));
      waitFor(() => {
        const addOwnerButton = screen.getByRole('button', {name: /add owner/i});
        expect(addOwnerButton).toBeDisabled()
      })
    })

  })

  describe('Navigation buttons', () => {
    test('Previous Button renders', () => {
      const prevButton = screen.getByRole('link', {name: /previous/i});
      expect(prevButton).toBeInTheDocument();
      expect(prevButton).toBeEnabled();
    })

    test('Next button renders', () => {
      const nextButton = screen.getByRole('button', {name: /next/i});
      expect(nextButton).toBeInTheDocument();
      expect(nextButton).toBeDisabled()
    })

    test('Next button is enabled when ownershipPercentageTotal is 100', () => {
      mockStore.dispatch(setOwnershipPercentageTotal(100));
      waitFor(() => {
        const nextButton = screen.getByRole('link', {name: /next/i});
        expect(nextButton).toBeInTheDocument();
        expect(nextButton).toBeEnabled()
      })
    })
  })

})
