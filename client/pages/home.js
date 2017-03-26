import React from "react";
import { connect } from 'react-redux';
import { calculateStatistics } from '../actions/statistics.actions';
import { openSettings } from '../actions/screens.actions';
import WorldMap from '../components/world-map/world.map';
import Settings from '../components/settings/settings.form';
import MenuBar from '../components/menu-bar/menu.bar';
import Statistics from '../components/statistics/statistics';
import './home.sass';

class Home extends React.Component {
  componentWillMount() {
    this.props.calculateStatistics(this.props.languagesSpoken);
  }

  render() {
    const statistics = this.props.settingsOpened ? null : (<Statistics />);

    return (
      <div>
        <MenuBar />
        <div className={ this.props.settingsOpened ? 'home-container shrink' : 'home-container'}>
          <WorldMap />
          {statistics}
        </div>
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
    openSettings: () => dispatch(openSettings()),
    calculateStatistics: (languagesSpoken) => dispatch(calculateStatistics(languagesSpoken)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
