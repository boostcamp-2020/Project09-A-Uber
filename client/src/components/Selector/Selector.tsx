import React, { FC } from 'react';
import { StyledSelector } from './style';

interface Props {
  name: string;
  items: string[];
  placeholder: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const Selector: FC<Props> = ({ name, items, placeholder, onChange }) => {
  return (
    <StyledSelector>
      <select name={name} onChange={onChange}>
        <option value="" disabled selected className="defaultOption">
          {placeholder}
        </option>
        {items &&
          items.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
      </select>
    </StyledSelector>
  );
};

export default Selector;
