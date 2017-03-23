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
            highlightBorderColor: '#bada55',
            popupTemplate: (geography, data) => {
              return `<div class='hoverinfo'>${geography.properties.name}\nLanguages: ${data ? data.language : 'N/A'}`;
            },
            highlightBorderWidth: 3
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
