import React, { Component } from 'react';
import Button from 'antd/es/button';
import Layout from 'antd/es/layout';
import Menu from 'antd/es/menu';
const { Header, Content, Footer, Sider } = Layout;
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
      buttonList: []
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

  // start = () => {
  //   this.initConsole()
  //   // console.log(1)
  //   socket.emit("console", "npm start")
  // }

  tslint = () => {
    this.initConsole()
    socket.emit("console", "npm run tslint")
  }


  format = () => {
    this.initConsole()
    socket.emit("console", "npm run format")
  }
  componentDidMount() {
    var that = this
    //获取按钮列表
    fetch('/json', {
     method: 'GET',
     headers: {
      'Content-Type': 'application/json',
     },
    }).then((response) => response.json()).then((json) => {
     this.setState({
      buttonList: json
     });
     console.log('请求成功', json)
    })
  
   }
   start = (name) => {
    this.initConsole()
    socket.emit("console", `npm run ${name}`)
   }

  render() {
    return (
      <div className="App">
        <Layout className="box">
          <Sider
            breakpoint="lg"
            collapsedWidth="0"
            onBreakpoint={broken => {
              console.log(broken);
            }}
            onCollapse={(collapsed, type) => {
              console.log(collapsed, type);
            }}
          >
            <div className="logo">MIKU</div>
            {/* <Menu theme="dark" mode="inline">
              <Menu.Item key="1" onClick={this.start}>
                <span className="nav-text">启动项目</span>
              </Menu.Item>
              <Menu.Item key="2" onClick={this.tslint}>
                <span className="nav-text">格式检查</span>
              </Menu.Item>
              <Menu.Item key="3" onClick={this.format}>
                <span className="nav-text">代码格式美化</span>
              </Menu.Item>
              <Menu.Item key="4" onClick={this.format}>
                <span className="nav-text">docker</span>
              </Menu.Item>
              <Menu.Item key="5" onClick={this.format}>
                <span className="nav-text">format</span>
              </Menu.Item>
              <Menu.Item key="6" onClick={this.format}>
                <span className="nav-text">jest</span>
              </Menu.Item>
            </Menu> */}
            <Menu theme="dark" mode="inline">
              {
                this.state.buttonList.map((el, index) => {
                // return (<button key={index} onClick={() => this.start(el.EN)}> {el.ZH}</button>)
                  return (<Menu.Item key={index} onClick={() => this.start(el.EN)}>
                    <span className="nav-text">{el.EN}</span>
                  </Menu.Item>)
                })
              }
            </Menu>
          </Sider>
          <Layout>
            {/* <Header className="site-layout-sub-header-background" style={{ padding: 0 }} /> */}
            <Content style={{ margin: '24px 16px 0' }}>
              <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
              <Console
                ref={this.console}
                handler={this.echo}
                promptLabel={this.promptLabel}
                welcomeMessage={"Welcome to Miku!\n"}
                autofocus={true}
              />
              </div>
            </Content>
            {/* <Footer style={{ textAlign: 'center' }}>MIKU CLI</Footer> */}
          </Layout>
        </Layout>
      </div>
    )
  }
}

export default App;