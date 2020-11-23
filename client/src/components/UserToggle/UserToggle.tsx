import React, { FC } from 'react';

import styled from '@theme/styled';

export const FOCUS_USER = 'FOCUS_USER';
export const FOCUS_DRIVER = 'FOCUS_DRIVER';

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
  overflow: hidden;
  cursor: pointer;

  & > div {
    font-size: 0.6rem;
    padding: 0.3rem 0.4rem;
    transition: background 0.5s;
    color: ${({ theme }) => theme.PRIMARY};

    &.focus-toggle {
      background-color: ${({ theme }) => theme.PRIMARY};
      color: ${({ theme }) => theme.LIGHT};
    }
  }
`;

const Toggle: FC<Props> = ({ focus, onClick }) => {
  return (
    <StyledToggle>
      <div
        className={focus === FOCUS_USER ? 'focus-toggle' : ''}
        onClick={() => onClick(FOCUS_USER)}
      >
        일반 사용자
      </div>
      <div
        className={focus === FOCUS_DRIVER ? 'focus-toggle' : ''}
        onClick={() => onClick(FOCUS_DRIVER)}
      >
        드라이버
      </div>
    </StyledToggle>
  );
};

export default Toggle;
