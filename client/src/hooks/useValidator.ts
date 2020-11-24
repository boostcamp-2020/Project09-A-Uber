import { useState, useCallback, useEffect } from 'react';

export default <T extends { value: string } = HTMLInputElement>(
  initialState: string,
  validator: (value: string) => boolean,
  limitLength?: number,
): [
  string,
  React.Dispatch<React.SetStateAction<string>>,
  (e: React.ChangeEvent<T>) => void,
  boolean,
] => {
  const [value, setValue] = useState(initialState);
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    if (validator(value)) setIsValid(true);
    else setIsValid(false);
  }, [value]);

  const onChangeHandler = useCallback(
    (e: React.ChangeEvent<T>) => {
      if (!(!limitLength || (limitLength && value.length <= limitLength))) {
        return;
      }

      setValue(e.target.value);
      if (validator(e.target.value)) setIsValid(true);
      else setIsValid(false);
    },
    [value],
  );

  return [value, setValue, onChangeHandler, isValid];
};
