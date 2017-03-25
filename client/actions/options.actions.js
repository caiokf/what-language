export function addLanguage(language) {
  return (dispatch, getState) => {
    dispatch({ type: 'ADD_SPOKEN_LANGUAGE', payload: language });
    const languages = getState().options.get('languagesSpoken').toArray();
    dispatch({ type: 'CALCULATE_STATISTICS', payload: languages });
  }
}

export function removeLanguage(language) {
  return (dispatch, getState) => {
    dispatch({ type: 'REMOVE_SPOKEN_LANGUAGE', payload: language });
    const languages = getState().options.get('languagesSpoken').toArray();
    dispatch({ type: 'CALCULATE_STATISTICS', payload: languages });
  }
}
