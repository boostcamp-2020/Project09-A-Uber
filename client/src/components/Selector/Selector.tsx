import React, { FC } from 'react';
import styled from '@theme/styled';

interface Props {
  name: string;
  items: string[];
  placeholder: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const StyledSelector = styled.select`
  width: 100%;
  border: 1px solid ${({ theme }) => theme.BORDER};
  border-radius: 4px;
  padding: 0.5rem 0.75rem;

  &:focus {
    border: 1px solid ${({ theme }) => theme.PRIMARY};
  }
`;

const Selector: FC<Props> = ({ name, items, placeholder, onChange }) => {
  return (
    <StyledSelector name={name} onChange={onChange}>
      <option value="" disabled selected className="defaultOption">
        {placeholder}
      </option>
      {items.map((item) => (
        <option key={`${name}_${item}`} value={item}>
          {item}
        </option>
      ))}
    </StyledSelector>
  );
};

export default Selector;
