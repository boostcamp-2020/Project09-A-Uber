interface RegExpDictionary {
  [key: string]: RegExp;
}

const regExp: RegExpDictionary = {
  name: /^[가-힣]{2,5}$/,
  email: /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i,
  password: /^.*(?=^.{8,15}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&+=]).*$/,
  phone: /^\d{3}-\d{3,4}-\d{4}$/,
  cardNumber: /^\d{4}$/,
  expiryDate: /^(0[1-9]|1[0-2])[/](01|[0][1-9]|[1-2][1-9]|[3][0-1])$/,
  cvcNumber: /^\d{3}$/,
  carNumber: /^\d{1,3}[가-힣]\s\d{4}$/,
  license: /^\d{2}-\d{2}-\d{6}-\d{2}$/,
};

export const isKoreanName = (maybeKoreanName: string): boolean => {
  return regExp.name.test(maybeKoreanName);
};

export const isEmail = (maybeEmail: string): boolean => {
  return regExp.email.test(maybeEmail);
};

export const isPassword = (maybePassword: string): boolean => {
  return regExp.password.test(maybePassword);
};

export const isPhone = (maybePhone: string): boolean => {
  return regExp.phone.test(maybePhone);
};

export const isCardNumber = (maybeCardNumber: string): boolean => {
  return regExp.cardNumber.test(maybeCardNumber);
};

export const isExpiryDate = (maybeExpiryDate: string): boolean => {
  return regExp.expiryDate.test(maybeExpiryDate);
};

export const isCVCNumber = (maybeCVC: string): boolean => {
  return regExp.cvcNumber.test(maybeCVC);
};

export const isCarNumber = (maybeCarNumber: string): boolean => {
  return regExp.carNumber.test(maybeCarNumber);
};

export const isLicense = (maybeLicense: string): boolean => {
  return regExp.license.test(maybeLicense);
};
