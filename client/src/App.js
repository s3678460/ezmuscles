import React, { Component } from 'react'

import { BrowserRouter as Router, Route} from 'react-router-dom';

import './App.css';
import ReactApp from './components/ReactApp';
import ReactApp2 from './components/ReactApp2';
import NavBar from './components/Template/NavBar';
import Footer from './components/Template/Footer';
import Login from './components/Login/Login'


export default class App extends Component {
  render() {
    return (
      <Router>
      <div className="App">
        <NavBar/>
        <Route exact path="/" component={ReactApp} />
        <div className="container">
        <Route exact path="/hello" component={ReactApp2} />
        <Route exact path="/login" component={Login} />

        <Footer/>
        </div>
      </div>
    </Router>
    )
  }
}
