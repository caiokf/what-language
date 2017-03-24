import React from 'react';
import { connect } from 'react-redux';
import Icon from '../icons/icon';
import SettingsLanguageInput from './settings.language.input';

import './settings.form.sass';

class Settings extends React.Component {
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
        <div className="settings__related">
          <div className="settings__suggestion">
            <h3>Languages you can speak</h3>
            <div>
              {languageElements}
            </div>
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
  return {
    opened: state.settings.get('opened'),
    languagesSpoken: state.user.get('languagesSpoken'),
  };
};

export default connect(mapStateToProps)(Settings);
