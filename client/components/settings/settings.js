import React from 'react';
import { connect } from 'react-redux';
import Icon from '../icons/icon';
import './settings.sass';

class Settings extends React.Component {
  componentClasses() {
    if (this.props.opened) {
      return 'settings settings--open';
    }

    return 'settings settings--closed';
  }

  render() {
    return (
      <div className={this.componentClasses()}>
        <form className="settings__form" action="">
          <input className="settings__input" name="settings" type="text" placeholder="" autoComplete="off" autoCorrect="off" autoCapitalize="off" spellCheck="false" />
          <span className="settings__info">Hit enter to settings or ESC to close</span>
        </form>

        <div className="settings__related">
          <div className="settings__suggestion">
            <h3>May We Suggest?</h3>
            <p>#drone #funny #catgif #broken #lost #hilarious #good #red #blue #nono #why #yes #yesyes #aliens #green</p>
          </div>
          <div className="settings__suggestion">
            <h3>Needle, Where Art Thou?</h3>
            <p>#broken #lost #good #red #funny #lala #hilarious #catgif #blue #nono #why #yes #yesyes #aliens #green #drone</p>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { opened: state.settings.get('opened') };
};

export default connect(mapStateToProps)(Settings);
