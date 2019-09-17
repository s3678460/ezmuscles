import React, { Component } from "react";
import logo from "./../logo.svg";
import { Link } from "react-router-dom";
export default class ReactApp extends Component {
  render() {
    return (
      <div>
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <Link to="/hello" className="App-link">
            Next Page
          </Link>
        </header>
      </div>
    );
  }
}
