import axios from 'axios';
import { all } from 'redux-saga/effects';

axios.defaults.baseURL = `${process.env.REACT_APP_SERVER_URL || 'http://localhost:4000'}/api`;

export default function* saga() {
  yield all([]);
}
