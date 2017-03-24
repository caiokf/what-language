import React from 'react';
import { connect } from 'react-redux';

import './settings.language.input.sass';

class SettingsLanguageInput extends React.Component {
  componentWillReceiveProps() {
     setTimeout(
       (() => { this.languageInput.focus(); }).bind(this), 500
     );
  }

  render() {
    return (
      <form className="settings__form" action="">
        <span className="settings__info settings__label">What languages can you speak?</span>
        <input className="settings__input"
          name="language"
          type="text"
          placeholder=""
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck="false"
          ref={(input) => { this.languageInput = input; }} />
        <span className="settings__info">Hit enter to settings or ESC to close</span>
      </form>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    opened: state.settings.get('opened'),
    languagesSpoken: state.user.get('languagesSpoken'),
  };
};

export default connect(mapStateToProps)(SettingsLanguageInput);
