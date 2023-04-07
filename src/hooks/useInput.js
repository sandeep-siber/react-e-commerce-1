import { useReducer } from 'react';

const initialInputState = {
  value: '',
  isTouched: false,
};

function inputStateReducer(state, action) {
  if (action.type === 'INPUT') {
    return { value: action.value, isTouched: state.isTouched };
  }

  if (action.type === 'BLUR') {
    return { isTouched: true, value: state.value };
  }

  if (action.type === 'RESET') {
    return { isTouched: false, value: '' };
  }

  return initialInputState;
}

function useInput(validateValue) {
  const [inputState, dispatch] = useReducer(
    inputStateReducer,
    initialInputState
  );

  const valueIsValid = validateValue(inputState.value);
  const hasError = !valueIsValid && inputState.isTouched;

  function valueChangeHandler(event) {
    dispatch({ type: 'INPUT', value: event.target.value });
  }

  function inputBlurHandler(event) {
    dispatch({ type: 'BLUR' });
  }

  function reset() {
    dispatch({ type: 'RESET' });
  }

  return {
    value: inputState.value,
    hasError,
    valueChangeHandler,
    inputBlurHandler,
    isValid: valueIsValid,
    reset,
  };
}

export default useInput;
