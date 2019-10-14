import React, { Component } from "react";
import { ChatBot } from "aws-amplify-react";
import {Interactions} from 'aws-amplify'
import {ChatFeed, Message} from 'react-chat-ui';
import fs from 'fs';
import axios from 'axios';



export default class Chatbot extends Component {
  state={
    input:'',
    finalMessage:'',
    messages:[
      new Message({
        id: 1,
        message: "Welcome to Ez-Muscles Largest Supplement Retail Store"
      })
    ]
  }

  onChange(e){
    const input = e.target.value
    this.setState({
      input
    })
  }

  _handleKeyPress = (e) => {
    if(e.key === 'Enter'){
      this.submitMessage()
    }
  }

  async submitMessage() {
    const {input} = this.state
    if (input === '') return 
    const message = new Message ({
      id:0,
      message: input,
    })

    let messages = [...this.state.messages,message]

    this.setState({
      messages,
      input:''
    })

    const response = await Interactions.send('EzMuscles',input)
    const responseMessage = new Message ({
      id: 1,
      message: response.message
    })

    messages = [...this.state.messages,responseMessage]
    this.setState({messages})

    if(response.dialogState === "Fulfilled"){
      if(response.intentName === "PTConfirmation") {
        const { slots:{number} } = response
        const finalMessage = `Congratulations! We Have Recorded Your Phone Number :${number}`
        const contact = {
          phone:`${number}`
        }
        axios.post('/api/contacts/postContact',contact)
          .then(res=> console.log(res.data))
          .catch(err => console.log(err))
        this.setState({finalMessage})
      }
    }


  }

  
  handleComplete(err, confirmation) {
    if (err) {
     
    }
  
  }
  render() {
    return (
      // <div className="jumbotron jumbotron-fluid">
      //   <div className="container">
      //     <h1 className="display-4">Chatbot Support</h1>
      //     <p className="lead">
      //       <ChatBot
      //         title="Muscle Bot"
      //         botName="EzMuscles"
      //         welcomeMessage="Welcome to Ez-Muscles Largest Supplement Retail Store"
      //         onComplete={this.handleComplete.bind(this)}
      //         clearOnComplete={true}
      //       />
      //     </p>
      //   </div>
      // </div>
      <div className="App">
      <header style={styles.header}>
        <p style={styles.headerTitle}>Welcome to my Muscle Bot</p>
      </header>
      <div style={styles.messagesContainer}>
      <h2>{this.state.finalMessage}</h2>
      <ChatFeed
        messages={this.state.messages}
        hasInputField={false}
        bubbleStyles={styles.bubbleStyles}
      />

      <input
        onKeyPress={this._handleKeyPress}
        onChange={this.onChange.bind(this)}
        style={styles.input}
        value={this.state.input}
      />
      </div>
    </div>
    );
  }
}

const styles = {
  bubbleStyles: {
    text: {
      fontSize: 16,
    },
    chatbubble: {
      borderRadius: 30,
      padding: 10
    }
  },
  headerTitle: {
    color: 'white',
    fontSize: 22
  },
  header: {
    backgroundColor: 'rgb(0, 132, 255)',
    padding: 20,
    borderTop: '12px solid rgb(204, 204, 204)'
  },
  messagesContainer: {
    display: 'flex',
    flexDirection: 'column',
    padding: 10,
    alignItems: 'center'
  },
  input: {
    fontSize: 16,
    padding: 10,
    outline: 'none',
    width: 350,
    border: 'none',
    borderBottom: '2px solid rgb(0, 132, 255)'
  }
}
