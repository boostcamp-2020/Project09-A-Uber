import React, { FC, useCallback, useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useMutation } from '@apollo/react-hooks';
import { SIGNUP_USER } from '@queries/user';
import { SignupUser } from '@/types/api';
import styled from '@theme/styled';

import { Button, Input, Form, Select, message, Row, Col } from 'antd';
import { ExclamationCircleTwoTone, CheckCircleTwoTone } from '@ant-design/icons';
import useValidator from '@hooks/useValidator';
import { isExpiryDate, isCVCNumber, isCardNumber } from '@utils/validators';
import { TOAST_DURATION, USER } from '@utils/enums';
import { Message } from '@utils/client-message';
import { ToggleFocus } from '@components/UserToggle';
import theme from '@/theme';
import { ValidateStatus } from 'antd/lib/form/FormItem';

const StyledPaymentInfoForm = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
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

const suffix = (isVaildValue: boolean) => {
  return isVaildValue ? (
    <CheckCircleTwoTone twoToneColor={theme.PRIMARY} />
  ) : (
    <ExclamationCircleTwoTone twoToneColor={theme.RED} />
  );
};

const validateStatus = (isVaildValue: boolean, value: string): ValidateStatus => {
  return !isVaildValue && value.length !== 0 ? 'error' : '';
};

const helpMessage = (isVaildValue: boolean, value: string, helpMessage: string): string | false => {
  return !isVaildValue && value.length !== 0 && helpMessage;
};

const { Option } = Select;

const PaymentInfoForm: FC<Props> = ({ name, email, password, phone }) => {
  const history = useHistory();
  const [signinUserMutation, { loading }] = useMutation<SignupUser>(SIGNUP_USER, {
    onCompleted: ({ signupUser }) => {
      if (signupUser.result === 'success') {
        message.success({
          content: Message.SucceedSignup,
          style: {
            marginTop: '50vh',
          },
          duration: TOAST_DURATION.SIGNUP_SUCCESS,
          onClose: () => history.push('/signin'),
        });
      }
      if (signupUser.result === 'fail') {
        message.error({
          content: signupUser.error,
          style: {
            marginTop: '50vh',
          },
          duration: TOAST_DURATION.SIGNUP_FAILURE,
        });
      }
    },
  });

  const [bank, setBank] = useState('');
  const [cardNumber1, , onChangeCardNumber1, isCardNumber1Valid] = useValidator('', isCardNumber);
  const [cardNumber2, , onChangeCardNumber2, isCardNumber2Valid] = useValidator('', isCardNumber);
  const [cardNumber3, , onChangeCardNumber3, isCardNumber3Valid] = useValidator('', isCardNumber);
  const [cardNumber4, , onChangeCardNumber4, isCardNumber4Valid] = useValidator('', isCardNumber);
  const [expiryDate, , onChangeExpiryDate, isExpiryDateValid] = useValidator('', isExpiryDate);
  const [cvc, , onChangeCvc, isCvcValid] = useValidator('', isCVCNumber);
  const creditRef2 = useRef<Input>(null);
  const creditRef3 = useRef<Input>(null);
  const creditRef4 = useRef<Input>(null);

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

  const onChangeBank = (bank: string) => {
    setBank(bank);
  };

  return (
    <StyledPaymentInfoForm>
      <Form layout="vertical">
        <Form.Item name="카드 회사" label="카드 회사">
          <Select placeholder="카드 회사를 선택해 주세요" onChange={onChangeBank}>
            {Banks.map((bank) => (
              <Option key={bank} value={bank}>
                {bank}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Row align="bottom" gutter={5}>
          <Col span={6}>
            <Form.Item
              name="카드 번호1"
              label="카드 번호"
              validateStatus={validateStatus(isCardNumber1Valid, cardNumber1)}
            >
              <Input
                value={cardNumber1}
                title="카드 번호"
                onChange={onChangeCardNumber1}
                suffix={suffix(isCardNumber1Valid)}
                autoComplete="off"
                data-testId="signup-card1"
                maxLength={USER.CARD_MAX_LENGTH}
              />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item
              name="카드 번호2"
              validateStatus={validateStatus(isCardNumber2Valid, cardNumber2)}
            >
              <Input
                value={cardNumber2}
                title="카드 번호"
                onChange={onChangeCardNumber2}
                suffix={suffix(isCardNumber2Valid)}
                autoComplete="off"
                data-testId="signup-card2"
                maxLength={USER.CARD_MAX_LENGTH}
                ref={creditRef2}
              />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item
              name="카드 번호3"
              validateStatus={validateStatus(isCardNumber3Valid, cardNumber3)}
            >
              <Input
                value={cardNumber3}
                title="카드 번호"
                onChange={onChangeCardNumber3}
                suffix={suffix(isCardNumber3Valid)}
                autoComplete="off"
                data-testId="signup-card3"
                maxLength={USER.CARD_MAX_LENGTH}
                ref={creditRef3}
              />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item
              name="카드 번호4"
              validateStatus={validateStatus(isCardNumber4Valid, cardNumber4)}
            >
              <Input
                value={cardNumber4}
                title="카드 번호"
                type="password"
                onChange={onChangeCardNumber4}
                suffix={suffix(isCardNumber4Valid)}
                autoComplete="off"
                data-testId="signup-card1"
                maxLength={USER.CARD_MAX_LENGTH}
                ref={creditRef4}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={5}>
          <Col span={6}>
            <Form.Item
              name="만료일"
              label="만료일"
              validateStatus={validateStatus(isExpiryDateValid, expiryDate)}
              help={helpMessage(isExpiryDateValid, expiryDate, Message.ExpiryDateGuidance)}
            >
              <Input
                value={expiryDate}
                title="만료일"
                onChange={onChangeExpiryDate}
                suffix={suffix(isExpiryDateValid)}
                autoComplete="off"
                data-testId="signup-expiry-date"
                maxLength={USER.EXPIRY_DATA_MAX_LENGTH}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={5}>
          <Col span={6}>
            <Form.Item name="CVC" label="CVC" validateStatus={validateStatus(isCvcValid, cvc)}>
              <Input
                value={cvc}
                title="CVC"
                type="password"
                onChange={onChangeCvc}
                suffix={suffix(isCvcValid)}
                autoComplete="off"
                data-testId="signup-cvc"
                maxLength={USER.CVC_MAX_NUM}
              />
            </Form.Item>
          </Col>
        </Row>
      </Form>

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
          !isExpiryDateValid ||
          !isCvcValid
        }
        data-testID="signup-user-submit"
      >
        회원가입
      </Button>
    </StyledPaymentInfoForm>
  );
};

export default PaymentInfoForm;
