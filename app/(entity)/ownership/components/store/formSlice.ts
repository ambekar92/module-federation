import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { EmployeeType, OwnerType, SelectOption } from '../utils/types';
import { RootState } from './store';
import { ProgramOption, programOptions } from '../utils/types';

interface FormState {
  currentStep: number;
  selectedDisadvantages: string[];
  displayAddOwnerWarning: boolean;
  displayAddEmployeeWarning: boolean;
  displayPercentWarning: boolean;
	displayDisadvantageError: boolean;
  selectedOptions: SelectOption[];
	eligiblePrograms: ProgramOption[],
  owners: OwnerType[];
  editingOwner: OwnerType | null;
  maxOwnership: number;
  employees: EmployeeType[];
  editingEmployee: EmployeeType | null;
  inputKey: number;
  displayRequiredFieldsWarning: boolean;
}

const initialState: FormState = {
  currentStep: 0,
  selectedDisadvantages: [],
  displayAddOwnerWarning: false,
  displayAddEmployeeWarning: false,
  displayPercentWarning: false,
  displayDisadvantageError: false,
  selectedOptions: [],
  eligiblePrograms: [],
  owners: [],
  editingOwner: null,
  maxOwnership: 100,
  employees: [],
  editingEmployee: null,
  inputKey: Date.now(),
  displayRequiredFieldsWarning: false,
};

const MINORITY_DISADVANTAGES = new Set([
  'black_american', 'hispanic_american', 'native_american', 'asian_pacific_american'
]);

export function calculateQualifyingDisadvantages(owners: OwnerType[]): Set<string> {
  const disadvantageOwnership: { [disadvantage: string]: number } = {};

  owners.forEach(owner => {
    owner.socialDisadvantages.forEach(disadvantage => {
      if (!disadvantageOwnership[disadvantage]) {
        disadvantageOwnership[disadvantage] = 0;
      }
      if (owner.usCitizen === 'Yes') { // Assuming we only count the ownership if the owner is a US citizen
        disadvantageOwnership[disadvantage] += owner.ownershipPercentage;
      }
    });
  });

  // Aggregate minority disadvantages
  const minorityOwnership = Array.from(MINORITY_DISADVANTAGES).reduce((acc, disadvantage) => {
    return acc + (disadvantageOwnership[disadvantage] || 0);
  }, 0);

  const qualifyingDisadvantages = new Set<string>();
  Object.entries(disadvantageOwnership).forEach(([disadvantage, percentage]) => {
    if (percentage >= 50 && !MINORITY_DISADVANTAGES.has(disadvantage)) {
      qualifyingDisadvantages.add(disadvantage);
    }
  });

  // Add 'minority' as a qualifying disadvantage if the total minority ownership is over 50%
  if (minorityOwnership >= 50) {
    qualifyingDisadvantages.add('minority');
  }

  return qualifyingDisadvantages;
}

function calculateProgramsBasedOnDisadvantages(disadvantages: Set<string>, programOptions: ProgramOption[]): ProgramOption[] {
  return programOptions.filter(program =>
    program.disadvantages.some(disadvantage =>
      disadvantages.has(disadvantage) || (disadvantage === 'minority' && disadvantages.has('minority'))
    )
  );
}

export const calculateEligiblePrograms = createAsyncThunk(
  'form/calculateEligiblePrograms',
  async (_, { getState, dispatch }) => {
    const state = getState() as RootState;
    const { owners, eligiblePrograms } = state.form;

    const qualifyingDisadvantages = calculateQualifyingDisadvantages(owners);
    const newEligiblePrograms = calculateProgramsBasedOnDisadvantages(qualifyingDisadvantages, programOptions); // Assume programOptions are globally available or fetched here

    if (JSON.stringify(eligiblePrograms) !== JSON.stringify(newEligiblePrograms)) {
      dispatch(setEligiblePrograms(newEligiblePrograms));
    }
  }
);

export const addOrUpdateOwner = createAsyncThunk(
  'form/addOrUpdateOwner',
  async (ownerData: OwnerType, { getState, dispatch }) => {
    const state = getState() as RootState;
    let { owners } = state.form;
    const { editingOwner } = state.form;

    if (editingOwner) {
      owners = owners.map(owner => owner.id === editingOwner.id ? { ...ownerData, id: editingOwner.id } : owner);
    } else {
      owners = [...owners, { ...ownerData, id: Date.now() }];
    }
    dispatch(setOwners(owners));
    await dispatch(calculateEligiblePrograms());
  }
);

export const deleteOwner = createAsyncThunk<void, number, { state: RootState }>(
  'form/deleteOwner',
  async (index, { getState, dispatch }) => {
    const currentOwners = getState().form.owners;
    const newOwners = currentOwners.filter((_, i) => i !== index);
    dispatch(setOwners(newOwners));
    dispatch(setEditingOwner(null));
  }
);

