import React from "react";

import Datamap from '../datamap/datamap';

export default class WorldMap extends React.Component {
  constructor() {
    super();
    this.state = {
      data: {
        USA: { fillKey: 'canCommunicateTo', language: 'English' },
        JPN: { fillKey: 'canCommunicateTo', language: 'Japanase' },
        ITA: { fillKey: 'canCommunicateTo', language: 'Italian' },
        CRI: { fillKey: 'canCommunicateTo', language: 'English' },
        KOR: { fillKey: 'canCommunicateTo', language: 'Korean' },
        DEU: { fillKey: 'canCommunicateTo', language: 'German' }
      }
    };
  }

  componentDidMount() {
    this.update();
  }

  componentWillUnmount() {
    clearInterval(this.interval);
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
            highlightFillColor: 'rgba(51, 53, 51, 1)',
            highlightBorderColor: 'rgba(245, 203, 92, 1)',
            highlightBorderWidth: 1,
            borderWidth: 1,
            borderOpacity: 1,
            borderColor: 'rgba(232, 237, 223, 1)',
            popupTemplate: (geography, data) => {
              return `<div class='hoverinfo'>
                <strong>${geography.properties.name}</strong>
                <br>
                Languages: ${data ? data.language : 'N/A'}`;
            }
          }}
          data={this.state.data}
          fills={{
            defaultFill: 'rgba(36, 36, 35, 1)',
            canCommunicateTo: 'rgba(245, 203, 92, 1)'
          }}
          projection="mercator"
          updateChoroplethOptions={{ reset: false }}
        />
        </div>
      </div>
    );
  }
}
