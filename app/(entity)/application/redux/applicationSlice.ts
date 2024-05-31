import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from './applicationStore';
import { Contributor } from '../components/contributor-invite/types';
import { Owner, OwnershipType } from '../components/ownership/shared/types';
import { Operator } from '../sections/ControlAndOperations';

interface ApplicationState {
  currentStep: number;
	isStructureSelected: boolean;
	selectedStructure: 'Sole Proprietorship' | 'Partnership' | 'Corporation' | 'LLC' | null;
	maxSteps: number;
	ownerType: 'organization' | 'individual' | null,
	ownerTypeSelected: boolean,
	ownershipPercentageTotal: number;
	displayStepNavigation: boolean,
	isAddingContributor: boolean,
  owners: Owner[],
	operators: Operator[],
	isAddingOperator: boolean,
	contributors: Contributor[]
}

const initialState: ApplicationState = {
  currentStep: 0,
  isStructureSelected: false,
  selectedStructure: 'Partnership',
  maxSteps: 7,
  ownerType: null,
  ownerTypeSelected: false,
  ownershipPercentageTotal: 0,
  displayStepNavigation: false,
  isAddingContributor: false,
  contributors: [],
  owners: [],
  operators: [],
  isAddingOperator: false,
}

const applicationSlice = createSlice({
  name: 'application',
  initialState,
  reducers: {
    setStep(state, action: PayloadAction<number>) {
      state.currentStep = action.payload;
    },
    setIsStructuredSelected(state, action: PayloadAction<boolean>) {
      state.isStructureSelected = action.payload;
    },
    setSelectedStructure(state, action: PayloadAction<'Sole Proprietorship' | 'Partnership' | 'Corporation' | 'LLC'>) {
      state.selectedStructure = action.payload;
    },
    setOwnerType(state, action: PayloadAction<OwnershipType | null>) {
      state.ownerType = action.payload
    },
    setOwnerTypeSelected(state, action: PayloadAction<boolean>) {
      state.ownerTypeSelected = action.payload;
    },
    setOwnershipPercentageTotal(state, action: PayloadAction<number>) {
      state.ownershipPercentageTotal = action.payload;
    },
    setDisplayStepNavigation(state, action: PayloadAction<boolean>) {
      state.displayStepNavigation = action.payload;
    },
    setIsAddingContributor(state, action: PayloadAction<boolean>) {
      state.isAddingContributor = action.payload;
    },
    setIsAddingOperator(state, action: PayloadAction<boolean>) {
      state.isAddingOperator = action.payload;
    },
    setContributors(state, action: PayloadAction<Contributor[]>) {
      state.contributors = action.payload;
    },
    setOwners(state, action: PayloadAction<Owner[]>) {
      state.owners = action.payload;
    },
    setOperators(state, action: PayloadAction<Operator[]>) {
      state.operators = action.payload;
    }
  }
})

export const {
  setStep,
  setIsStructuredSelected,
  setSelectedStructure,
  setOwnerType,
  setOwnerTypeSelected,
  setOwnershipPercentageTotal,
  setDisplayStepNavigation,
  setIsAddingContributor,
  setContributors,
  setOwners,
  setIsAddingOperator,
  setOperators
} = applicationSlice.actions;

export default applicationSlice.reducer;
export const selectApplication = (state: RootState) => state.application;
