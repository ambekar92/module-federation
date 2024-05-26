import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from './applicationStore';

interface ApplicationState {
  currentStep: number;
	isStructureSelected: boolean;
	selectedStructure: 'Sole Proprietorship' | 'Partnership' | 'Corporation' | 'LLC' | null;
	maxSteps: number;
	ownerType: 'organization' | 'individual' | null,
	ownerTypeSelected: boolean,
	ownershipPercentageTotal: number;
	displayStepNavigation: boolean
}

const initialState: ApplicationState = {
  currentStep: 0,
  isStructureSelected: false,
  selectedStructure: 'Partnership',
  maxSteps: 7,
  ownerType: null,
  ownerTypeSelected: false,
  ownershipPercentageTotal: 0,
  displayStepNavigation: false
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
    setOwnerType(state, action: PayloadAction<'organization' | 'individual' | null>) {
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
  setDisplayStepNavigation
} = applicationSlice.actions;

export default applicationSlice.reducer;
export const selectApplication = (state: RootState) => state.application;
