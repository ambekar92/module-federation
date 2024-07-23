import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { DelegateType } from '../utils/types'
import { RootState } from './store'

export interface FormState {
  delegates: DelegateType[]
  editingDelegate: DelegateType | null
  displayRequiredFieldsWarning: boolean
  inputKey: number
}

const initialState: FormState = {
  delegates: [],
  editingDelegate: null,
  displayRequiredFieldsWarning: false,
  inputKey: Date.now(),
}

export const addOrUpdateDelegate = createAsyncThunk(
  'form/addOrUpdateDelegate',
  async (delegateData: DelegateType, { getState, dispatch }) => {
    const state = getState() as RootState
    let { delegates } = state.form
    const { editingDelegate } = state.form

    if (editingDelegate) {
      delegates = delegates.map((delegate) =>
        delegate.id === editingDelegate.id
          ? { ...delegateData, id: editingDelegate.id }
          : delegate,
      )
    } else {
      delegates = [...delegates, { ...delegateData, id: Date.now() }]
    }
    dispatch(setDelegates(delegates))
  },
)

export const deleteDelegate = createAsyncThunk<
  void,
  number,
  { state: RootState }
>('form/deleteDelegate', async (index, { getState, dispatch }) => {
  const currentDelegates = getState().form.delegates
  const newDelegates = currentDelegates.filter((_, i) => i !== index)
  dispatch(setDelegates(newDelegates))
  dispatch(setEditingDelegate(null))
})

export const editDelegate = createAsyncThunk<
  void,
  number,
  { state: RootState }
>('form/editDelegate', async (index, { getState, dispatch }) => {
  const currentDelegates = getState().form.delegates
  const delegate = currentDelegates[index]
  if (delegate) {
    dispatch(setEditingDelegate(delegate))
  }
})

const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    setDelegates: (state, action: PayloadAction<DelegateType[]>) => {
      state.delegates = action.payload
    },
    addDelegate(state, action: PayloadAction<DelegateType>) {
      state.delegates = [...state.delegates, action.payload]
    },
    setEditingDelegate(state, action: PayloadAction<DelegateType | null>) {
      state.editingDelegate = action.payload
    },
    setDisplayWarnings(
      state,
      action: PayloadAction<{ type: string; value: boolean }>,
    ) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ;(state as any)[action.payload.type] = action.payload.value
    },
    setDisplayRequiredFieldsWarning(state, action: PayloadAction<boolean>) {
      state.displayRequiredFieldsWarning = action.payload
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
    resetForm(state) {
      return initialState // Resets to the initial state
    },
    updateInputKey(state) {
      state.inputKey = Date.now()
    },
  },
})

export const {
  setDelegates,
  addDelegate,
  setEditingDelegate,
  setDisplayWarnings,
  setDisplayRequiredFieldsWarning,
  resetForm,
  updateInputKey,
} = formSlice.actions

export default formSlice.reducer
export const selectForm = (state: RootState) => state.form
