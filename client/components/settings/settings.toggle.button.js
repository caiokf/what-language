import React from "react";
import { connect } from 'react-redux';
import { closeSettings, openSettings } from '../../actions/settings.actions';
import Icon from '../icons/icon';
import './settings.toggle.button.sass';

const mapStateToProps = (state) => {
  return { opened: state.settings.get('opened') };
};

const mapDispatchToProps = (dispatch) => {
  return {
    close: () => dispatch(closeSettings()),
    open: () => dispatch(openSettings()),
  };
};

class SettingsToggleButton extends React.Component {
  render() {
    if (this.props.opened) {
      return (
        <button id="btn-settings-close" className="btn--settings close" aria-label="Close settings form" onClick={ this.props.close }>
          <Icon icon="cancel" />
        </button>
      );
    }

    return (
      <button id="btn-settings-open" className="btn--settings open" aria-label="Open settings form" onClick={ this.props.open }>
        <Icon icon="settings" />
      </button>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SettingsToggleButton);
