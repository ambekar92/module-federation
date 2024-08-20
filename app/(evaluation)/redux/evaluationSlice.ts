import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { RootState } from './evaluationStore'

interface EvaluationState {
  completedAnalystQAs: {
    ownership: boolean,
    control: boolean,
    sizeAndAdditional: boolean,
    economicDisadvantage: boolean,
    potentialForSuccess: boolean,
    socialDisadvantage: boolean
  }
}

const initialState: EvaluationState = {
  completedAnalystQAs: {
    ownership: false,
    control: false,
    sizeAndAdditional: false,
    economicDisadvantage: false,
    potentialForSuccess: false,
    socialDisadvantage: false
  }
}

const evaluationSlice = createSlice({
  name: 'evaluation',
  initialState,
  reducers: {
    setCompletedAnalystQA: (state, action: PayloadAction<{ key: keyof EvaluationState['completedAnalystQAs'], value: boolean }>) => {
      const { key, value } = action.payload;
      state.completedAnalystQAs[key] = value;
    },
    resetCompletedAnalystQAs: (state) => {
      state.completedAnalystQAs = initialState.completedAnalystQAs;
    }
  }
})

export const {
  setCompletedAnalystQA,
  resetCompletedAnalystQAs
} = evaluationSlice.actions

export default evaluationSlice.reducer
export const selectEvaluation = (state: RootState) => state.evaluation
