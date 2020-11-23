import React, { FC } from 'react';
import styled from '@theme/styled';

interface Props {
  title?: string;
  name: string;
  items: string[];
  placeholder: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const StyledSelector = styled.div`
  & h1 {
    font-size: 0.9rem;
    color: ${({ theme }) => theme.FONT};
    margin-bottom: 2px;
  }
  & select {
    width: 100%;
    border: 1px solid ${({ theme }) => theme.BORDER};
    border-radius: 4px;
    padding: 0.5rem 0.75rem;

    &:focus {
      border: 1px solid ${({ theme }) => theme.PRIMARY};
    }
  }
`;

const Selector: FC<Props> = ({ title, name, items, placeholder, onChange }) => {
  return (
    <StyledSelector>
      {title && <h1>{title}</h1>}
      <select name={name} onChange={onChange}>
        <option value="" disabled selected className="defaultOption">
          {placeholder}
        </option>
        {items.map((item) => (
          <option key={`${name}_${item}`} value={item}>
            {item}
          </option>
        ))}
      </select>
    </StyledSelector>
  );
};

export default Selector;
