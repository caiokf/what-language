export function closeSettings() {
  return (dispatch) => dispatch({ type: 'CLOSE_SETTINGS' });
}

export function openSettings() {
  return (dispatch) => dispatch({ type: 'OPEN_SETTINGS' });
}
