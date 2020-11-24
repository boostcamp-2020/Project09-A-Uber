import React, { FC, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import styled from '@theme/styled';
import Selector from '@components/Selector';
import Input from '@components/Input';
import { Button } from 'antd-mobile';
import useChange from '@hooks/useChange';
import useValidator from '@hooks/useValidator';
import { isExpiryDate, isCVCNumber, isCardNumber } from '@utils/validators';
import { ToggleFocus } from '@components/UserToggle';
import { InitialState } from '@reducers/.';
import { signUpRequest } from '@reducers/user';

const StyledPaymentInfoForm = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;

  & .card-number {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
  }

  & .payment-information-section > div {
    margin-bottom: 1rem;
  }

  & .small-input {
    width: 22%;
  }

  & > a {
    cursor: pointer;
    font-weight: 700;
    font-size: 0.9rem;
  }
`;

interface Props {
  name: string;
  email: string;
  password: string;
  phone: string;
  type: ToggleFocus;
}

const Banks = [
  '기업은행',
  '국민은행',
  '우리은행',
  '신한은행',
  '하나은행',
  '농협은행',
  '카카오뱅크',
];

const PaymentInfoForm: FC<Props> = ({ name, email, password, phone, type }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [bank, , onChangeBank] = useChange<HTMLSelectElement>('');
  const [cardNumber1, , onChangeCardNumber1, isCardNumber1Valid] = useValidator(
    '',
    isCardNumber,
    4,
  );
  const [cardNumber2, , onChangeCardNumber2, isCardNumber2Valid] = useValidator(
    '',
    isCardNumber,
    4,
  );
  const [cardNumber3, , onChangeCardNumber3, isCardNumber3Valid] = useValidator(
    '',
    isCardNumber,
    4,
  );
  const [cardNumber4, , onChangeCardNumber4, isCardNumber4Valid] = useValidator(
    '',
    isCardNumber,
    4,
  );
  const [expiryDate, , onChangeExpiryDate, isExpiryDateValid] = useValidator('', isExpiryDate, 5);
  const [cvc, , onChangeCvc, isCvcValid] = useValidator('', isCVCNumber, 3);
  const { result } = useSelector(({ signup }: InitialState) => signup);

  const onSubmit = useCallback(
    (e: React.FormEvent) => {
      // TODO: 회원가입 요청
      e.preventDefault();
      const user = {
        name,
        email,
        password,
        phone,
        payment: {
          bank,
          creditNumber: `${cardNumber1}-${cardNumber2}-${cardNumber3}-${cardNumber4}`,
          expiryDate,
          cvc: Number(cvc),
        },
      };
      dispatch(signUpRequest(user, type));
    },
    [bank, cardNumber1, cardNumber2, cardNumber3, cardNumber4, expiryDate, cvc],
  );

  useEffect(() => {
    if (result) {
      history.push('/');
    }
  }, [result]);

  return (
    <StyledPaymentInfoForm>
      <section className="payment-information-section">
        <div>
          <Selector
            title="카드 회사"
            name="bank"
            placeholder="카드 회사를 선택해 주세요"
            onChange={onChangeBank}
            items={Banks}
          />
        </div>
        <div className="card-number">
          <Input
            title="카드 번호"
            value={cardNumber1}
            onChange={onChangeCardNumber1}
            className="small-input"
            allow={isCardNumber1Valid}
          />
          <Input
            value={cardNumber2}
            onChange={onChangeCardNumber2}
            className="small-input"
            allow={isCardNumber2Valid}
          />
          <Input
            value={cardNumber3}
            onChange={onChangeCardNumber3}
            className="small-input"
            allow={isCardNumber3Valid}
          />
          <Input
            value={cardNumber4}
            onChange={onChangeCardNumber4}
            type="password"
            className="small-input"
            allow={isCardNumber4Valid}
          />
        </div>
        <div>
          <Input
            title="만료일"
            value={expiryDate}
            onChange={onChangeExpiryDate}
            className="small-input"
            allow={isExpiryDateValid}
          />
        </div>
        <div>
          <Input
            title="CVC"
            value={cvc}
            onChange={onChangeCvc}
            type="password"
            className="small-input"
            allow={isCvcValid}
          />
        </div>
      </section>
      <Button
        type="primary"
        onClick={onSubmit}
        disabled={
          !bank ||
          !isCardNumber1Valid ||
          !isCardNumber2Valid ||
          !isCardNumber3Valid ||
          !isCardNumber4Valid ||
          !expiryDate ||
          !cvc
        }
      >
        회원가입
      </Button>
    </StyledPaymentInfoForm>
  );
};

export default PaymentInfoForm;
