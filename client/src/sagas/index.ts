import axios from 'axios';
import { all, fork } from 'redux-saga/effects';
import userSaga from './userSaga';

axios.defaults.baseURL = `${process.env.REACT_APP_SERVER_URL || 'http://localhost:4000'}/api`;

export default function* saga() {
  yield all([fork(userSaga)]);
}
