import React, { Component } from "react";

import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authAction";
import "./App.css";
import NavBar from "./components/Template/NavBar";
import Footer from "./components/Template/Footer";
import RouterURL from "./components/RouterURL/RouterURL";


//Check for token

if (localStorage.jwtToken) {
  // Set auth token header auth
  setAuthToken(localStorage.jwtToken);
  // Decode token and get user info and exp
  const decoded = jwt_decode(localStorage.jwtToken);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));

  // Check for expired token
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());
    // Clear current profile
    // Redirect to login

    window.location.href = "/login";
  }
}

export default class App extends Component {

  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <NavBar />
            <div className="container">
              <RouterURL />
            </div>
            <Footer />
          </div>
        </Router>
      </Provider>
    );
  }
}
