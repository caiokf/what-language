import React from 'react';
import { connect } from 'react-redux';
import keydown, { Keys } from 'react-keydown';
import { closeSettings } from '../../actions/screens.actions';
import { handleLanguageInput } from '../../actions/options.actions';
import './settings.language.input.sass';

import styles from '../../styles/_colors.sass';

const { ENTER, ESCAPE } = Keys;

class SettingsLanguageInput extends React.Component {
  constructor(props, context) {
    super(props, context);

    console.log(styles);
    console.log(styles.$conch);
    this.state = {
      language: ''
    };
  }

  componentWillReceiveProps() {
     setTimeout(
       (() => { this.languageInput.focus(); }).bind(this), 500
     );
  }

  @keydown(ENTER, ESCAPE)
  handleInputKeydown(key) {
    if (key.which === ESCAPE) {
      this.props.close();
    } else if (key.which === ENTER) {
      this.enterLanguage();
    }
  }

  typing(e) {
    this.setState({ language: e.target.value });
  }

  enterLanguage() {
    this.props.handleLanguageInput(this.state.language);

    this.setState({ language: '' });
  }

  render() {
    return (
      <div className="settings__language-input-form">
        <span className="text-left settings__info settings__label">What languages can you speak?</span>
        <input className="settings__input"
          name="language"
          type="text"
          placeholder=""
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck="false"
          onChange={ this.typing.bind(this) }
          onKeyDown={ this.handleInputKeydown }
          value={this.state.language}
          ref={(input) => { this.languageInput = input; }} />
        <span className="text-right settings__info">Type here the languages you speak. You can enter language name or ISO code.</span>
        <span className="text-right settings__info">Remove languages by adding a hyphen &quot;-&quot; in front of it.</span>
        <span className="text-right settings__info">Examples:
          &quot;English&quot; |
          &quot;en&quot; |
          &quot;eng&quot; |
          &quot;-Spanish&quot; |
          &quot;-es&quot;.
        </span>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    opened: state.screens.get('settingsOpened'),
    languagesSpoken: state.options.get('languagesSpoken').toArray(),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    close: () => dispatch(closeSettings()),
    handleLanguageInput: (x) => dispatch(handleLanguageInput(x)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SettingsLanguageInput);
