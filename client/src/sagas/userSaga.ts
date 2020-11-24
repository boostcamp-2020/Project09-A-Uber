import { all, takeLatest, fork, call, put } from 'redux-saga/effects';
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

const LOGIN_FAIL = '로그인 정보가 틀렸습니다.';

function signUpUserAPI(data: UserInfo) {
  return axios.post('/signup/user', data, { withCredentials: true });
}

function signUpDriverAPI(data: DriverInfo) {
  return axios.post('/signup/driver', data, { withCredentials: true });
}

function* signUp(action: SignUpRequest) {
  try {
    let response = null;
    if (action.userType === FOCUS_USER) {
      response = yield call(signUpUserAPI, action.data as UserInfo);
    } else {
      response = yield call(signUpDriverAPI, action.data as DriverInfo);
    }

    if (response.data.result === 'success') {
      yield put(signUpSuccess());
    }
    if (response.data.result === 'fail') {
      alert('회원가입에 실패했습니다.');
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
    alert(LOGIN_FAIL);
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
