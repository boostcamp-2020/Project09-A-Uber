import React, { FC, useState, useCallback } from 'react';

import styled from '@theme/styled';
import useChange from '@hooks/useChange';

import PageFrame from '@components/PageFrame';
import Toggle, { ToggleFocus, FOCUS_USER } from '@components/UserToggle';
import Input from '@components/Input';

const StyledSignup = styled(PageFrame)`
  & .signup-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;

    & h1 {
      font-size: 2.2rem;
      font-weight: 700;
      color: ${({ theme }) => theme.PRIMARY};
    }
  }

  & .signup-input-section {
    margin-top: 1.5rem;

    & > div {
      margin-bottom: 1.2rem;
    }
  }
`;

const Signup: FC = () => {
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

  return (
    <StyledSignup>
      <div className="signup-header">
        <h1>회원가입</h1>
        <Toggle focus={signupTarget} onClick={onClickToggleHandler} />
      </div>
      <div className="signup-input-section">
        <Input
          value={name}
          onChange={onChangeName}
          title="이름"
          placeholder="이름을 입력해 주세요."
        />
        <Input
          value={email}
          onChange={onChangeEmail}
          title="이메일"
          placeholder="이메일을 입력해 주세요."
        />
        <Input
          value={password}
          onChange={onChangePassword}
          title="비밀번호"
          placeholder="비밀번호를 입력해 주세요."
        />
        <Input
          value={passwordRe}
          onChange={onChangePasswordRe}
          title="비밀번호 재확인"
          placeholder="비밀번호를 한번 더 입력해 주세요."
        />
        <Input
          value={phone}
          onChange={onChangePhone}
          title="핸드폰 번호"
          placeholder="핸드폰 번호를 입력해 주세요."
        />
      </div>
    </StyledSignup>
  );
};

export default Signup;
