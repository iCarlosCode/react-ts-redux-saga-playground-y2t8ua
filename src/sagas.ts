import {
  all,
  // call,
  // cancel,
  delay,
  // fork,
  put,
  takeEvery,
  // takeLatest,
  // StrictEffect
} from 'redux-saga/effects';
import messagesSaga from './messagesSaga';
// const delay = (ms) => new Promise(res => setTimeout(res, ms))

function* helloSaga() {
  console.log('Hello Sagas!');
}

function* incrementAsync() {
  yield delay(1000);
  yield put({ type: 'ON_SEND_MESSAGE', payload: { message: 'Hi' } });
}

function* watchIncrementAsync() {
  yield takeEvery('INCREMENT_ASYNC', incrementAsync);
}

// notice how we now only export the rootSaga
// single entry point to start all Sagas at once
export default function* rootSaga() {
  yield all([messagesSaga()]);
}
