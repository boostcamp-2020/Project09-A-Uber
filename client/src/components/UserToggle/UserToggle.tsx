import React, { FC } from 'react';

import styled from '@theme/styled';

export const FOCUS_USER = 'user';
export const FOCUS_DRIVER = 'driver';

export type ToggleFocus = typeof FOCUS_USER | typeof FOCUS_DRIVER;

interface Props {
  focus: ToggleFocus;
  onClick: (target: ToggleFocus) => void;
}

const StyledToggle = styled.nav`
  display: flex;
  width: fit-content;
  border: 1px solid ${({ theme }) => theme.PRIMARY};
  border-radius: 4px;
  cursor: pointer;

  & > button {
    font-size: 0.6rem;
    padding: 0.3rem 0.4rem;
    transition: background 0.5s;
    color: ${({ theme }) => theme.PRIMARY};
    border: none;
    background-color: transparent;

    &.focus-toggle {
      background-color: ${({ theme }) => theme.PRIMARY};
      color: ${({ theme }) => theme.LIGHT};
    }

    &:focus {
      outline: none;
      filter: brightness(1.1);
    }
  }
`;

const UserToggle: FC<Props> = ({ focus, onClick }) => {
  return (
    <StyledToggle>
      <button
        type="button"
        className={focus === FOCUS_USER ? 'focus-toggle' : ''}
        onClick={() => onClick(FOCUS_USER)}
      >
        일반 사용자
      </button>
      <button
        type="button"
        className={focus === FOCUS_DRIVER ? 'focus-toggle' : ''}
        onClick={() => onClick(FOCUS_DRIVER)}
      >
        드라이버
      </button>
    </StyledToggle>
  );
};

export default UserToggle;
