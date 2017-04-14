import React, { Component } from 'react';
import SocketIOClient from 'socket.io-client';
import ChatBox from './ChatBox';
import GameBox from './Game/GameBox';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allMessages: [],
      connected: false,
      heroKey: 'init',
      myMessage: ''
    };
    this.socket = SocketIOClient.connect('http://localhost:3001');
  }

  componentDidMount() {
    const that = this;
    that.setState({ connected: true })
    this.socket.on('connection', () => {
    });
    this.socket.on('game-init', (key) => {
      if (this.state.heroKey === 'init') {
        this.setState({ heroKey: key })
      }
    })
    this.socket.on('chat', (message) => {
      this.setState({ allMessages: [...this.state.allMessages, message]})
    });
  }

  disconnect = () => {
    this.setState({ connected: false })
    this.socket.disconnect();
  }

  connect = () => {
    this.setState({ connected: true })
    this.socket.connect('http://localhost:3001');
  }

  clearMessages = () => {
    this.setState({ allMessages: [] })
  }


  setMessage = (message) => {
    this.setState({ myMessage: message})
  }

  sendMessage = (e) => {
    e.preventDefault();
    this.socket.emit('chat', this.state.myMessage, (response) => {
    });
    this.setState({ myMessage: '' })
  }
  render() {
    const { heroKey } = this.state;

    return (
      <div className="App">
      <GameBox
        socket={this.socket}
        heroKey={heroKey}
        />
      <ChatBox
        socket={this.socket}
        setMessage={this.setMessage}
        sendMessage={this.sendMessage}
        clearMessages={this.clearMessages}
        connect={this.connect}
        disconnect={this.disconnect}
        {...this.state}
      />
      </div>
    );
  }
}

export default App;
