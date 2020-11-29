import { useState, useCallback } from 'react';

const useModal = (): [boolean, () => void, () => void] => {
  const [isModal, setIsModal] = useState(false);

  const openModal = useCallback(() => {
    setIsModal(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsModal(false);
  }, []);

  return [isModal, openModal, closeModal];
};

export default useModal;
