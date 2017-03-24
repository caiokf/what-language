export function closeSettings(type, id) {
  return (dispatch) => dispatch({ type: 'CLOSE_SETTINGS' });
}

export function openSettings(type, id) {
  return (dispatch) => dispatch({ type: 'OPEN_SETTINGS' });
}
