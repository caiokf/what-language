import { calculateStatistics } from './statistics.actions';

export function handleLanguageInput(language) {
  return (dispatch, getState) => {
    dispatch({ type: 'HANDLE_LANGUAGE_INPUT', payload: language });
    calculateStatistics()(dispatch, getState);
  }
}

export function unofficialLanguagesOption(value) {
  return (dispatch, getState) => {
    dispatch({ type: 'UNOFFICIAL_LANGUAGES_OPTION', payload: value });
    calculateStatistics()(dispatch, getState);
  }
}
