import { all, takeLatest, fork, call, put, delay } from 'redux-saga/effects';
import { FOCUS_USER } from '@components/UserToggle';
import {
  SIGN_UP_REQUEST,
  signUpFailure,
  signUpSuccess,
  UserInfo,
  DriverInfo,
  LoginInfo,
  SignUpRequest,
  SignInRequest,
  SIGN_IN_REQUEST,
  signInSuccess,
  signInFailure,
} from '@reducers/user';
import axios from 'axios';

import { setToken } from '@utils/token';

function signUpUserAPI(data: UserInfo) {
  return axios.post('/api/signup/user', data);
}

function signUpDriverAPI(data: DriverInfo) {
  return axios.post('/api/signup/driver', data);
}

function* signUp(action: SignUpRequest) {
  try {
    let response = null;
    if (action.data.type === FOCUS_USER) {
      response = yield call(signUpUserAPI, action.data as UserInfo);
    } else {
      response = yield call(signUpDriverAPI, action.data as DriverInfo);
    }

    if (response.data.result === 'success') {
      yield put(signUpSuccess());
    }
    if (response.data.result === 'fail') {
      yield put(signUpFailure(response.data.message));
    }
  } catch (err) {
    console.error(err);
    yield put(signUpFailure(err.response.data));
  }
}

function signInAPI(data: LoginInfo) {
  return axios.post('/login', data);
}

function* signIn(action: SignInRequest) {
  try {
    const response = yield call(signInAPI, action.data);
    setToken(response.data.accessToken);

    yield put(signInSuccess());
  } catch (err) {
    const {
      response: {
        data: { message },
      },
    } = err;
    yield put(signInFailure(message));
  }
}

function* watchSignUp() {
  yield takeLatest(SIGN_UP_REQUEST, signUp);
}

function* watchSignIn() {
  yield takeLatest(SIGN_IN_REQUEST, signIn);
}

export default function* userSaga() {
  yield all([fork(watchSignUp), fork(watchSignIn)]);
}
