import React from "react";
import { connect } from 'react-redux';
import './statistics.sass';

class Statistics extends React.Component {
  render() {
    return (
      <div className="statistics">
        <h3>
          You can speak to: {this.props.howManyPeople} people ({ (this.props.howManyPeople/this.props.totalPeople) * 100 }%)<br />
          in {this.props.howManyCountries} countries ({ (this.props.howManyCountries/this.props.totalCountries) * 100 }%)
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
