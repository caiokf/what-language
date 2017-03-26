import React from "react";
import { connect } from 'react-redux';
import { openSettings } from '../../actions/screens.actions';
import Icon from '../icons/icon';

class ShareButton extends React.Component {
  render() {
    return (
      <button id="btn-settings-open" className="menu-bar-button" aria-label="Open settings form" onClick={ this.props.open }>
        <Icon icon="share" />
      </button>
    );
  }
}


const mapStateToProps = (state) => {
  return { opened: state.screens.get('settingsOpened') };
};

const mapDispatchToProps = (dispatch) => {
  return {
    open: () => dispatch(openSettings()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ShareButton);
