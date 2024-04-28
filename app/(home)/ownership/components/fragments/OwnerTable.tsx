import React from 'react'
import { UseFormReset, UseFormSetValue } from 'react-hook-form'
import { deleteOwner, editOwner, selectForm, setEditingOwner, setSelectedOptions, updateInputKey } from '../store/formSlice'
import { useFormDispatch, useFormSelector } from '../store/hooks'
import { getTotalOwnershipPercentage } from '../utils/helpers'
import { FirmOwnershipType, OwnershipInputsType, socialDisadvantages } from '../utils/types'

type OwnershipTableProps = {
  isDisplay?: boolean,
	setValue: UseFormSetValue<OwnershipInputsType>,
	reset: UseFormReset<OwnershipInputsType>
}

const OwnerTable: React.FC<OwnershipTableProps> = ({ isDisplay, setValue, reset }) => {
  const dispatch = useFormDispatch();
  const { owners, editingOwner } = useFormSelector(selectForm);

  const handleEditOwner = (index: number) => {
    const owner = owners[index]
    Object.entries(owner).forEach(([key, value]) => {
      if (key !== 'id') {
        setValue(key as keyof FirmOwnershipType, value)
      }
    })
    const selectedDisadvantagesForEdit = socialDisadvantages
      .filter((d) => owner.socialDisadvantages.includes(d.value))
      .map((d) => ({ value: d.value, label: d.label }))
    dispatch(setSelectedOptions(selectedDisadvantagesForEdit));
    dispatch(editOwner(index));
  }

  const handleDeleteOwner = (index: number) => {
    if (editingOwner !== null && owners[index].id === editingOwner.id) {
      // The owner being deleted is currently being edited, so reset the form
      reset({
        firstName: '',
        middleInitial: '',
        lastName: '',
        gender: undefined,
        usCitizen: undefined,
        veteran: undefined,
        disabledVeteran: undefined,
        ownershipPercentage: undefined,
        socialDisadvantages: []
      });
      dispatch(setSelectedOptions([]));
      dispatch(setEditingOwner(null));
      dispatch(updateInputKey());
    }

    dispatch(deleteOwner(index));
  }

  return (
    <div className="ownership-table width-full">
      <table className="usa-table usa-table--borderless">
        <thead>
          <tr>
            <th colSpan={7}>Owners</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="bold">Name</td>
            <td className="bold">Sex</td>
            <td className="bold">US Citizen</td>
            <td className="bold">Veteran</td>
            <td className="bold">8(a) Social Disadvantage</td>
            <td className="bold">Ownership Percentage</td>
            <td className="bold"></td>
          </tr>
          {owners.map((owner, index) => (
            <tr key={index}>
              <td>
                {owner.firstName} {owner.lastName}
              </td>
              <td>{owner.gender}</td>
              <td>{owner.usCitizen}</td>
              <td>{owner.veteran}</td>
              <td>
                {owner.socialDisadvantages.length === 0
                  ? 'N/A'
                  : owner.socialDisadvantages
                    .map((disadvantage) =>
                      disadvantage === 'not_claiming'
                        ? 'Not Claiming Social Disadvantage'
                        : disadvantage === 'disabledVeteran'
                          ? 'Disabled Veteran'
                          : disadvantage
                            .split('_')
                            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                            .join(' ')
                    )
                    .join(', ')}
              </td>

              <td>{owner.ownershipPercentage}%</td>
              {!isDisplay && (
                <td>
                  <div className='display-flex'>
                    <button type="button" className="icons margin-right-05" onClick={() => handleEditOwner(index)}>
                      <svg
                        width="20"
                        height="19"
                        viewBox="0 0 20 19"
                        fill="currentColor"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M18.7824 2.18545L17.3282 0.718675C16.4052 -0.204402 14.9004 -0.204402 13.9774 0.718675L13.0796 1.61641C12.5864 2.10956 12.5864 2.90623 13.0796 3.39938L16.1017 6.42153C16.5948 6.91468 17.3915 6.91468 17.8846 6.42153L18.7824 5.52372C19.7055 4.60064 19.7055 3.09587 18.7824 2.17279V2.18545Z" />
                        <path d="M12.2197 4.24658C11.7266 3.75342 10.9299 3.75342 10.4368 4.24658L2.69814 11.9852C2.31879 12.3646 2.02796 12.8451 1.87622 13.3762L0.561154 17.8272C0.47264 18.1433 0.561155 18.4847 0.788762 18.7123C1.01637 18.9399 1.35778 19.0284 1.66126 18.9399L6.11225 17.6249C6.63069 17.4731 7.11119 17.1823 7.50318 16.8029L15.2545 9.06427C15.7476 8.57112 15.7476 7.77453 15.2545 7.28138L12.2197 4.24658ZM6.2387 15.5384C6.06167 15.7155 5.84671 15.842 5.60645 15.9179L2.73607 16.765L3.58328 13.882C3.65915 13.6417 3.7856 13.4268 3.94998 13.2497L11.3219 5.87781L13.6107 8.16654L6.22605 15.5384H6.2387Z" />
                      </svg>
                    </button>

                    <button type="button" className="icons" onClick={() => handleDeleteOwner(index)}>
                      <svg
                        width="18"
                        height="19"
                        viewBox="0 0 18 19"
                        fill="currentColor"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M6.14678 18.973C5.6272 18.973 5.16802 18.973 4.79343 18.9499C4.33427 18.9151 3.98385 18.8341 3.68177 18.6837C3.13802 18.4175 2.70303 18.0008 2.42511 17.48C2.26803 17.1791 2.18343 16.855 2.14718 16.4152C2.12301 16.0679 2.12303 15.6397 2.12303 15.1536V4.55178H0.963017C0.491767 4.55178 0.117188 4.16987 0.117188 3.71848C0.117188 3.2671 0.503851 2.90829 0.963017 2.90829H4.12886L4.15302 2.61894C4.1651 2.36431 4.21344 2.04027 4.34635 1.7162C4.63636 1.03333 5.19219 0.512468 5.89302 0.234691C6.15885 0.130525 6.44885 0.0726859 6.83552 0.0495378C7.1376 0.0263898 7.51218 0.0263672 7.94718 0.0263672H10.0376C10.5089 0.0263672 10.8714 0.0263898 11.1614 0.0495378C11.548 0.0726859 11.838 0.130525 12.1039 0.234691C12.8168 0.512468 13.3605 1.04491 13.6505 1.7162C13.7955 2.04027 13.8318 2.36431 13.8439 2.61894V2.8967H17.0339C17.5051 2.8967 17.8797 3.26708 17.8797 3.7069C17.8797 4.14671 17.493 4.52868 17.0339 4.52868H15.8859V15.1189C15.8859 15.6397 15.8859 16.0564 15.8497 16.4152C15.8134 16.855 15.7288 17.1907 15.5718 17.48C15.2938 17.9893 14.8589 18.4175 14.3151 18.6837C14.013 18.8341 13.6626 18.9151 13.2034 18.9499C12.8409 18.973 12.3939 18.973 11.8743 18.973H6.13468H6.14678ZM3.82678 15.0726C3.82678 15.6281 3.82677 15.9985 3.85093 16.2763C3.8751 16.554 3.92344 16.6698 3.9476 16.7393C4.05635 16.9476 4.2376 17.1212 4.4551 17.2253C4.51552 17.2601 4.63636 17.2948 4.93845 17.318C5.22845 17.3411 5.60303 17.3411 6.18303 17.3411H11.8259C12.4059 17.3411 12.7926 17.3411 13.0705 17.318C13.3726 17.2948 13.4934 17.2485 13.5539 17.2138C13.7714 17.1096 13.9526 16.936 14.0613 16.7277C14.0976 16.6698 14.1339 16.554 14.158 16.2647C14.1822 15.9869 14.1822 15.6281 14.1822 15.0726V4.52868H3.81469V15.0726H3.82678ZM7.99553 1.63517C7.51219 1.63517 7.19803 1.63518 6.95636 1.64676C6.70261 1.65833 6.60595 1.69305 6.54553 1.7162C6.26761 1.83194 6.03803 2.0518 5.91719 2.318C5.89303 2.3643 5.86886 2.46849 5.8447 2.71155V2.86202L5.98969 2.8967H12.1522V2.72313C12.1401 2.46851 12.1038 2.37587 12.0797 2.318C11.9588 2.04022 11.7414 1.83194 11.4514 1.7162C11.3909 1.69305 11.2943 1.65833 11.0405 1.64676C10.7988 1.63518 10.4847 1.63517 10.0013 1.63517H7.99553ZM11.0164 15.1189C10.5451 15.1189 10.1584 14.7485 10.1584 14.2972V7.54948C10.1584 7.09809 10.5451 6.7277 11.0164 6.7277C11.4876 6.7277 11.8622 7.09809 11.8622 7.54948V14.2972C11.8622 14.7485 11.4755 15.1189 11.0164 15.1189ZM6.99261 15.1189C6.52136 15.1189 6.14678 14.7485 6.14678 14.2972V7.54948C6.14678 7.09809 6.53344 6.7277 6.99261 6.7277C7.45178 6.7277 7.85052 7.09809 7.85052 7.54948V14.2972C7.85052 14.7485 7.46386 15.1189 6.99261 15.1189Z"
                        />
                      </svg>
                    </button>
                  </div>
                </td>
              )}
            </tr>
          ))}
          <tr>
            <td className="bold" colSpan={isDisplay ? 4 : 5}>
              Total
            </td>
            <td className="bold" colSpan={isDisplay ? 1 : 2}>
              {getTotalOwnershipPercentage(owners)}%
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default OwnerTable;
