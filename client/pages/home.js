import React from "react";

import WorldMap from '../components/world-map/world.map';

export default class Home extends React.Component {
  render() {
    return (
      <div className="container">
        <WorldMap />
      </div>
    );
  }
}
