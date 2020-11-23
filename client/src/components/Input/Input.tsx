import React, { FC } from 'react';

import styled from '@theme/styled';

import allowedImg from '@images/allow.svg';
import warningImg from '@images/warning.svg';

interface Props {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  allow?: boolean;
}

const StyledInput = styled.div`
  position: relative;

  & input {
    width: 100%;
    border: solid 1px ${({ theme }) => theme.BORDER};
    border-radius: 4px;
    padding: 0.5rem 0.75rem;

    &::placeholder {
      color: ${({ theme }) => theme.BORDER};
    }

    &:focus {
      border: 1px solid ${({ theme }) => theme.PRIMARY};
      outline: none;
    }
  }

  img {
    position: absolute;
    right: 0.5rem;
    top: 0.5rem;
    transform: scale(0.9);
  }
`;

const Input: FC<Props> = ({ placeholder, allow, value, onChange }) => (
  <StyledInput>
    <input type="text" value={value} onChange={onChange} placeholder={placeholder} />
    {allow !== undefined &&
      (allow ? <img src={allowedImg} alt="allow" /> : <img src={warningImg} alt="awrning" />)}
  </StyledInput>
);

Input.defaultProps = {
  placeholder: '',
};

export default Input;
