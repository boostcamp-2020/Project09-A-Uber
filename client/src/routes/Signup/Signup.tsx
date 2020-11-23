import React, { FC, useState, useCallback } from 'react';

import styled from '@theme/styled';
import useChange from '@hooks/useChange';

import PageFrame from '@components/PageFrame';
import UserToggle, { ToggleFocus, FOCUS_USER } from '@components/UserToggle';

import CommonSignup from './CommonSignup';
import NextSignup from './NextSingup';

const StyledSignup = styled(PageFrame)`
  & .signup-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    margin-bottom: 2rem;

    & h1 {
      font-size: 2.2rem;
      font-weight: 700;
      color: ${({ theme }) => theme.PRIMARY};
    }
  }
`;

const Signup: FC = () => {
  const [isNext, setIsNext] = useState(false);
  const [signupTarget, setSignupTarget] = useState<ToggleFocus>(FOCUS_USER);
  const [name, , onChangeName] = useChange('');
  const [email, , onChangeEmail] = useChange('');
  const [password, , onChangePassword] = useChange('');
  const [passwordRe, , onChangePasswordRe] = useChange('');
  const [phone, , onChangePhone] = useChange('');

  const onClickToggleHandler = useCallback(
    (target: ToggleFocus) => {
      if (target === signupTarget) {
        return;
      }
      setSignupTarget(target);
    },
    [signupTarget],
  );

  const onClickNextHandler = useCallback(() => {
    setIsNext(true);
  }, []);

  return (
    <StyledSignup>
      <div className="signup-header">
        <h1>회원가입</h1>
        <UserToggle focus={signupTarget} onClick={isNext ? () => null : onClickToggleHandler} />
      </div>
      {isNext ? (
        <NextSignup nextForm={signupTarget} />
      ) : (
        <CommonSignup
          name={name}
          email={email}
          password={password}
          passwordRe={passwordRe}
          phone={phone}
          onChangeName={onChangeName}
          onChangeEmail={onChangeEmail}
          onChangePassword={onChangePassword}
          onChangePasswordRe={onChangePasswordRe}
          onChangePhone={onChangePhone}
          onClickNextHandler={onClickNextHandler}
        />
      )}
    </StyledSignup>
  );
};

export default Signup;
