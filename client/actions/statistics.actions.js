export function calculateStatistics(languagesSpoken) {
  return (dispatch, getState) => {
    const languages = languagesSpoken || getState().options.get('languagesSpoken').toArray();

    dispatch({ type: 'CALCULATE_STATISTICS', payload: {
      languages: languages,
      options: {
        unofficial: getState().options.get('markCountriesByUnofficialLanguages'),
      },
    }});
  };
}
