import React from "react";
import { Link } from "react-router";
import { Navbar, Nav, NavItem} from "react-bootstrap";

const Navigation = React.createClass({
  render: function() {
    return (
      <nav className="navbar navbar-inverse navbar-fixed-top">
        <div className="container-fluid">
          <div className="navbar-header">
            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
            <Link className="navbar-brand" to="/">Koa-React-Starter</Link>
          </div>
          <div id="navbar" className="navbar-collapse collapse">

          </div>
        </div>
      </nav>
    );
  }
});

export default Navigation;
