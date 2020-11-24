export const SIGN_UP_REQUEST = 'SIGN_UP_REQUEST';
export const SIGN_UP_SUCCESS = 'SIGN_UP_SUCCESS';
export const SIGN_UP_FAILURE = 'SIGN_UP_FAILURE';

interface UserCommonInfo {
  email: string;
  name: string;
  password: string;
  phone: string;
}

interface UserInfo extends UserCommonInfo {
  cardNumber: string;
  expiryDate: string;
  cvc: string;
}

interface DriverInfo extends UserCommonInfo {
  carType: string;
  carNumber: string;
  carLicense: string;
}

export interface SignUpRequest {
  type: typeof SIGN_UP_REQUEST;
  data: UserInfo | DriverInfo;
}

export interface SignUpSuccess {
  type: typeof SIGN_UP_SUCCESS;
}

export interface SignUpFailure {
  type: typeof SIGN_UP_FAILURE;
}

// 회원가입 액션 크링
export const signUpRequest = (data: UserInfo | DriverInfo): SignUpRequest => ({
  type: SIGN_UP_REQUEST,
  data,
});
export const signUpSuccess = (): SignUpSuccess => ({ type: SIGN_UP_SUCCESS });
export const signUpFailure = (): SignUpFailure => ({ type: SIGN_UP_FAILURE });
