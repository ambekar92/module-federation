import ClaimBusinessForm from '@/app/(entity)/claim-your-business/components/fragments/ClaimBusinessForm';
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event';

const claimFormComplete = jest.fn()

describe('ClaimBusinessForm', () => {
  it('should render', () => {
    render(<ClaimBusinessForm claimFormComplete={claimFormComplete} />)
  })
  describe('Unique Entity ID (UEI)', () => {
    it('should render UIE field', () => {
      render(<ClaimBusinessForm claimFormComplete={claimFormComplete} />)
      const ueiInputElement = screen.queryByTestId('input-uei');
      expect(ueiInputElement).toBeInTheDocument();
    })

    it('should NOT apply text-secondary class if uei has 12 alphanumeric chars', async() => {
      userEvent.setup();
      render(<ClaimBusinessForm claimFormComplete={claimFormComplete} />)
      const ueiInputElement = screen.getByText(/unique entity id \(uei\)/i);
      const findButton = screen.getByRole('button', {name: /find/i});
      await userEvent.type(ueiInputElement, 'ansmakKi91Ka');
      await userEvent.click(findButton);
      const errorClass = screen.queryByTestId('input-uei')?.querySelector('.text-secondary')
      expect(errorClass).not.toBeInTheDocument()
    })

    it('should apply text-secondary class if uei has less than 12 alphanumeric chars', async() => {
      userEvent.setup();
      render(<ClaimBusinessForm claimFormComplete={claimFormComplete} />)
      const ueiInputElement = screen.getByText(/unique entity id \(uei\)/i);
      const findButton = screen.getByRole('button', {name: /find/i});
      await userEvent.type(ueiInputElement, 'ansma91Ka');
      await userEvent.click(findButton);
      const errorClass = screen.queryByTestId('input-uei')?.querySelector('.text-secondary')
      expect(errorClass).toBeInTheDocument()
    })

  })
  describe('CAGE Code', () => {
    it('should render cageCode field', () => {
      render(<ClaimBusinessForm claimFormComplete={claimFormComplete} />)
      const cageCodeElement = screen.queryByTestId('input-cageCode');
      expect(cageCodeElement).toBeInTheDocument();
    })

    it('should NOT apply text-secondary class if cageCode has 5 alphanumeric chars', async() => {
      userEvent.setup();
      render(<ClaimBusinessForm claimFormComplete={claimFormComplete} />)
      const cageCodeElement = screen.getByRole('textbox', {
        name: /cage code/i
      })
      const findButton = screen.getByRole('button', {name: /find/i});
      await userEvent.type(cageCodeElement, 'abcH4');
      await userEvent.click(findButton);
      const errorClass = screen.queryByTestId('input-cageCode')?.querySelector('.text-secondary')
      expect(errorClass).not.toBeInTheDocument()
    })
    it('should NOT apply text-secondary class if cageCode has no value', async() => {
      userEvent.setup();
      render(<ClaimBusinessForm claimFormComplete={claimFormComplete} />)
      const findButton = screen.getByRole('button', {name: /find/i});
      await userEvent.click(findButton);
      const errorClass = screen.queryByTestId('input-cageCode')?.querySelector('.text-secondary')
      expect(errorClass).not.toBeInTheDocument()
    })

    it('should apply text-secondary class if cageCode has less than 5 alphanumeric chars', async() => {
      userEvent.setup();
      render(<ClaimBusinessForm claimFormComplete={claimFormComplete} />)
      const cageCodeElement = screen.getByRole('textbox', {
        name: /cage code/i
      });
      const findButton = screen.getByRole('button', {name: /find/i});
      await userEvent.type(cageCodeElement, 'abc');
      await userEvent.click(findButton);
      const errorClass = screen.queryByTestId('input-cageCode')?.querySelector('.text-secondary')
      expect(errorClass).toBeInTheDocument()
    })
  })

  describe('Bank Account Number', () => {
    //Bank account must be between 5 and 17 digits
    it('should render bankAccountNumber field', () => {
      render(<ClaimBusinessForm claimFormComplete={claimFormComplete} />)
      const bankAccountNumberElement = screen.queryByTestId('input-bankAccountNumber');
      expect(bankAccountNumberElement).toBeInTheDocument();
    })

    it('should NOT apply text-secondary class if bankAccountNumber has 5 numbers', async() => {
      userEvent.setup();
      render(<ClaimBusinessForm claimFormComplete={claimFormComplete} />)
      const bankAccountNumberElement = screen.getByRole('textbox', {
        name: /bank account number/i
      })
      const findButton = screen.getByRole('button', {name: /find/i});
      await userEvent.type(bankAccountNumberElement, '12345');
      await userEvent.click(findButton);
      const errorClass = screen.queryByTestId('input-bankAccountNumber')?.querySelector('.text-secondary')
      expect(errorClass).not.toBeInTheDocument()
    })

    it('should apply text-secondary class if bankAccountNumber has less than 5 chars', async() => {
      userEvent.setup();
      render(<ClaimBusinessForm claimFormComplete={claimFormComplete} />)
      const bankAccountNumberElement = screen.getByRole('textbox', {
        name: /bank account number/i
      });
      const findButton = screen.getByRole('button', {name: /find/i});
      await userEvent.type(bankAccountNumberElement, '1234');
      await userEvent.click(findButton);
      const errorClass = screen.queryByTestId('input-bankAccountNumber')?.querySelector('.text-secondary')
      expect(errorClass).toBeInTheDocument()
    })
  })

  describe('Taxpayer Identification Number (TIN) ', () => {
    //TIN must contain only numeric digits and must be 9 digits in length.
    it('should render tin field', () => {
      render(<ClaimBusinessForm claimFormComplete={claimFormComplete} />)
      const tinElement = screen.queryByTestId('input-tin');
      expect(tinElement).toBeInTheDocument();
    })

    it('should NOT apply text-secondary class if tin has 9 numbers', async() => {
      userEvent.setup();
      render(<ClaimBusinessForm claimFormComplete={claimFormComplete} />)
      const tinElement = screen.getByRole('textbox', {
        name: /taxpayer identification number \(tin\)/i
      })
      const findButton = screen.getByRole('button', {name: /find/i});
      await userEvent.type(tinElement, '123456789');
      await userEvent.click(findButton);
      const errorClass = screen.queryByTestId('input-tin')?.querySelector('.text-secondary')
      expect(errorClass).not.toBeInTheDocument()
    })

    it('should apply text-secondary class if tin has less than 9 chars', async() => {
      userEvent.setup();
      render(<ClaimBusinessForm claimFormComplete={claimFormComplete} />)
      const tinElement = screen.getByRole('textbox', {
        name: /taxpayer identification number \(tin\)/i
      });
      const findButton = screen.getByRole('button', {name: /find/i});
      await userEvent.type(tinElement, '1234');
      await userEvent.click(findButton);
      const errorClass = screen.queryByTestId('input-tin')?.querySelector('.text-secondary')
      expect(errorClass).toBeInTheDocument()
    })
  })

})
