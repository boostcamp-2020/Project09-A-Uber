import React, { forwardRef } from 'react';

import styled from '@theme/styled';

import allowedImg from '@images/allow.svg';
import warningImg from '@images/warning.svg';

interface Props {
  title?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyPress?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  placeholder?: string;
  allow?: boolean;
  inValidMessage?: string;
  type?: 'text' | 'password';
  className?: string;
  ref?: React.RefObject<HTMLInputElement>;
}

const StyledInput = styled.div`
  width: 100%;

  & > div {
    position: relative;
  }

  & h1 {
    font-size: 0.9rem;
    color: ${({ theme }) => theme.FONT};
    margin-bottom: 0.5rem;
  }

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

  & span {
    display: inline-block;
    margin-top: 0.5rem;
    color: ${({ theme }) => theme.RED};
    font-size: 0.5rem;
  }

  img {
    position: absolute;
    right: 0.5rem;
    top: 0.5rem;
    transform: scale(0.9);
  }
`;

const Input = forwardRef<HTMLInputElement, Props>(
  (
    { title, placeholder, allow, value, onChange, type, className, inValidMessage, onKeyPress },
    ref,
  ) => (
    <StyledInput className={className}>
      {title && <h1>{title}</h1>}
      <div>
        <input
          type={type}
          value={value}
          onChange={onChange}
          onKeyPress={onKeyPress}
          placeholder={placeholder}
          ref={ref}
        />
        {allow !== undefined &&
          (allow ? <img src={allowedImg} alt="allow" /> : <img src={warningImg} alt="awrning" />)}
      </div>
      {allow !== undefined && inValidMessage !== undefined && !allow && value.length !== 0 && (
        <span>{inValidMessage}</span>
      )}
    </StyledInput>
  ),
);

Input.defaultProps = {
  title: '',
  placeholder: '',
  type: 'text',
  className: '',
};

export default Input;
