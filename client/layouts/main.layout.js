import React from 'react';
import Footer from '../components/footer/footer';
import SvgIconRefs from '../components/icons/svg.icon.refs';
import GithubCorner from '../components/icons/github.corner';

import './main.layout.sass';

export default class MainLayout extends React.Component {
  render() {
    return (
      <div className="app">
        <SvgIconRefs />
        <GithubCorner />
        <div>
          {this.props.children}
        </div>
        <Footer footerText="Some footer" />
      </div>
    );
  }
}
