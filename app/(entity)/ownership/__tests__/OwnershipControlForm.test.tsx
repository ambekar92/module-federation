import { render, screen } from "@testing-library/react"
import OwnershipControlForm from "../components/OwnershipControlForm"
import userEvent from "@testing-library/user-event";
import { prettyDOM } from "@testing-library/react";

describe('OwnershipControlForm', () => {
    it('should render', () => {
        render(<OwnershipControlForm />)
    })

    describe('firstName validation', () => {
        it('should trigger firstName field validation on submit if no value is provided', async() => {
            render(<OwnershipControlForm />)
            userEvent.setup();
            const firstNameEl = screen.getByTestId('input-firstName');
            const addOwner = screen.getByRole('button', {  name: /add owner/i})
            let requiredError = firstNameEl.querySelector('.text-secondary-vivid')
            expect(requiredError).not.toBeInTheDocument();
            await userEvent.click(addOwner);
            requiredError = firstNameEl.querySelector('.text-secondary-vivid');
            expect(requiredError).toBeInTheDocument();
        });
    
        it('should not show error message if firstName field  is provided', async() => {
            const {container} = render(<OwnershipControlForm />)
            userEvent.setup();
            const firstNameEl = container.querySelector('#input-firstName');
            const addOwner = screen.getByRole('button', {  name: /add owner/i})
            let requiredError = firstNameEl?.querySelector('.text-secondary-vivid')
            expect(requiredError).not.toBeInTheDocument();
            await userEvent.type(firstNameEl!, 'my name');
            await userEvent.click(addOwner);
            requiredError = firstNameEl?.querySelector('.text-secondary-vivid');
            expect(requiredError).not.toBeInTheDocument();
        })
    })

    describe('lastName validation', () => {
        it('should trigger lastName field validation on submit if no value is provided', async() => {
            const {container} = render(<OwnershipControlForm />)
            userEvent.setup();
            const lastNameInputEl = container.querySelector('#input-lastName');
            const lastNameWrapper=  screen.getByTestId('input-lastName')
            expect(lastNameInputEl).toBeInTheDocument();
            const addOwner = screen.getByRole('button', {  name: /add owner/i})
            let requiredError = lastNameWrapper!.querySelector('.text-secondary-vivid')
            expect(requiredError).not.toBeInTheDocument();
            await userEvent.click(addOwner);
            requiredError = lastNameWrapper!.querySelector('.text-secondary-vivid');
            expect(requiredError).toBeInTheDocument();
        });
    
        it('should not show error message if lastName field  is provided', async() => {
            const {container} = render(<OwnershipControlForm />)
            userEvent.setup();
            const lastNameInputEl = container.querySelector('#input-lastName');
            const lastNameWrapper=  screen.getByTestId('input-lastName')
            const addOwner = screen.getByRole('button', {  name: /add owner/i})
            await userEvent.type(lastNameInputEl!, 'last name');
            let requiredError = lastNameWrapper.querySelector('.text-secondary-vivid')
            expect(requiredError).not.toBeInTheDocument();
            await userEvent.click(addOwner);
            requiredError = lastNameWrapper!.querySelector('.text-secondary-vivid');
            expect(requiredError).not.toBeInTheDocument();
        })
    })

    describe('gender', () => {
        it('should show error message on submit if no gender is selected', async () => {
            userEvent.setup();
            render(<OwnershipControlForm />);
            const addOwner = screen.getByRole('button', {  name: /add owner/i});
            await userEvent.click(addOwner);
            const errorElement = screen.queryByTestId('gender');
            expect(errorElement).toBeInTheDocument();
        });

        it('should NOT show error message on submit if  gender is selected', async () => {
            userEvent.setup();
            render(<OwnershipControlForm />);
            const addOwner = screen.getByRole('button', {  name: /add owner/i});
            const errorElement = screen.queryByTestId('gender');
            const genderM = screen.getByTestId('gender-M');
            await userEvent.click(genderM);
            await userEvent.click(addOwner);
            expect(errorElement).not.toBeInTheDocument();
        })
    })

    describe('US Citizen', () => {
        it('should show error message on submit if US C is not selected', async () => {
            userEvent.setup();
            render(<OwnershipControlForm />);
            const addOwner = screen.getByRole('button', {  name: /add owner/i});
            await userEvent.click(addOwner);
            const errorElement = screen.queryByTestId('usCitizen');
            expect(errorElement).toBeInTheDocument();
        });

        it('should NOT show error message on submit if  gender is selected', async () => {
            userEvent.setup();
            render(<OwnershipControlForm />);
            const addOwner = screen.getByRole('button', {  name: /add owner/i});
            const errorElement = screen.queryByTestId('usCitizen');
            const USCRadioBtn = screen.getByTestId('usCitizen-Yes');
            await userEvent.click(USCRadioBtn);
            await userEvent.click(addOwner);
            expect(errorElement).not.toBeInTheDocument();
        })
    })

    describe('Veteran', () => {
        it('should show error message on submit if veteran is not selected', async () => {
            userEvent.setup();
            render(<OwnershipControlForm />);
            const addOwner = screen.getByRole('button', {  name: /add owner/i});
            await userEvent.click(addOwner);
            const errorElement = screen.queryByTestId('veteran');
            expect(errorElement).toBeInTheDocument();
        });

        it('should NOT show error message on submit if  veteran is selected', async () => {
            userEvent.setup();
            render(<OwnershipControlForm />);
            const addOwner = screen.getByRole('button', {  name: /add owner/i});
            const errorElement = screen.queryByTestId('veteran');
            const yesVeteranRadio = screen.getByTestId('veteran-Yes');
            await userEvent.click(yesVeteranRadio);
            await userEvent.click(addOwner);
            expect(errorElement).not.toBeInTheDocument();
        })
    })
})