import React, { FC } from 'react';

import styled from '@theme/styled';
import LeftSVG from '@images/LeftSVG';

interface Props {
  onClick: () => void;
  className?: string;
}

const StyledHeaderWithBack = styled.header`
  display: flex;
  height: 3rem;
  width: 100%;
  background-color: ${({ className, theme }) =>
    className === 'green-header' ? theme.PRIMARY : '#ffffff'};

  & button {
    background: none;
    border: none;
    padding: 0;
  }

  & svg {
    width: 1.5rem;
    fill: ${({ theme }) => theme.PRIMARY};
    margin-left: 1.5rem;
  }
`;

const HeaderWithBack: FC<Props> = ({ onClick, className = 'white-header' }) => (
  <StyledHeaderWithBack className={className}>
    <button type="button" onClick={onClick}>
      <LeftSVG />
    </button>
  </StyledHeaderWithBack>
);

export default HeaderWithBack;
