import React from 'react';
import NumberFormat from 'react-number-format';
import { connect } from 'react-redux';
import Icon from '../icons/icon';
import './statistics.sass';

class Statistics extends React.Component {
  render() {
    const peoplePercentage = (this.props.howManyPeople/this.props.totalPeople) * 100;
    const countriesPercentage = (this.props.howManyCountries/this.props.totalCountries) * 100
    return (
      <div className="statistics">
        <div className="statistics__item-container centered col-xs-12 col-sm-6"
          style={{
            backgroundColor: "var(--bg-color1)",
            flex: 1,
            flexDirection: "column"
          }}>
          <div>
            <Icon icon="chat" style={{ flex: 1 }}/>
            <NumberFormat className="main-value"
              value={this.props.howManyPeople}
              displayType={'text'}
              thousandSeparator={true} />
          </div>
          <div>
            <span> people you can speak to (</span>
            <NumberFormat
              value={peoplePercentage}
              displayType={'text'}
              decimalPrecision={2}
              suffix={'%'} />
            <span>)</span>
          </div>
        </div>

        <div className="statistics__item-container centered col-xs-12 col-sm-6"
          style={{
            backgroundColor: "var(--bg-color2)",
            flex: 1,
            flexDirection: "column"
          }}>
          <div>
            <Icon icon="location" style={{ flex: 1 }}/>
            <NumberFormat className="main-value"
              value={this.props.howManyCountries}
              displayType={'text'}
              thousandSeparator={true} />
          </div>
          <div>
            <span> countries (</span>
            <NumberFormat
              value={countriesPercentage}
              displayType={'text'}
              decimalPrecision={2}
              suffix={'%'} />
            <span>)</span>
          </div>
        </div>
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
