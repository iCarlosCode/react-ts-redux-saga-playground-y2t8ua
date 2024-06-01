import { takeEvery, fork, put, all, takeLatest } from 'redux-saga/effects';
import { eventChannel } from 'redux-saga';

function* onMessage(event: any) {
  //const message = JSON.parse(event.data);
  console.log('Message Received', event.data);
  // Send message to reducer
  //yield put({ type: 'UPDATE_MESSAGES', payload: message });
  // yield put({ type: 'ON_SEND_MESSAGE', payload: { message: 'Hi' } });
}

function* onCloseWebSocket(socket: any, event: any): any {
  console.log(
    'Socket is closed. Reconnect will be attempted in 1 second.',
    event
  );
}

function* setupWebSocket() {
  console.log('Creating a new Websocket');
  var socket: any;
  try {
    socket = new WebSocket('wss://echo.websocket.org');

    const messageChannel = eventChannel((emitter) => {
      socket.addEventListener('message', emitter);
      return () => socket.removeEventListener('message', emitter);
    });

    const closeChannel = eventChannel((emitter) => {
      socket.addEventListener('close', emitter);
      return () => socket.removeEventListener('close', emitter);
    });

    yield takeEvery(messageChannel, onMessage);
    yield takeEvery(closeChannel, onCloseWebSocket, socket);
    yield takeLatest('ON_SEND_MESSAGE', (action: any) =>
      socket.send(JSON.stringify(action.payload))
    );
  } catch (error) {
    // TODO
  }
}

function* messagesSaga(): Generator {
  yield all([fork(setupWebSocket)]);
}

export default messagesSaga;
