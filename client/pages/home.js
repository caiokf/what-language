import React from "react";
import { connect } from 'react-redux';

import WorldMap from '../components/world-map/world.map';
import Settings from '../components/settings/settings.form';
import SettingsToggleButton from '../components/settings/settings.toggle.button';
import Statistics from '../components/statistics/statistics';

const mapStateToProps = (state) => {
  return { };
};

class Home extends React.Component {
  render() {
    return (
      <div className="container">
        <SettingsToggleButton />
        <WorldMap />
        <Statistics />
        <Settings />
      </div>
    );
  }
}

export default connect(mapStateToProps)(Home);
