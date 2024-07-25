import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Contributor } from '../components/contributor-invite/types';
import { Operator } from '../components/control-and-operations/schema';
import { OwnershipType } from '../components/ownership/shared/types';
import { OwnerType } from '../hooks/useOwnershipApplicationInfo';
import { RootState } from './applicationStore';

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
  owners: OwnerType[],
	operators: Operator[],
	showControlOperationsForm: boolean,
	contributors: Contributor[],
  currentOperatorEditIndex: number | null,
	totalQuestionnaires: number,
	isEditingOwner: boolean
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
  showControlOperationsForm: false,
  currentOperatorEditIndex: null,
  totalQuestionnaires: 0,
  isEditingOwner: false
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
    setShowControlOperationsForm(state, action: PayloadAction<boolean>) {
      state.showControlOperationsForm = action.payload;
    },
    setContributors(state, action: PayloadAction<Contributor[]>) {
      state.contributors = action.payload;
    },
    setOwners(state, action: PayloadAction<OwnerType[]>) {
      state.owners = action.payload;
    },
    setOperators(state, action: PayloadAction<Operator[]>) {
      state.operators = action.payload;
    },
    setCurrentOperatorEditIndex(state, action: PayloadAction<number | null>) {
      state.currentOperatorEditIndex = action.payload;
    },
    setTotalQuestionnaires(state, action: PayloadAction<number>) {
      state.totalQuestionnaires = action.payload
    },
    setIsEditingOwner(state, action: PayloadAction<boolean>) {
      state.isEditingOwner = action.payload;
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
  setShowControlOperationsForm,
  setOperators,
  setCurrentOperatorEditIndex,
  setTotalQuestionnaires,
  setIsEditingOwner
} = applicationSlice.actions;

export default applicationSlice.reducer;
export const selectApplication = (state: RootState) => state.application;
