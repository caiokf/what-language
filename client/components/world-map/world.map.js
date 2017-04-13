import React from "react";
import { connect } from 'react-redux';
import Datamap from '../datamap/datamap';
import './world.map.sass';


function addCommas(data) {
  const a = data.toString().split('').reverse();
  let b = a.map((n, i) => (i !== 0 && i % 3 === 0 ? n + ',' : n));
  return b.reverse().join('');
}


class WorldMap extends React.Component {

  renderPopup(geography, data) {
    return `<div class='hoverinfo country-info'>
      <div class='hover-title'>${data.name}</div>
      Main Langs: ${data.languages.join(', ')}
      ${data.unofficialLanguages.length > 0 ? (`<br>
      Unofficial Langs: ${data.unofficialLanguages.join(', ')}`) : ''}
      <br>
      Population: ${addCommas(data.population)}
      </div>`;
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
              defaultFill: this.props.colors.pineapple,
              canCommunicateTo: this.props.colors.mediumAquamarine,
              canCommunicateToUnofficially: this.props.colors.mediumSpring
            }}
            geographyConfig={{
              popupOnHover: true,
              highlightOnHover: true,
              highlightFillColor: this.props.colors.independence,
              highlightBorderColor: this.props.colors.steelBlue,
              highlightBorderWidth: 1,
              borderWidth: 0.25,
              borderOpacity: 0.5,
              borderColor: this.props.colors.steelBlue,
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
