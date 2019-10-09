import React, { Component } from "react";
import { ChatBot } from "aws-amplify-react";

export default class Chatbot extends Component {
  
  handleComplete(err, confirmation) {
    if (err) {
     
    }
  
  }
  render() {
    return (
      <div className="jumbotron jumbotron-fluid">
        <div className="container">
          <h1 className="display-4">Chatbot Support</h1>
          <p className="lead">
            <ChatBot
              title="Muscle Bot"
              botName="EzMuscles"
              welcomeMessage="Welcome to Ez-Muscles Largest Supplement Retail Store"
              onComplete={this.handleComplete.bind(this)}
              clearOnComplete={true}
            />
          </p>
        </div>
      </div>
    );
  }
}
