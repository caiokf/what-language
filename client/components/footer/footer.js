import React from 'react';
import { Col } from 'react-bootstrap';

export default class Footer extends React.Component {
  render() {
    return (
      <Col md={7}>
        <p>{ this.props.footerText }</p>
      </Col>
    );
  }
}
