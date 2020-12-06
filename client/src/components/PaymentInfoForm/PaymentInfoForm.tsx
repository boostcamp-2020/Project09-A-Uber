import React, { FC, useCallback, useEffect, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { useMutation } from '@apollo/react-hooks';
import { SIGNUP_USER } from '@queries/user';
import { SignupUser } from '@/types/api';
import styled from '@theme/styled';
import Selector from '@components/Selector';
import Input from '@components/Input';
import { Button, Toast } from 'antd-mobile';
import useChange from '@hooks/useChange';
import useValidator from '@hooks/useValidator';
import { isExpiryDate, isCVCNumber, isCardNumber } from '@utils/validators';
import { TOAST_DURATION } from '@utils/enums';
import { Message } from '@utils/client-message';
import { ToggleFocus } from '@components/UserToggle';

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
  const [signinUserMutation, { loading }] = useMutation<SignupUser>(SIGNUP_USER, {
    onCompleted: ({ signupUser }) => {
      if (signupUser.result === 'success') {
        Toast.success(Message.SucceedSignup, TOAST_DURATION.SIGNUP_SUCCESS, () => {
          history.push('/signin');
        });
      }
      if (signupUser.result === 'fail') {
        Toast.fail(signupUser.error, TOAST_DURATION.SIGNUP_FAILURE);
      }
    },
  });
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
  const creditRef2 = useRef<HTMLInputElement>(null);
  const creditRef3 = useRef<HTMLInputElement>(null);
  const creditRef4 = useRef<HTMLInputElement>(null);

  const onSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      const paymentInfo = {
        bank,
        creditNumber: `${cardNumber1}-${cardNumber2}-${cardNumber3}-${cardNumber4}`,
        expiryDate,
        cvc: Number(cvc),
      };
      signinUserMutation({
        variables: {
          name,
          email,
          password,
          phone,
          payment: paymentInfo,
        },
      });
    },

    [bank, cardNumber1, cardNumber2, cardNumber3, cardNumber4, expiryDate, cvc],
  );

  useEffect(() => {
    if (isCardNumber1Valid) {
      creditRef2.current?.focus();
    }
  }, [isCardNumber1Valid, creditRef2.current]);

  useEffect(() => {
    if (isCardNumber1Valid) {
      creditRef3.current?.focus();
    }
  }, [isCardNumber2Valid, creditRef3.current]);

  useEffect(() => {
    if (isCardNumber3Valid) {
      creditRef4.current?.focus();
    }
  }, [isCardNumber3Valid, creditRef4.current]);

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
            ref={creditRef2}
          />
          <Input
            value={cardNumber3}
            onChange={onChangeCardNumber3}
            className="small-input"
            allow={isCardNumber3Valid}
            ref={creditRef3}
          />
          <Input
            value={cardNumber4}
            onChange={onChangeCardNumber4}
            type="password"
            className="small-input"
            allow={isCardNumber4Valid}
            ref={creditRef4}
          />
        </div>
        <div>
          <Input
            title="만료일"
            value={expiryDate}
            onChange={onChangeExpiryDate}
            className="small-input"
            allow={isExpiryDateValid}
            inValidMessage={Message.ExpiryDateGuidance}
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
        loading={loading}
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
