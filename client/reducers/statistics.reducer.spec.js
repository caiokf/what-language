import { fromJS } from 'immutable';
import reducer from './statistics.reducer';

describe('statistics reducer', () => {
  const initialState = fromJS({
    canSpeakTo: {
      people: 0,
      countries: 0,
      languages: 0,
    },
    world: {
      people: 0,
      countries: 0,
      languages: 0,
    },
    mapData: {},
    countriesData: [
      {
        id: 'GBR',
        name: 'United Kingdom',
        population: 1000,
        languages: ['en', 'fr'],
        unofficialLanguages: ['zh']},
      {
        id: 'ESP',
        name: 'Spain',
        population: 500,
        languages: ['es']},
    ],
  });

  describe('calculating statistics', () => {
    it('how many countries a person can communicate in', () => {
      const result = reducer(initialState, { type: 'CALCULATE_STATISTICS', payload: ['en'] });

      expect(result.getIn(['canSpeakTo', 'countries'])).to.equal(1);
      expect(result.getIn(['canSpeakTo', 'people'])).to.equal(1000);
    });

    it('should not count countries twice', () => {
      const result = reducer(initialState, { type: 'CALCULATE_STATISTICS', payload: ['en', 'fr'] });

      expect(result.getIn(['canSpeakTo', 'countries'])).to.equal(1);
      expect(result.getIn(['canSpeakTo', 'people'])).to.equal(1000);
    });

    it('should count unofficial languages', () => {
      const result = reducer(initialState, { type: 'CALCULATE_STATISTICS', payload: ['zh'] });

      expect(result.getIn(['canSpeakTo', 'countries'])).to.equal(1);
      expect(result.getIn(['canSpeakTo', 'people'])).to.equal(1000);
    });

    it('should not count official and unofficial languages twice', () => {
      const result = reducer(initialState, { type: 'CALCULATE_STATISTICS', payload: ['en', 'zh'] });

      expect(result.getIn(['canSpeakTo', 'countries'])).to.equal(1);
      expect(result.getIn(['canSpeakTo', 'people'])).to.equal(1000);
    });

    it('should not fail when there is no unofficialLanguages', () => {
      const state = initialState.setIn(['countriesData', '0', 'unofficialLanguages'], undefined);
      const result = reducer(state, { type: 'CALCULATE_STATISTICS', payload: ['en', 'zh'] });

      expect(result.getIn(['canSpeakTo', 'countries'])).to.equal(1);
      expect(result.getIn(['canSpeakTo', 'people'])).to.equal(1000);
    });
  });

  describe('map properties', () => {
    it('should mark countries that overlap official language with user spoken languages', () => {
      const result = reducer(initialState, { type: 'CALCULATE_STATISTICS', payload: ['en'] });

      expect(result.toJS().mapData['GBR'].fillKey).to.equal('canCommunicateTo');
    });

    it('should mark with different color countries that overlap unofficial language with user spoken languages', () => {
      const result = reducer(initialState, { type: 'CALCULATE_STATISTICS', payload: ['zh'] });

      expect(result.toJS().mapData['GBR'].fillKey).to.equal('canCommunicateToUnofficially');
    });
  });
});
