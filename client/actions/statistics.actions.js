export function calculateStatistics(languagesSpoken) {
  return (dispatch) => dispatch({ type: 'CALCULATE_STATISTICS', payload: languagesSpoken });
}
