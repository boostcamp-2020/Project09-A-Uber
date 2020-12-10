import React, { FC, useState, useCallback } from 'react';
import { useHistory } from 'react-router-dom';

import { Radio, Input, Button, Checkbox, Row, Col, message } from 'antd';
import { useMutation } from '@apollo/react-hooks';
import { SIGNIN } from '@queries/user';
import { Signin } from '@/types/api';
import StyledPageFrame from '@components/PageFrame';
import { FOCUS_USER, FOCUS_DRIVER, ToggleFocus } from '@components/UserToggle';
import { TOAST_DURATION } from '@utils/enums';
import { Message } from '@utils/client-message';
import logo from '@images/logo.svg';
import useChange from '@hooks/useChange';
import { RadioChangeEvent } from 'antd/lib/radio';
import styled from '@theme/styled';

export const StyledSignIn = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
`;

const options = [
  { label: '일반 사용자', value: FOCUS_USER },
  { label: '드라이버', value: FOCUS_DRIVER },
];

const SignIn: FC = () => {
  const history = useHistory();
  const [loginType, setLoginType] = useState<ToggleFocus>(FOCUS_USER);

  const [isLoginState, setIsLoginState] = useState(false);
  const [email, , onChangeEmail] = useChange('');
  const [password, , onChangePassword] = useChange('');
  const [signinMutation, { loading }] = useMutation<Signin>(SIGNIN, {
    onCompleted: ({ signin }) => {
      if (signin.result === 'success') {
        message.success({
          content: Message.SucceedSignin,
          style: {
            marginTop: '50vh',
          },
          duration: TOAST_DURATION.SIGNIN_SUCCESS,
          // eslint-disable-next-line no-restricted-globals
          onClose: () => location.replace('/'),
        });
      }
      if (signin.result === 'fail') {
        message.error(signin.error, TOAST_DURATION.SIGNIN_FAILURE);
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

  const onChangeLoginState = useCallback(() => {
    setIsLoginState(!isLoginState);
  }, []);

  const onClickToggle = (e: RadioChangeEvent) => {
    setLoginType(e.target.value as ToggleFocus);
  };

  return (
    <StyledPageFrame>
      <StyledSignIn>
        <Row justify="center" gutter={[0, 8]}>
          <Col>
            <img src={logo} alt="logo" />
          </Col>
        </Row>
        <Row justify="end" gutter={[0, 8]}>
          <Col>
            <Radio.Group
              options={options}
              optionType="button"
              size="small"
              value={loginType}
              onChange={onClickToggle}
            />
          </Col>
        </Row>
        <Row gutter={[0, 8]}>
          <Col span={24}>
            <Input type="text" placeholder="아이디" value={email} onChange={onChangeEmail} />
          </Col>
          <Col span={24}>
            <Input
              type="password"
              placeholder="패스워드"
              value={password}
              onChange={onChangePassword}
            />
          </Col>
          <Col>
            <Checkbox onChange={onChangeLoginState}>로그인 상태 유지</Checkbox>
          </Col>
          <Col span={24}>
            <Button
              type="primary"
              onClick={onClickSignIn}
              loading={loading}
              data-testID="login-button"
              block
            >
              로그인
            </Button>
          </Col>
          <Col span={24}>
            <Button onClick={onClickSignup} block>
              회원가입
            </Button>
          </Col>
        </Row>
      </StyledSignIn>
    </StyledPageFrame>
  );
};

export default SignIn;
