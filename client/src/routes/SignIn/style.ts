import styled from '@theme/styled';

export const StyledSignIn = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;

  & nav {
    align-self: flex-end;
    margin: 0.5rem 0;
  }

  & > .am-button {
    cursor: pointer;
    width: 100%;
    height: 2.5rem;
    margin-bottom: 0.8rem;
    font-weight: 700;
    font-size: 0.9rem;
  }

  & .am-button.signup-button {
    border: 1px solid ${({ theme }) => theme.BORDER};
  }

  & > .login-state {
    width: 100%;
    margin-bottom: 0.8rem;

    & .am-checkbox {
      margin-right: 0.4rem;
      width: 16px;
      height: 16px;
    }

    & .am-checkbox-inner {
      border-radius: 0;
      width: 16px;
      height: 16px;
    }

    & .am-checkbox-inner:after {
      top: 0;
      right: 4px;
      width: 5px;
      height: 9px;
    }
  }

  & input {
    margin-bottom: 0.8rem;
  }
`;
