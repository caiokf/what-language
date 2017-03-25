import React from 'react';
import { Col } from 'react-bootstrap';
import { connect } from 'react-redux';
import { openSettings } from '../../actions/screens.actions';
import Icon from '../icons/icon';

class Footer extends React.Component {
  render() {
    return (
      <Col md={7}>
        <p>{ this.props.footerText }</p>
      </Col>
    );
  }
}

const mapStateToProps = (state) => {
  return { };
};

export default connect(mapStateToProps)(Footer);

Footer.propTypes = {
  footerText: React.PropTypes.string
};
