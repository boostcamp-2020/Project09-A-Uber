interface RegExpDictionary {
  [key: string]: RegExp;
}

const regExp: RegExpDictionary = {
  carNumber: /\d{1,3}[가-힣]\s\d{4}/,
  license: /\d{2}-\d{2}-\d{6}-\d{2}/,
};

export const isCarNumber = (maybeCarNumber: string): boolean => {
  return regExp.carNumber.test(maybeCarNumber);
};

export const isLicense = (maybeLicense: string): boolean => {
  return regExp.license.test(maybeLicense);
};
