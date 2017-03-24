import React from "react";
import { connect } from 'react-redux';
import _ from 'lodash';
import { calculateStatistics } from '../../actions/statistics.actions';
import Datamap from '../datamap/datamap';
import countriesData from '../../data/countries';

class WorldMap extends React.Component {
  componentWillMount() {
    this.colors = {
      conch: 'rgba(207, 219, 213, 1)',
      periglacialBlue: 'rgba(232, 237, 223, 1)',
      goldYellow: 'rgba(245, 203, 92, 1)',
      codGray: 'rgba(36, 36, 35, 1)',
      heavyMetal: 'rgba(51, 53, 51, 1)',
    }
  }

  renderPopup(geography, data) {
    return `<div class='hoverinfo'>
      <strong>${data.name}</strong>
      <br>
      Languages: ${data.languages.join(', ')};
      <br>
      Population: ${data.population}`;
  }

  render() {
    return (
      <div className="container">
        <div className="world-map">
          <Datamap
            data={this.props.mapData}
            projection="mercator"
            responsive
            updateChoroplethOptions={{ reset: false }}
            fills={{
              defaultFill: this.colors.codGray,
              canCommunicateTo: this.colors.goldYellow
            }}
            geographyConfig={{
              popupOnHover: true,
              highlightOnHover: true,
              highlightFillColor: this.colors.heavyMetal,
              highlightBorderColor: this.colors.goldYellow,
              highlightBorderWidth: 1,
              borderWidth: 0.25,
              borderOpacity: 0.5,
              borderColor: 'rgba(232, 237, 223, 1)',
              popupTemplate: this.renderPopup
            }}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    mapData: state.statistics.get('mapData'),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    calculateStatistics: (languagesSpoken) => dispatch(calculateStatistics(languagesSpoken)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(WorldMap);
