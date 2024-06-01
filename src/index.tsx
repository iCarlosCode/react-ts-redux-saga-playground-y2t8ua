// React
import React, { Component } from 'react';
import { render } from 'react-dom';

// Redux + Saga
import { createStore, applyMiddleware, Store } from 'redux';
import createSagaMiddleware from 'redux-saga';

// App
import reducer from './store/reducers';
import rootSaga from './sagas';
import Hello from './Hello';
import './style.css';
const WebSocket = require('ws');

interface AppProps {}
interface AppState {
  name: string;
}

const sagaMiddleware = createSagaMiddleware();

const store = createStore(reducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(rootSaga);

const openWebSocket = () => {
  console.log("OPENDED")
    const wss = new WebSocket.Server({ port: 8080 });

    wss.on('connection', function connection(ws) {
        console.log("Servidor WS em execução")
        ws.on('message', function incoming(message) {
            try {
                console.log('Received:', JSON.parse(message));
                ws.send(JSON.stringify(JSON.parse(message)));
            }
            catch
            {
                console.log('Received:', message);
                ws.send(message);
            }
        });
    });
}

const closeWebSocket = () => {
  console.log("OPENDED")
}

class App extends Component<AppProps, AppState> {
  constructor(props) {
    super(props);
    this.state = {
      name: 'React',
    };
  }

  render() {
    return (
      <div>
        <Hello name={this.state.name} />
        <button onClick={openWebSocket}>Open Connection</button>
        <button onClick={closeWebSocket}>Close Connection</button>
        <p>Start editing to see some magic happen :)</p>
      </div>
    );
  }
}

store.subscribe(render);

render(<App />, document.getElementById('root'));
