import React, { FC, useState } from 'react';
import styled from '@theme/styled';
import Selector from '@components/Selector';
import Input from '@components/Input';
import { Button } from 'antd-mobile';

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

  & Button {
    position: relative;
    bottom: 0;
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
  const [bank, setBank] = useState('');
  const [cardNumber1, setCardNumber1] = useState('');
  const [cardNumber2, setCardNumber2] = useState('');
  const [cardNumber3, setCardNumber3] = useState('');
  const [cardNumber4, setCardNumber4] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvc, setCvc] = useState('');

  const onSelectBank = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setBank(e.target.value);
  };
  const cardNumber1OnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCardNumber1(e.target.value);
  };
  const cardNumber2OnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCardNumber2(e.target.value);
  };
  const cardNumber3OnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCardNumber3(e.target.value);
  };
  const cardNumber4OnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCardNumber4(e.target.value);
  };
  const expiryOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setExpiryDate(e.target.value);
  };
  const cvcOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCvc(e.target.value);
  };

  return (
    <StyledPaymentInfoForm>
      <section className="payment-information-section">
        <div>
          <Selector
            title="카드 회사"
            name="bank"
            placeholder="카드 회사를 선택해 주세요"
            onChange={onSelectBank}
            items={Banks}
          />
        </div>
        <div className="card-number">
          <Input
            title="카드 번호"
            value={cardNumber1}
            onChange={cardNumber1OnChange}
            width="4rem"
          />
          <Input value={cardNumber2} onChange={cardNumber2OnChange} width="4rem" />
          <Input value={cardNumber3} onChange={cardNumber3OnChange} width="4rem" />
          <Input value={cardNumber4} onChange={cardNumber4OnChange} width="4rem" type="password" />
        </div>
        <div>
          <Input title="만료일" value={expiryDate} onChange={expiryOnChange} width="4rem" />
        </div>
        <div>
          <Input title="CVC" value={cvc} onChange={cvcOnChange} width="4rem" type="password" />
        </div>
      </section>
      <Button type="primary">회원가입</Button>
    </StyledPaymentInfoForm>
  );
};

export default PaymentInfoForm;
