import React, { Component } from "react";

import { BrowserRouter as Router, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authAction";
import "./App.css";
import ReactApp from "./components/ReactApp";
import NavBar from "./components/Template/NavBar";
import Footer from "./components/Template/Footer";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import Verification from "./components/Verification/Verification";
import Chatbot from "./components/Chatbot/Chatbot";
import SendDiscountCode from "./components/SendDiscountCode/SendDiscountCode";
import Cart from "./components/Cart/Cart";
import AdminPage from "./components/Admin/AdminPage";
import { UpdateProduct } from "./components/Admin/UpdateProduct";


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
            <Route exact path="/" component={ReactApp} />
            <div className="container">
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/verify" component={Verification} />
              <Route exact path="/support" component={Chatbot} />
              <Route exact path="/senddiscount" component={SendDiscountCode} />
              <Route exact path="/cart" component={Cart} />
              <Route exact path="/admin" component={AdminPage} />
              <Route exact path="/product/:_id" component={UpdateProduct} />
              <Footer />
            </div>
          </div>
        </Router>
      </Provider>
    );
  }
}