export const editOwner = createAsyncThunk<void, number, { state: RootState }>(
  'form/editOwner',
  async (index, { getState, dispatch }) => {
    const currentOwners = getState().form.owners;
    const owner = currentOwners[index];
    if (owner) {
      dispatch(setEditingOwner(owner));
    }
  }
);

export const addOrUpdateEmployee = createAsyncThunk(
  'form/addOrUpdateEmployee',
  async (employeeData: EmployeeType, { getState, dispatch }) => {
    const state = getState() as RootState;
    let { employees } = state.form;
    const { editingEmployee } = state.form;

    if (editingEmployee) {
      employees = employees.map(employee => employee.id === editingEmployee.id ? { ...employeeData, id: editingEmployee.id } : employee);
    } else {
      employees = [...employees, { ...employeeData, id: Date.now() }];
    }
    dispatch(setEmployees(employees));
  }
);

export const deleteEmployee = createAsyncThunk<void, number, { state: RootState }>(
  'form/deleteEmployee',
  async (index, { getState, dispatch }) => {
    const currentEmployees = getState().form.employees;
    const newEmployees = currentEmployees.filter((_, i) => i !== index);
    dispatch(setEmployees(newEmployees));
    dispatch(setEditingOwner(null));
  }
);

export const editEmployee = createAsyncThunk<void, number, { state: RootState }>(
  'form/editEmployee',
  async (index, { getState, dispatch }) => {
    const currentEmployees = getState().form.employees;
    const employee = currentEmployees[index];
    if (employee) {
      dispatch(setEditingEmployee(employee));
    }
  }
);

const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    setStep(state, action: PayloadAction<number>) {
      state.currentStep = action.payload;
    },
    setOwners: (state, action: PayloadAction<OwnerType[]>) => {
      state.owners = action.payload;
    },
    addOwner(state, action: PayloadAction<OwnerType>) {
      state.owners.push(action.payload);
    },
    setEditingOwner(state, action: PayloadAction<OwnerType | null>) {
      state.editingOwner = action.payload;
    },
    setEmployees(state, action: PayloadAction<EmployeeType[]>) {
      state.employees = action.payload;
    },
    addEmployee(state, action: PayloadAction<EmployeeType>) {
      state.employees.push(action.payload);
    },
    setEditingEmployee(state, action: PayloadAction<EmployeeType | null>) {
      state.editingEmployee = action.payload;
    },
    setSelectedDisadvantages(state, action: PayloadAction<string[]>) {
      state.selectedDisadvantages = action.payload;
    },
    setSelectedOptions(state, action: PayloadAction<SelectOption[]>) {
      state.selectedOptions = action.payload;
    },
    setDisplayWarnings(state, action: PayloadAction<{ type: string; value: boolean }>) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (state as any)[action.payload.type] = action.payload.value;
    },
    setMaxOwnership(state, action: PayloadAction<number>) {
      state.maxOwnership = action.payload
    },
    setDisplayRequiredFieldsWarning(state, action: PayloadAction<boolean>) {
      state.displayRequiredFieldsWarning = action.payload
    },
    setDisplayAddOwnerWarning(state, action: PayloadAction<boolean>) {
      state.displayRequiredFieldsWarning = action.payload
    },
    setDisplayDisadvantageError(state, action: PayloadAction<boolean>) {
      state.displayDisadvantageError = action.payload
    },
    setDisplayAddEmployeeWarning(state, action: PayloadAction<boolean>) {
      state.displayAddEmployeeWarning = action.payload
    },
    setDisplayPercentWarning(state, action: PayloadAction<boolean>) {
      state.displayPercentWarning = action.payload
    },
    setEligiblePrograms(state, action: PayloadAction<ProgramOption[]>) {
      state.eligiblePrograms = action.payload
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
    resetForm(state) {
      return initialState; // Resets to the initial state
    },
    updateInputKey(state) {
      state.inputKey = Date.now();
    }
  },
});

export const {
  setStep,
  setOwners,
  addOwner,
  setEditingOwner,
  setEmployees,
  addEmployee,
  setEditingEmployee,
  setSelectedDisadvantages,
  setSelectedOptions,
  setDisplayWarnings,
  setMaxOwnership,
  setDisplayAddOwnerWarning,
  setDisplayRequiredFieldsWarning,
  setDisplayDisadvantageError,
  setDisplayAddEmployeeWarning,
  setDisplayPercentWarning,
  setEligiblePrograms,
  resetForm,
  updateInputKey
} = formSlice.actions;

export default formSlice.reducer;
export const selectForm = (state: RootState) => state.form;
