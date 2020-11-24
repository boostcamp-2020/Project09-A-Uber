interface RegExpDictionary {
  [key: string]: RegExp;
}

const regExp: RegExpDictionary = {
  cardNumber: /^\d{4}$/,
  expiryDate: /^(0[1-9]|1[0-2])[/](01|[0][1-9]|[1-2][1-9]|[3][0-1])$/,
  cvcNumber: /^\d{3}$/,
};

interface CardNumber {
  cardNumber1: string;
  cardNumber2: string;
  cardNumber3: string;
  cardNumber4: string;
}

export const isCardNumber = (maybeCardNumber: CardNumber): boolean => {
  return (
    regExp.cardNumber.test(maybeCardNumber.cardNumber1) &&
    regExp.cardNumber.test(maybeCardNumber.cardNumber2) &&
    regExp.cardNumber.test(maybeCardNumber.cardNumber3) &&
    regExp.cardNumber.test(maybeCardNumber.cardNumber4)
  );
};

export const isExpiryDate = (maybeExpiryDate: string): boolean => {
  return regExp.expiryDate.test(maybeExpiryDate);
};

export const isCVCNumber = (maybeCVC: string): boolean => {
  return regExp.cvcNumber.test(maybeCVC);
};
