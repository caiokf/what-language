import React from 'react';
import { connect } from 'react-redux';
import { Col, Row } from 'react-bootstrap';
import keydown from 'react-keydown';
import Icon from '../icons/icon';
import SettingsLanguageInput from './settings.language.input';
import { closeSettings } from '../../actions/settings.actions';

import './settings.form.sass';

class Settings extends React.Component {

  @keydown('esc')
  escape(event) {
    this.props.close();
  }

  componentClasses() {
    if (this.props.opened) {
      return 'settings settings--open';
    }

    return 'settings settings--closed';
  }

  render() {
    const languageElements = this.props.languagesSpoken.map(x => {
      return (
        <div key={x}>#{x}</div>
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
              <div>[ x ] Use only official languages</div>
              <div>[ x ] Some other option</div>
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    opened: state.settings.get('opened'),
    languagesSpoken: state.user.get('languagesSpoken'),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    close: () => dispatch(closeSettings()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
