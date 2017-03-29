import React from "react";
import { connect } from 'react-redux';
import Datamap from '../datamap/datamap';

class WorldMap extends React.Component {
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
              defaultFill: this.props.colors.codGray,
              canCommunicateTo: this.props.colors.goldYellow,
              canCommunicateToUnofficially: this.props.colors.tacao
            }}
            geographyConfig={{
              popupOnHover: true,
              highlightOnHover: true,
              highlightFillColor: this.props.colors.heavyMetal,
              highlightBorderColor: this.props.colors.goldYellow,
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
    colors: state.colors
  };
};

export default connect(mapStateToProps)(WorldMap);
