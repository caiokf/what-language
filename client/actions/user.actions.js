export function addLanguage(language) {
  return (dispatch) => dispatch({ type: 'ADD_SPOKEN_LANGUAGE', payload: language });
}

export function removeLanguage(language) {
  return (dispatch) => dispatch({ type: 'REMOVE_SPOKEN_LANGUAGE', payload: language });
}
