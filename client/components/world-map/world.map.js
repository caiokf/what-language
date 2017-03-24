import React from "react";
import { connect } from 'react-redux';
import _ from 'lodash';
import { calculateStatistics } from '../../actions/statistics.actions';
import Datamap from '../datamap/datamap';
import countriesData from '../../data/countries';

class WorldMap extends React.Component {
  componentWillMount() {
    this.props.calculateStatistics(this.props.languagesSpoken);

    this.colors = {
      conch: 'rgba(207, 219, 213, 1)',
      periglacialBlue: 'rgba(232, 237, 223, 1)',
      goldYellow: 'rgba(245, 203, 92, 1)',
      codGray: 'rgba(36, 36, 35, 1)',
      heavyMetal: 'rgba(51, 53, 51, 1)',
    }
  }

  render() {
    return (
      <div className="container">
        <div className="world-map">
        <Datamap
          responsive
          geographyConfig={{
            popupOnHover: true,
            highlightOnHover: true,
            highlightFillColor: this.colors.heavyMetal,
            highlightBorderColor: this.colors.goldYellow,
            highlightBorderWidth: 1,
            borderWidth: 0.25,
            borderOpacity: 0.5,
            borderColor: 'rgba(232, 237, 223, 1)',
            popupTemplate: (geography, data) => {
              return `<div class='hoverinfo'>
                <strong>${data.name}</strong>
                <br>
                Languages: ${data.languages.join(', ')};
                <br>
                Population: ${data.population}`;
            }
          }}
          data={this.props.mapData}
          fills={{
            defaultFill: this.colors.codGray,
            canCommunicateTo: this.colors.goldYellow
          }}
          projection="mercator"
          updateChoroplethOptions={{ reset: false }}
        />
        </div>
        <h3 style={{ color: this.colors.goldYellow, textAlign: 'center' }}>
          You can speak to: {this.props.howManyPeople} people ({ (this.props.howManyPeople/this.props.totalPeople) * 100 }%)<br />
          in {this.props.howManyCountries} countries ({ (this.props.howManyCountries/this.props.totalCountries) * 100 }%)
        </h3>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    languagesSpoken: state.user.get('languagesSpoken').toArray(),
    mapData: state.statistics.get('mapData'),
    howManyPeople: state.statistics.getIn(['canSpeakTo', 'people']),
    totalPeople:state.statistics.getIn(['world', 'people']),
    howManyCountries:state.statistics.getIn(['canSpeakTo', 'countries']),
    totalCountries: state.statistics.getIn(['world', 'countries']),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    calculateStatistics: (languagesSpoken) => dispatch(calculateStatistics(languagesSpoken)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(WorldMap);
