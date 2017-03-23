import axios from 'axios';

export function fetchResource(type, id) {
  return function(dispatch) {
    axios.get('/api')
      .then((response) => {
        dispatch({ type: 'FETCH', payload: response });
      })
      .catch((err) => {
        dispatch({ type: 'FETCH_REJECTED', payload: err });
      });
  };
}
