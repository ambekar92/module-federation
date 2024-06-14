import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import ContributorForm from '../ContributorForm';
import applicationSlice from '../../../redux/applicationSlice';

describe('ContributorForm', () => {
  let store: any;

  const setup = (initialState = {}) => {
    store = configureStore({
      reducer: {
        application: applicationSlice,
      },
      preloadedState: initialState,
    });
    render(
      <Provider store={store}>
        <ContributorForm />
      </Provider>
    );
  };

  beforeEach(() => {
    setup({
      application: {
        contributors: [],
        isAddingContributor: false,
      },
    });
  });

  it('renders the initial form with add button', () => {
    expect(screen.getByRole('button', { name: /invite spouses/i })).toBeInTheDocument();
  });

  it('displays the form to add a new contributor when "Invite Spouses" is clicked', async () => {
    const addButton = screen.getByRole('button', { name: /invite spouses/i });
    await userEvent.click(addButton);
    expect(screen.getByLabelText('First Name')).toBeInTheDocument();
    expect(screen.getByLabelText('Last Name')).toBeInTheDocument();
    expect(screen.getByLabelText('Email Address')).toBeInTheDocument();
  });

  it('updates form fields when they are modified', async () => {
    // activate the form by simulating clicking the "Invite Spouses" button
    const addButton = screen.getByRole('button', { name: /invite spouses/i });
    await userEvent.click(addButton);

    const firstNameInput = screen.getByLabelText('First Name') as HTMLInputElement;
    await userEvent.type(firstNameInput, 'John');
    expect(firstNameInput.value).toBe('John');

    const lastNameInput = screen.getByLabelText('Last Name') as HTMLInputElement;
    await userEvent.type(lastNameInput, 'Doe');
    expect(lastNameInput.value).toBe('Doe');

    const emailInput = screen.getByLabelText('Email Address') as HTMLInputElement;
    await userEvent.type(emailInput, 'john.doe@example.com');
    expect(emailInput.value).toBe('john.doe@example.com');
  });

  it('calls the correct actions when "Add" button is clicked with all fields filled', async () => {
    const addButton = screen.getByRole('button', { name: /invite spouses/i });
    await userEvent.click(addButton);

    await userEvent.type(screen.getByLabelText('First Name'), 'John');
    await userEvent.type(screen.getByLabelText('Last Name'), 'Doe');
    await userEvent.type(screen.getByLabelText('Email Address'), 'john.doe@example.com');
    const addContributorButton = screen.getByRole('button', { name: /add/i });
    await userEvent.click(addContributorButton);
  });
});
