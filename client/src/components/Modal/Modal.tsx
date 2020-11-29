import React, { FC } from 'react';

import { Icon } from 'antd-mobile';
import styled from '@theme/styled';
import Portal from '@utils/portal';

interface Props {
  className?: string;
  visible?: boolean;
  onClose?: () => void | undefined;
}

const ModalOverlay = styled.div<Props>`
  display: ${({ visible }) => (visible ? 'block' : 'none')};
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: ${({ theme }) => theme.MODAL_OVERLAY};
  z-index: 999;
`;

const ModalWrapper = styled.div<Props>`
  display: ${({ visible }) => (visible ? 'block' : 'none')};
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1000;
  overflow: auto;
  outline: 0;
`;

const ModalInner = styled.div`
  position: relative;
  box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.5);
  color: ${({ theme }) => theme.LIGHT};
  background-color: ${({ theme }) => theme.MODAL_BACKGROUND};
  border-radius: 10px;
  width: 80%;
  height: 40%;
  max-width: 400px;
  max-height: 600px;
  top: 50%;
  transform: translateY(-50%);
  margin: 0 auto;
  padding: 45px 20px;

  & .close-button {
    position: absolute;
    right: 1rem;
    top: 1rem;
  }
`;

const Modal: FC<Props> = ({ visible, className, children, onClose }) => {
  const onMaskClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget && onClose) {
      onClose();
    }
  };

  const close = () => {
    if (onClose) onClose();
  };

  return (
    <Portal elementId="modal-root">
      <ModalOverlay visible={visible} />
      <ModalWrapper className={className} tabIndex={-1} visible={visible} onClick={onMaskClick}>
        <ModalInner tabIndex={0} className="model-inner">
          <Icon type="cross" className="close-button" onClick={close} />
          {children}
        </ModalInner>
      </ModalWrapper>
    </Portal>
  );
};

export default Modal;
