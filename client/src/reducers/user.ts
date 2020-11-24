import { ToggleFocus } from '@components/UserToggle';

export const SIGN_UP_REQUEST = 'SIGN_UP_REQUEST';
export const SIGN_UP_SUCCESS = 'SIGN_UP_SUCCESS';
export const SIGN_UP_FAILURE = 'SIGN_UP_FAILURE';

export const SIGN_IN_REQUEST = 'SIGN_IN_REQUEST';
export const SIGN_IN_SUCCESS = 'SIGN_IN_SUCCESS';
export const SIGN_IN_FAILURE = 'SIGN_IN_FAILURE';

interface UserCommonInfo {
  email: string;
  name: string;
  password: string;
  phone: string;
}

export interface LoginInfo {
  email: string;
  password: string;
  loginType: string;
}

export interface UserInfo extends UserCommonInfo {
  payment: {
    bank: string;
    creditNumber: string;
    expiryDate: string;
    cvc: number;
  };
}

export interface DriverInfo extends UserCommonInfo {
  driver: {
    licenseNumber: string;
    car: {
      carType: string;
      carNumber: string;
    };
  };
}

export interface SignUpRequest {
  type: typeof SIGN_UP_REQUEST;
  data: UserInfo | DriverInfo;
  userType: ToggleFocus;
}

export interface SignUpSuccess {
  type: typeof SIGN_UP_SUCCESS;
}

export interface SignUpFailure {
  type: typeof SIGN_UP_FAILURE;
  error: string;
}

export interface SignInRequest {
  type: typeof SIGN_IN_REQUEST;
  data: LoginInfo;
}

export interface SignInSuccess {
  type: typeof SIGN_IN_SUCCESS;
}

export interface SignInFailure {
  type: typeof SIGN_IN_FAILURE;
  error: string;
}

// 회원가입 액션
export const signUpRequest = (
  data: UserInfo | DriverInfo,
  userType: ToggleFocus,
): SignUpRequest => ({
  type: SIGN_UP_REQUEST,
  data,
  userType,
});
export const signUpSuccess = (): SignUpSuccess => ({ type: SIGN_UP_SUCCESS });
export const signUpFailure = (error: string): SignUpFailure => ({
  type: SIGN_UP_FAILURE,
  error,
});

// 로그인 액션
export const signInRequest = (data: LoginInfo): SignInRequest => ({
  type: SIGN_IN_REQUEST,
  data,
});

export const signInSuccess = (): SignInSuccess => ({ type: SIGN_IN_SUCCESS });
export const signInFailure = (error: string): SignInFailure => ({
  type: SIGN_IN_FAILURE,
  error,
});
