import React from "react";
import { connect } from 'react-redux';
import { calculateStatistics } from '../actions/statistics.actions';
import WorldMap from '../components/world-map/world.map';
import Settings from '../components/settings/settings.form';
import SettingsToggleButton from '../components/settings/settings.toggle.button';
import Statistics from '../components/statistics/statistics';

class Home extends React.Component {
  componentWillMount() {
    this.props.calculateStatistics(this.props.languagesSpoken);
  }

  render() {
    const statistics = this.props.settingsOpened ? null : (<Statistics />);

    return (
      <div className="container">
        <SettingsToggleButton />
        <WorldMap />
        {statistics}
        <Settings />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    settingsOpened: state.screens.get('settingsOpened'),
    languagesSpoken: state.options.get('languagesSpoken').toArray(),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    calculateStatistics: (languagesSpoken) => dispatch(calculateStatistics(languagesSpoken)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
