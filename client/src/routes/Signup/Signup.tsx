import React, { FC, useState, useCallback } from 'react';
import { useHistory } from 'react-router-dom';

import styled from '@theme/styled';
import useValidator from '@hooks/useValidator';
import { isKoreanName, isEmail, isPassword, isPhone } from '@utils/validators';

import PageFrame from '@components/PageFrame';
import HeaderWithBack from '@/components/HeaderWithBack';
import UserToggle, { ToggleFocus, FOCUS_USER, FOCUS_DRIVER } from '@components/UserToggle';
import { Radio, Input, Button, Checkbox, Row, Col, message } from 'antd';

import { RadioChangeEvent } from 'antd/lib/radio';
import CommonSignup from './CommonSignup';
import NextSignup from './NextSingup';

const StyledSignup = styled(PageFrame)`
  height: calc(100% - 3rem);

  & .signup-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    margin-bottom: 3rem;

    & h1 {
      font-size: 2.2rem;
      font-weight: 700;
      color: ${({ theme }) => theme.PRIMARY};
    }
  }
`;

const options = [
  { label: '일반 사용자', value: FOCUS_USER },
  { label: '드라이버', value: FOCUS_DRIVER },
];

const Signup: FC = () => {
  const history = useHistory();
  const [isNext, setIsNext] = useState(false);
  const [signupTarget, setSignupTarget] = useState<ToggleFocus>(FOCUS_USER);
  const [name, , onChangeName, isNameValid] = useValidator('', isKoreanName);
  const [email, , onChangeEmail, isEmailValid] = useValidator('', isEmail);
  const [password, , onChangePassword, isPasswordValid] = useValidator('', isPassword);
  const [passwordRe, setPasswordRe] = useState('');
  const [isPasswordReValid, setIsPasswordReValid] = useState(false);
  const [phone, , onChangePhone, isPhoneValid] = useValidator('', isPhone);

  const onChangePasswordReHandler = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setPasswordRe(e.target.value);
      setIsPasswordReValid(e.target.value === password);
    },
    [password],
  );

  const onClickToggleHandler = (e: RadioChangeEvent) => {
    setSignupTarget(e.target.value as ToggleFocus);
  };
  const onClickNextHandler = useCallback(() => {
    setIsNext(true);
  }, []);

  const onClickBackHandler = useCallback(() => {
    if (isNext) {
      setIsNext(false);
      return;
    }
    history.push('/signin');
  }, [isNext]);

  return (
    <>
      <HeaderWithBack onClick={onClickBackHandler} />
      <StyledSignup>
        <div className="signup-header">
          <h1>회원가입</h1>
          <Radio.Group
            options={options}
            optionType="button"
            buttonStyle="solid"
            size="small"
            value={signupTarget}
            onChange={onClickToggleHandler}
            disabled={isNext}
          />
        </div>
        {isNext ? (
          <NextSignup
            nextForm={signupTarget}
            name={name}
            email={email}
            password={password}
            phone={phone}
          />
        ) : (
          <CommonSignup
            name={name}
            email={email}
            password={password}
            passwordRe={passwordRe}
            phone={phone}
            isName={isNameValid}
            isEmail={isEmailValid}
            isPassword={isPasswordValid}
            isPasswordRe={isPasswordReValid}
            isPhone={isPhoneValid}
            onChangeName={onChangeName}
            onChangeEmail={onChangeEmail}
            onChangePassword={onChangePassword}
            onChangePasswordRe={onChangePasswordReHandler}
            onChangePhone={onChangePhone}
            onClickNextHandler={onClickNextHandler}
          />
        )}
      </StyledSignup>
    </>
  );
};

export default Signup;
