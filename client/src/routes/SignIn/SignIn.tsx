import React, { FC, useState, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { Button, Checkbox, Toast } from 'antd-mobile';
import { useMutation } from '@apollo/react-hooks';
import { SIGNIN } from '@queries/user';
import { Signin } from '@/types/api';
import { StyledSignIn } from '@routes/SignIn/style';
import StyledPageFrame from '@components/PageFrame';
import UserToggle, { FOCUS_USER, ToggleFocus } from '@components/UserToggle';
import { TOAST_DURATION } from '@utils/enums';
import { Message } from '@utils/client-message';
import logo from '@images/logo.svg';
import Input from '@components/Input';
import useChange from '@hooks/useChange';

const SignIn: FC = () => {
  const history = useHistory();
  const [loginType, setLoginType] = useState<ToggleFocus>(FOCUS_USER);
  const [isLoginState, setIsLoginState] = useState(false);
  const [email, , onChangeEmail] = useChange('');
  const [password, , onChangePassword] = useChange('');
  const [signinMutation, { loading }] = useMutation<Signin>(SIGNIN, {
    onCompleted: ({ signin }) => {
      if (signin.result === 'success') {
        Toast.success(Message.SucceedSignin, TOAST_DURATION.SIGNIN_SUCCESS, () => {
          history.push('/');
        });
      }
      if (signin.result === 'fail') {
        Toast.fail(signin.error, TOAST_DURATION.SIGNIN_FAILURE);
      }
    },
  });
  const onClickSignup = useCallback(() => {
    history.push('/signup');
  }, []);
  const onClickSignIn = useCallback(() => {
    signinMutation({
      variables: {
        email,
        password,
        loginType,
      },
    });
  }, [email, password, loginType]);

  const onClickToggleHandler = useCallback(
    (target: ToggleFocus) => {
      if (target === loginType) {
        return;
      }
      setLoginType(target);
    },
    [loginType],
  );
  const onChangeLoginState = useCallback(() => {
    setIsLoginState(!isLoginState);
  }, []);

  return (
    <StyledPageFrame>
      <StyledSignIn>
        <img src={logo} alt="logo" />
        <UserToggle focus={loginType} onClick={onClickToggleHandler} />
        <Input type="text" placeholder="아이디" value={email} onChange={onChangeEmail} />
        <Input
          type="password"
          placeholder="패스워드"
          value={password}
          onChange={onChangePassword}
        />
        <div className="login-state">
          <Checkbox onChange={onChangeLoginState}>로그인 상태 유지</Checkbox>
        </div>
        <Button type="primary" onClick={onClickSignIn} loading={loading}>
          로그인
        </Button>
        <Button className="signup-button" onClick={onClickSignup}>
          회원가입
        </Button>
      </StyledSignIn>
    </StyledPageFrame>
  );
};

export default SignIn;
