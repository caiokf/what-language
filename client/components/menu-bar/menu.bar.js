import React from "react";
import { connect } from 'react-redux';
import SettingsButton from './settings.button';
import './menu.bar.sass';

class MenuBar extends React.Component {
  render() {
    if (this.props.opened) {
      return (
        <div className="menu-bar">
          <SettingsButton />
        </div>
      );
    }

    return (
      <div className="menu-bar">
        <SettingsButton />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { opened: state.screens.get('settingsOpened') };
};

export default connect(mapStateToProps)(MenuBar);
