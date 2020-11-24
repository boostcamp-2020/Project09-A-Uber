import React, { FC } from 'react';

import styled from '@theme/styled';
import LeftSVG from '@images/LeftSVG';

interface Props {
  onClick: () => void;
}

const StyledHeaderWithBack = styled.header`
  display: flex;
  margin-left: 1.5rem;
  height: 3rem;

  & button {
    background: none;
    border: none;
    padding: 0;
  }

  & svg {
    width: 1.5rem;
    fill: ${({ theme }) => theme.PRIMARY};
  }
`;

const HeaderWithBack: FC<Props> = ({ onClick }) => (
  <StyledHeaderWithBack>
    <button type="button" onClick={onClick}>
      <LeftSVG />
    </button>
  </StyledHeaderWithBack>
);

export default HeaderWithBack;
