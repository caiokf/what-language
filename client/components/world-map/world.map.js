import React from "react";
import _ from 'lodash';

import Datamap from '../datamap/datamap';
import countriesData from '../../data/countries';

export default class WorldMap extends React.Component {
  constructor() {
    super();

    this.languagesSpoken = [ 'en', 'pt', 'es', 'ru' ];

    this.colors = {
      conch: 'rgba(207, 219, 213, 1)',
      periglacialBlue: 'rgba(232, 237, 223, 1)',
      goldYellow: 'rgba(245, 203, 92, 1)',
      codGray: 'rgba(36, 36, 35, 1)',
      heavyMetal: 'rgba(51, 53, 51, 1)',
    }

    this.fillState();
  }

  fillState() {
    const world = {};
    let howManyPeople = 0;
    let howManyCountries = 0;
    let totalPeople = 0;
    let totalCountries = 0;

    _.each(countriesData, country => {
      world[country.id] = country;

      if (_.intersection(this.languagesSpoken, country.languages).length > 0) {
        world[country.id].fillKey = 'canCommunicateTo';
        howManyPeople += country.population;
        howManyCountries += 1;
      }

      totalPeople += country.population;
      totalCountries += 1;
    });

    this.state = {
      data: world,
      howManyPeople,
      howManyCountries,
      totalPeople,
      totalCountries
    };
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
          data={this.state.data}
          fills={{
            defaultFill: this.colors.codGray,
            canCommunicateTo: this.colors.goldYellow
          }}
          projection="mercator"
          updateChoroplethOptions={{ reset: false }}
        />
        </div>
        <h3 style={{ color: this.colors.goldYellow, textAlign: 'center' }}>
          You can speak to: {this.state.howManyPeople} people ({ (this.state.howManyPeople/this.state.totalPeople) * 100 }%)<br />
          in {this.state.howManyCountries} countries ({ (this.state.howManyCountries/this.state.totalCountries) * 100 }%)
        </h3>
      </div>
    );
  }
}
