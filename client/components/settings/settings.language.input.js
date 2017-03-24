import React from 'react';
import { connect } from 'react-redux';
import keydown, { Keys } from 'react-keydown';
import { closeSettings } from '../../actions/settings.actions';
import { addLanguage, removeLanguage, calculateStatistics } from '../../actions/statistics.actions';
import './settings.language.input.sass';

const { ENTER, ESCAPE } = Keys;

class SettingsLanguageInput extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      language: ''
    };
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
    let entered = this.state.language.trim();

    if (entered.indexOf('-') === 0) {
      entered = entered.slice(1, entered.length);
      this.props.removeLanguage(entered);
    } else {
      this.props.addLanguage(entered);
    }

    this.setState({ language: '' });
  }

  componentWillReceiveProps() {
     setTimeout(
       (() => { this.languageInput.focus(); }).bind(this), 500
     );
  }

  render() {
    return (
      <div className="settings__form">
        <span className="settings__info settings__label">What languages can you speak?</span>
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
        <span className="settings__info">Hit enter to settings or ESC to close</span>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    opened: state.settings.get('opened'),
    languagesSpoken: state.statistics.get('languagesSpoken').toArray(),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    close: () => dispatch(closeSettings()),
    addLanguage: (x) => dispatch(addLanguage(x)),
    removeLanguage: (x) => dispatch(removeLanguage(x)),
    calculateStatistics: (languagesSpoken) => dispatch(calculateStatistics(languagesSpoken)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SettingsLanguageInput);
