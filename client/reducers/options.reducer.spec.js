import { List, fromJS } from 'immutable';
import reducer from './options.reducer';

describe('options reducer', () => {
  const languages = (initialLanguages, input) => {
    const initialState = fromJS({ languagesSpoken: List(initialLanguages) });
    const result = reducer(initialState, { type: 'HANDLE_LANGUAGE_INPUT', payload: input });
    return result.get('languagesSpoken').toArray();
  }

  describe('adding a language', () => {
    it('should add a language', () => {
      expect(languages([], 'en')).to.deep.equal(['en']);
    });

    it('should add a multiple languages', () => {
      expect(languages([], 'en zh')).to.deep.equal(['en', 'zh']);
    });

    it('should not count trailing whitespaces', () => {
      expect(languages([], '   en zh   ')).to.deep.equal(['en', 'zh']);
    });

    it('should not count whitespaces in the middle of the input', () => {
      expect(languages([], 'en    zh')).to.deep.equal(['en', 'zh']);
    });

    it('should not add a language twice', () => {
      expect(languages([], 'en en')).to.deep.equal(['en']);
    });

    it('should be able to add language by name', () => {
      expect(languages([], 'english')).to.deep.equal(['en']);
    });

    it('should be able to add language by name capitalized', () => {
      expect(languages([], 'English')).to.deep.equal(['en']);
    });

    it('should be able to add language by name with any casing', () => {
      expect(languages([], 'EnGlIsH')).to.deep.equal(['en']);
    });

    it('should be able to add language by ISO 639-2 Alpha-3 (bibliographic term)', () => {
      expect(languages([], 'eng')).to.deep.equal(['en']);
    });
  });

  describe('removing a language', () => {
    it('should remove a language', () => {
      expect(languages(['en'], '-en')).to.deep.equal([]);
    });

    it('should remove only the requested language', () => {
      expect(languages(['en', 'it'], '-en')).to.deep.equal(['it']);
    });

    it('should do nothing when removing an inexisting language', () => {
      expect(languages(['en'], '-ru')).to.deep.equal(['en']);
    });

    it('should work when trying to remove a language twice', () => {
      expect(languages(['en'], '-en -en')).to.deep.equal([]);
    });

    it('should be able to remove a language by name', () => {
      expect(languages(['en'], '-english')).to.deep.equal([]);
    });

    it('should be able to remove language by name capitalized', () => {
      expect(languages(['en'], '-English')).to.deep.equal([]);
    });

    it('should be able to remove language by name with any casing', () => {
      expect(languages(['en'], '-EnGliSh')).to.deep.equal([]);
    });

    it('should be able to remove language by ISO 639-2 Alpha-3 (bibliographic term)', () => {
      expect(languages(['en'], '-eng')).to.deep.equal([]);
    });
  });

  describe('edge cases', () => {
    it('should do nothing when adding an unknown language', () => {
      expect(languages(['en'], 'xx')).to.deep.equal(['en']);
      expect(languages(['en'], 'xxx')).to.deep.equal(['en']);
      expect(languages(['en'], 'BlaBlaNotExisting')).to.deep.equal(['en']);
      expect(languages(['en'], 'something weird')).to.deep.equal(['en']);
    });

    it('should do nothing when removing an unknown language', () => {
      expect(languages(['en'], '-xx')).to.deep.equal(['en']);
      expect(languages(['en'], '-xxx')).to.deep.equal(['en']);
      expect(languages(['en'], '-BlaBlaNotExisting')).to.deep.equal(['en']);
      expect(languages(['en'], '-something weird')).to.deep.equal(['en']);
    });

    it('should do nothing when strange inputs are typed', () => {
      expect(languages(['en'], '--')).to.deep.equal(['en']);
      expect(languages(['en'], '---')).to.deep.equal(['en']);
      expect(languages(['en'], '- - - - ')).to.deep.equal(['en']);
      expect(languages(['en'], '@#$%ˆ&')).to.deep.equal(['en']);
    });
  })
});
