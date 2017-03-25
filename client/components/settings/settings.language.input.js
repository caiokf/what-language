import React from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import keydown, { Keys } from 'react-keydown';
import { closeSettings } from '../../actions/screens.actions';
import { addLanguage, removeLanguage } from '../../actions/options.actions';
import './settings.language.input.sass';

const { ENTER, ESCAPE } = Keys;

class SettingsLanguageInput extends React.Component {
  constructor(props, context) {
    super(props, context);

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
    const entered = this.state.language;
    entered
      .split(' ')
      .filter(x => !_.isEmpty(x))
      .map(x => x.toLowerCase())
      .map(x => x.trim())
      .forEach(word => {
        if (word.indexOf('-') === 0) {
          word = word.slice(1, word.length);
          this.props.removeLanguage(word);
        } else {
          this.props.addLanguage(word);
        };
      })

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
        <span className="text-right settings__info">Hit enter to settings or ESC to close</span>
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
    addLanguage: (x) => dispatch(addLanguage(x)),
    removeLanguage: (x) => dispatch(removeLanguage(x)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SettingsLanguageInput);
