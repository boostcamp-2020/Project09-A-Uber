import React, { FC, useState, useCallback } from 'react';

import styled from '@theme/styled';

import PageFrame from '@components/PageFrame';
import Toggle, { ToggleFocus, FOCUS_USER } from '@/components/UserToggle';

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
`;

const Signup: FC = () => {
  const [signupTarget, setSignupTarget] = useState<ToggleFocus>(FOCUS_USER);

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
    </StyledSignup>
  );
};

export default Signup;
