import { all, takeLatest, fork, call, put } from 'redux-saga/effects';
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

function* watchSignUp() {
  yield takeLatest(SIGN_UP_REQUEST, signUp);
}

export default function* userSaga() {
  yield all([fork(watchSignUp)]);
}
