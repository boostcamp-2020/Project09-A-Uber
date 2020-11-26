import React, { FC } from 'react';

import styled from '@theme/styled';
import MenuSVG from '@images/menuSVG.tsx';

interface Props {
  onClick: () => void;
  className?: string;
}

const StyledHeaderWithMenu = styled.header`
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
    fill: #ffffff;
    margin-left: 1.5rem;
  }
`;

const HeaderWithMenu: FC<Props> = ({ onClick, className }) => (
  <StyledHeaderWithMenu className={className}>
    <button type="button" onClick={onClick}>
      <MenuSVG />
    </button>
  </StyledHeaderWithMenu>
);

export default HeaderWithMenu;
