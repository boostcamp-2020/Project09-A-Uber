import React, { FC, useState, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { SegmentedControl, Button, Checkbox } from 'antd-mobile';

import { StyledSignIn } from '@routes/SignIn/style';
import StyledPageFrame from '@components/PageFrame';
import logo from '@images/logo.svg';
import Input from '@components/Input';
import useChange from '@hooks/useChange';

const visitorType = ['일반 사용자', '드라이버'];
const initialVisitorType = '일반 사용자';

const SignIn: FC = () => {
  const history = useHistory();
  const [loginType, setLoginType] = useState(initialVisitorType);
  const [isLoginState, setIsLoginState] = useState(false);
  const [email, setEmail, onChangeEmail] = useChange('');
  const [password, setPassword, onChangePassword] = useChange('');
  const onClickSignup = useCallback(() => {
    history.push('/signup');
  }, []);
  const onChangeType = useCallback((value: string) => {
    setLoginType(value);
  }, []);
  const onChangeLoginState = useCallback(() => {
    setIsLoginState(!isLoginState);
  }, []);

  return (
    <StyledPageFrame>
      <StyledSignIn>
        <img src={logo} alt="logo image" />
        <div className="visitor-type">
          <SegmentedControl values={visitorType} onValueChange={onChangeType}></SegmentedControl>
        </div>
        <Input type="text" placeholder="아이디" value={email} onChange={onChangeEmail}></Input>
        <Input
          type="password"
          placeholder="패스워드"
          value={password}
          onChange={onChangePassword}
        ></Input>
        <div className="login-state">
          <Checkbox onChange={onChangeLoginState}>로그인 상태 유지</Checkbox>
        </div>
        <Button type="primary">로그인</Button>
        <Button className="signup-button" onClick={onClickSignup}>
          회원가입
        </Button>
      </StyledSignIn>
    </StyledPageFrame>
  );
};

export default SignIn;
