import { useState, useCallback } from 'react';

export default <T extends { value: string } = HTMLInputElement>(
  initialState: string,
): [string, React.Dispatch<React.SetStateAction<string>>, (e: React.ChangeEvent<T>) => void] => {
  const [value, setValue] = useState(initialState);

  const onChangeHandler = useCallback((e: React.ChangeEvent<T>) => {
    setValue(e.target.value);
  }, []);

  return [value, setValue, onChangeHandler];
};
