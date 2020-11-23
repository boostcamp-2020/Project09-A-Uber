import React, { FC } from 'react';
import styled from '@theme/styled';
import Selector from '@components/Selector';
import Input from '@components/Input';
import { Button } from 'antd-mobile';
import useChange from '@hooks/useChange';

const StyledPaymentInfoForm = styled.form`
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
    width: 4rem;
  }
`;

const Banks = [
  '기업은행',
  '국민은행',
  '우리은행',
  '신한은행',
  '하나은행',
  '농협은행',
  '카카오뱅크',
];

const PaymentInfoForm: FC = () => {
  const [bank, , onChangeBank] = useChange<HTMLSelectElement>('');
  const [cardNumber1, , onChangeCardNumber1] = useChange('');
  const [cardNumber2, , onChangeCardNumber2] = useChange('');
  const [cardNumber3, , onChangeCardNumber3] = useChange('');
  const [cardNumber4, , onChangeCardNumber4] = useChange('');
  const [expiryDate, , onChangeExpiryDate] = useChange('');
  const [cvc, , onChangeCvc] = useChange('');

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
          />
          <Input value={cardNumber2} onChange={onChangeCardNumber2} className="small-input" />
          <Input value={cardNumber3} onChange={onChangeCardNumber3} className="small-input" />
          <Input
            value={cardNumber4}
            onChange={onChangeCardNumber4}
            type="password"
            className="small-input"
          />
        </div>
        <div>
          <Input
            title="만료일"
            placeholder="예시) 09/21"
            value={expiryDate}
            onChange={onChangeExpiryDate}
            className="small-input"
          />
        </div>
        <div>
          <Input
            title="CVC"
            value={cvc}
            onChange={onChangeCvc}
            type="password"
            className="small-input"
          />
        </div>
      </section>
      <Button type="primary">회원가입</Button>
    </StyledPaymentInfoForm>
  );
};

export default PaymentInfoForm;
