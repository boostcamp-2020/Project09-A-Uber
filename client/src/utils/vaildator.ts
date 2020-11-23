interface RegExpDictionary {
  [key: string]: RegExp;
}

const regExp: RegExpDictionary = {
  carNumber: /^/,
  license: /^/,
};

export const isCarNumber = (maybeCarNumber: string): boolean => {
  return regExp.carNumber.test(maybeCarNumber);
};

export const isLicense = (maybeLicense: string): boolean => {
  return regExp.license.test(maybeLicense);
};
