import React, { Component } from 'react'

import { BrowserRouter as Router, Route} from 'react-router-dom';

import './App.css';
import ReactApp from './components/ReactApp';
import ReactApp2 from './components/ReactApp2';

export default class App extends Component {
  render() {
    return (
      <Router>
      <div className="App">
        <Route exact path="/" component={ReactApp} />
        <div className="container">
        <Route exact path="/hello" component={ReactApp2} />

        </div>
      </div>
    </Router>
    )
  }
}
