import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class ReactApp2 extends Component {
  render() {
    return (
      <div>
        Hello World {" "}
        <Link to="/">Back</Link>
      </div>
    );
  }
}
