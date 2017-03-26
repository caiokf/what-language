import React from "react";
import { connect } from 'react-redux';
import { closeSettings, openSettings } from '../../actions/screens.actions';
import Icon from '../icons/icon';
import './settings.button.sass';

class SettingsToggleButton extends React.Component {
  render() {
    if (this.props.opened) {
      return (
        <button id="btn-settings-close" className="menu-bar-button button-close-settings" aria-label="Close settings form" onClick={ this.props.close }>
          <Icon icon="cancel" />
        </button>
      );
    }

    return (
      <button id="btn-settings-open" className="menu-bar-button" aria-label="Open settings form" onClick={ this.props.open }>
        <Icon icon="settings" />
      </button>
    );
  }
}


const mapStateToProps = (state) => {
  return { opened: state.screens.get('settingsOpened') };
};

const mapDispatchToProps = (dispatch) => {
  return {
    close: () => dispatch(closeSettings()),
    open: () => dispatch(openSettings()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SettingsToggleButton);
