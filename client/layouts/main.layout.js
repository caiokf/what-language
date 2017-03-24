import React from 'react';

import Footer from '../components/footer/footer';
import Header from '../components/header/header';
import SvgIconRefs from '../components/svg-icon-refs/svg.icon.refs';

import './main.layout.sass';

export default class MainLayout extends React.Component {
  render() {
    return (
      <div className="app">
        <SvgIconRefs />
        <div>
          {this.props.children}
        </div>
        <Footer footerText="This site was built with react!" />
      </div>
    );
  }
}
