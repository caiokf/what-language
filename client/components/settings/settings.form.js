import React from 'react';
import { connect } from 'react-redux';
import { Col, Row } from 'react-bootstrap';
import keydown from 'react-keydown';
import SettingsLanguageInput from './settings.language.input';
import Checkbox from './checkbox';
import { closeSettings } from '../../actions/screens.actions';
import { unofficialLanguagesOption } from '../../actions/options.actions';

import './settings.form.sass';

class Settings extends React.Component {

  @keydown('esc')
  escape() {
    this.props.close();
  }

  componentClasses() {
    if (this.props.opened) {
      return 'centered settings settings--open';
    }

    return 'centered settings settings--closed';
  }

  render() {
    const languageElements = this.props.languagesSpoken.map(x => {
      return (
        <span className="language" key={x}>#{x}</span>
      );
    });

    return (
      <div className={this.componentClasses()}>
        <SettingsLanguageInput />

        <Row className="settings__controls">
          <Col md={6} className="settings__controls-panel settings__languages">
            <h3> &#x21FE; Languages you can speak</h3>
            <div className="contents">
              {languageElements}
            </div>
          </Col>
          <Col md={6} className="settings__controls-panel settings__options">
            <h3>&#x21FE; Some different options?</h3>
            <div className="contents">
              <div>
                <Checkbox
                  checked={ this.props.unofficial }
                  onChange={ this.props.unofficialLanguagesOption }>
                  Mark countries by unofficial spoken languages also
                </Checkbox>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    opened: state.screens.get('settingsOpened'),
    languagesSpoken: state.options.get('languagesSpoken'),
    unofficial: state.options.get('markCountriesByUnofficialLanguages'),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    close: () => dispatch(closeSettings()),
    unofficialLanguagesOption: (value) => dispatch(unofficialLanguagesOption(value)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
