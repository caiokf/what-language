import { List, fromJS } from 'immutable';
import reducer from './options.reducer';

describe('options reducer', () => {
  describe('adding a language', () => {
    const noLanguagesState = fromJS({ languagesSpoken: List([]) });
    const englishLanguagesState = fromJS({ languagesSpoken: List(['en']) });

    it('should add a language', () => {
      const result = reducer(noLanguagesState, { type: 'HANDLE_LANGUAGE_INPUT', payload: 'en' });
      const languages = result.get('languagesSpoken').toArray();

      expect(languages.length).to.equal(1);
      expect(languages.find(x => x === 'en'))
        .to.not.be.empty;
    });

    it('should add a multiple languages', () => {
      const result = reducer(noLanguagesState, { type: 'HANDLE_LANGUAGE_INPUT', payload: 'zh en' });
      const languages = result.get('languagesSpoken').toArray();

      expect(languages.length).to.equal(2);
      expect(languages.find(x => x === 'en'))
        .to.not.be.empty;
      expect(languages.find(x => x === 'zh'))
        .to.not.be.empty;
    });

    it('should remove a language', () => {
      const result = reducer(englishLanguagesState, { type: 'HANDLE_LANGUAGE_INPUT', payload: '-en' });
      const languages = result.get('languagesSpoken').toArray();

      expect(languages).to.be.empty;
    });

    it('should do nothing when removing an inexisting language', () => {
      const result = reducer(englishLanguagesState, { type: 'HANDLE_LANGUAGE_INPUT', payload: '-ru' });
      const languages = result.get('languagesSpoken').toArray();

      expect(languages).to.deep.equal(englishLanguagesState.get('languagesSpoken').toArray());
    });

    it('should do work when trying to remove a language twice', () => {
      const result = reducer(englishLanguagesState, { type: 'HANDLE_LANGUAGE_INPUT', payload: '-en -en' });
      const languages = result.get('languagesSpoken').toArray();

      expect(languages).to.be.empty;
    });

    it('should not add a language twice', () => {
      const result = reducer(noLanguagesState, { type: 'HANDLE_LANGUAGE_INPUT', payload: 'en en' });
      const languages = result.get('languagesSpoken').toArray();

      expect(languages.length).to.equal(1);
      expect(languages.find(x => x === 'en'))
        .to.not.be.empty;
    });
  });
});
