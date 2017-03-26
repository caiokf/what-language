export function handleLanguageInput(language) {
  return (dispatch, getState) => {
    dispatch({ type: 'HANDLE_LANGUAGE_INPUT', payload: language });
    const languages = getState().options.get('languagesSpoken').toArray();
    dispatch({ type: 'CALCULATE_STATISTICS', payload: languages });
  }
}
