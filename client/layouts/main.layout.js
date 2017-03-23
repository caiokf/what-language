import React from "react";

import Footer from "../components/footer";
import Navigation from "../components/navigation"

import './main.layout.sass';

const MainLayout = React.createClass({
  render() {
    return (
      <div className="app">
        <Navigation />
        <main>
          {this.props.children}
        </main>
        <Footer footerText="This site was built with react!" />
      </div>
    );
  }
});

export default MainLayout;
