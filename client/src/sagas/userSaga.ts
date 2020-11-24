import { all, takeLatest, fork, call, put, delay } from 'redux-saga/effects';
import { FOCUS_USER } from '@components/UserToggle';
import {
  SIGN_UP_REQUEST,
  signUpFailure,
  signUpSuccess,
  UserInfo,
  DriverInfo,
  SignUpRequest,
} from '@reducers/user';
import axios from 'axios';

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

function* watchSignUp() {
  yield takeLatest(SIGN_UP_REQUEST, signUp);
}

export default function* userSaga() {
  yield all([fork(watchSignUp)]);
}
