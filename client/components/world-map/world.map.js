import React from "react";

import Datamap from '../datamap/datamap';

export default class WorldMap extends React.Component {
  constructor() {
    super();
    this.state = {
      data: {
        USA: { fillKey: 'canCommunicateTo' },
        JPN: { fillKey: 'canCommunicateTo' },
        ITA: { fillKey: 'canCommunicateTo' },
        CRI: { fillKey: 'canCommunicateTo' },
        KOR: { fillKey: 'canCommunicateTo' },
        DEU: { fillKey: 'canCommunicateTo' }
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
          height="700"
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
