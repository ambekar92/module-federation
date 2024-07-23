import { configureStore } from '@reduxjs/toolkit';
import formReducer, { FormState, addDelegate, resetForm, setDelegates, setDisplayRequiredFieldsWarning, setEditingDelegate, updateInputKey } from './formSlice';

describe('formSlice', () => {
  let store: ReturnType<typeof configureStore>

  beforeEach(() => {
    store = configureStore({
      reducer: {
        form: formReducer
      }
    })
  })

  it('should set delegates', () => {
    const delegates = [{id: 1, firstName:'John', lastName: 'Smith', email: 'test@gmail.com'},
      {id: 2, firstName: 'Jane', lastName: 'Smith', email: 'test@gmail.com'}];
    store.dispatch(setDelegates(delegates));
    const delegatesState = ((store.getState() as any).form as FormState).delegates
    expect(delegatesState).toEqual(delegates)
  })

  it('should add delegate', () => {
    const delegate = {id: 1, firstName: 'Test', lastName: 'Test', email: 'test@gmail.com'}
    store.dispatch(addDelegate(delegate));
    const delegates = (store.getState() as any).form.delegates;
    expect(delegates).toContain(delegate)
  })

  it('should set editing delegate', () => {
    const delegates = [{id: 1, firstName:'John', lastName: 'Smith', email: 'test@gmail.com'},
      {id: 2, firstName: 'Jane', lastName: 'Smith', email: 'test@gmail.com'}];
    store.dispatch(setDelegates(delegates));
    store.dispatch(setEditingDelegate(delegates[0]));
    const delegateBeingEdited = (store.getState() as any).form.editingDelegate;
    expect(delegateBeingEdited).toEqual(delegates[0])
    expect(delegateBeingEdited).not.toEqual(delegates[1])
  })

  it('should set setDisplayRequiredFieldsWarning', () => {
    store.dispatch(setDisplayRequiredFieldsWarning(true));
    const showWarning = (store.getState() as any).form.displayRequiredFieldsWarning;
    expect(showWarning).toBe(true)
  })

  it('resets form to initial state', () => {
    store.dispatch(resetForm());
    const state =(store.getState() as any).form;
    expect(state).toEqual(formReducer(undefined, {type: 'any'}))
  })

  it('should update inputKey when updateInputKey is dispatched ', () => {
    const currentKey = (store.getState() as any).form.inputKey;
    store.dispatch(updateInputKey());
    const key = (store.getState() as any).form.inputKey;
    expect(key).not.toEqual(currentKey)
  })

})
