import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authAction";

class NavBar extends Component {
  onLogoutClick(e) {
    e.preventDefault();
    this.props.logoutUser();
  }

  render() {
    const { isAuthenticated, user } = this.props.auth;

    const authLinks = (
      <div className="dropdown-menu" aria-labelledby="navbarDropdown">
        <a className="dropdown-item" href="">
          Welcome back, {user.name}!
        </a>

        <a
          className="dropdown-item"
          href="#"
          onClick={this.onLogoutClick.bind(this)}
        >
          Logout
        </a>
        <div className="dropdown-divider" />
      </div>
    );

    const guestLinks = (
      <div className="dropdown-menu" aria-labelledby="navbarDropdown">
        <Link to="/login">
          <a className="dropdown-item">Login</a>
        </Link>
        <Link to="/register">
          <a className="dropdown-item">Register</a>
        </Link>
        <div className="dropdown-divider" />
      </div>
    );

    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <Link to="/">
          <a className="navbar-brand" href="#">
            <img
              src="data:image/png;base64,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"
              width={30}
              height={30}
              className="d-inline-block align-top"
              alt=""
            />
            Ez Muscles
          </a>{" "}
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              <Link to="/">
                <a className="nav-link" href="#">
                  Home <span className="sr-only">(current)</span>
                </a>
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link"
                to="/product">
                Product
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/support">
                <a className="nav-link" href="#">
                  Support
              </a>
              </Link>
            </li>

            <li className="nav-item">
              <Link to="/senddiscount">
                <a className="nav-link" href="#">
                  Get Discount Code
              </a>
              </Link>
            </li>
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                id="navbarDropdown"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Membership
              </a>
              {isAuthenticated ? authLinks : guestLinks}
            </li>

            <li className="nav-item">

              <Link to="/cart">
                <a className="nav-link" href="#">
                  <i className="fa fa-shopping-basket" aria-hidden="true"> Your Cart
            </i>
                </a>
              </Link>
            </li>
            <li className="nav-item">

              <Link to="/admin">
                <a className="nav-link" href="#"> Admin
                </a>
              </Link>
            </li>

          </ul>
          <form className="form-inline my-2 my-lg-0">
            <input
              className="form-control mr-sm-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <button
              className="btn btn-outline-success my-2 my-sm-0"
              type="submit"
            >
              Search
            </button>


          </form>
        </div>
      </nav>
    );
  }
}

NavBar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(NavBar);
