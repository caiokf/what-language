import React from 'react';
import NumberFormat from 'react-number-format';
import { connect } from 'react-redux';
import './statistics.sass';

class Statistics extends React.Component {
  render() {
    const peoplePercentage = (this.props.howManyPeople/this.props.totalPeople) * 100;
    const countriesPercentage = (this.props.howManyCountries/this.props.totalCountries) * 100
    return (
      <div className="statistics">
        <h3>
          <span>You can speak to: </span>
          <NumberFormat
            value={this.props.howManyPeople}
            displayType={'text'}
            thousandSeparator={true} />
          <span> people (</span>
          <NumberFormat
            value={peoplePercentage}
            displayType={'text'}
            decimalPrecision={2}
            suffix={'%'} />
          <span>)</span>
          <br />

          <span>in </span>
          <NumberFormat
            value={this.props.howManyCountries}
            displayType={'text'}
            thousandSeparator={true} />
          <span> countries (</span>
          <NumberFormat
            value={countriesPercentage}
            displayType={'text'}
            decimalPrecision={2}
            suffix={'%'} />
          <span>)</span>
        </h3>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    howManyPeople: state.statistics.getIn(['canSpeakTo', 'people']),
    totalPeople:state.statistics.getIn(['world', 'people']),
    howManyCountries:state.statistics.getIn(['canSpeakTo', 'countries']),
    totalCountries: state.statistics.getIn(['world', 'countries']),
  };
};

export default connect(mapStateToProps)(Statistics);
