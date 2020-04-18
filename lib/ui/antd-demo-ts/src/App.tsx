import React, { Component } from 'react';
import Button from 'antd/es/button';
import './App.css';
import io from 'socket.io-client';
import './console.css';
const socket = io();
import Console, { LogEntry, LogMessage } from 'react-console-component';

interface EchoConsoleState {
  // count: number;
}

class App extends React.Component<{}, EchoConsoleState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      count: 0,
    }
    console.log('console',this.console)
    socket.on('console', (data: string) => {
      console.log('console receive:', data)
      this.console.current?.log(data);
    })
  }

  console : React.RefObject<Console> = React.createRef()

  echo = (text: string) => {
    // this.initConsole()
    console.log('echo:', this)
    socket.emit('console', text)
    this.setState(
      this.console.current?.return
    );
  }


  promptLabel = () => {
    return '｡:.ﾟヽ(｡◕‿◕｡)ﾉﾟ.:｡+ﾟ>'
  }

  initConsole = () => {
    const logEntry: LogEntry = {
      label: '',
      command: '',
      message: []
    }
    if (this.console.current?.state?.log?.length === 0) {
      this.console.current?.setState({
        log: [logEntry]
      }, this.console.current?.scrollIfBottom());
    }
  }

  start = () => {
    this.initConsole()
    socket.emit("console", "npm start")
  }

  tslint = () => {
    this.initConsole()
    socket.emit("console", "npm run tslint")
  }


  format = () => {
    this.initConsole()
    socket.emit("console", "npm run format")
  }


  render() {
    return <div>
      <Console
        ref={this.console}
        handler={this.echo}
        promptLabel={this.promptLabel}
        welcomeMessage={"Welcome to Miku!\n"}
        autofocus={true}
      />
      <Button onClick={this.start}>启动项目</Button>
      <Button onClick={this.tslint}>格式检查</Button>
      <Button onClick={this.format}>代码格式美化</Button>
    </div>

  }
}

export default App;