import React, { FC, useCallback, useEffect } from 'react';
import { Button, ActivityIndicator } from 'antd-mobile';
import { useSelector } from 'react-redux';
import { useSubscription } from '@apollo/react-hooks';
import { useHistory } from 'react-router-dom';

import styled from '@theme/styled';
import Header from '@components/HeaderWithMenu';
import Modal from '@components/Modal';
import { InitialState } from '@reducers/.';
import { SUB_APPROVAL_ORDER } from '@queries/order.queries';
import { SubApprovalOrder } from '@/types/api';
import useModal from '@hooks/useModal';

const StyledSearchDriver = styled.div`
  margin-bottom: 0.8rem;
  height: 100%;

  & > section {
    position: relative;
    height: calc(100% - 50px);
    position: relative;
    padding: 0 1.5rem 1.5rem 1.5rem;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;

    & > .loading-center {
      position: absolute;
      left: 50%;
      top: 40%;
      transform: translateX(-50%);
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      font-weight: 700;

      & > div {
        margin-top: 1rem;
      }
    }

    & > .am-button {
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      height: 2rem;
      margin-bottom: 0.8rem;
      margin-top: 2rem;
      font-weight: 700;
      font-size: 0.9rem;
    }
  }
`;

const SearchDriver: FC = () => {
  const history = useHistory();
  const [isModal, onOpenModal, onCloseModal] = useModal();
  const { id: orderId } = useSelector((state: InitialState) => state.order || {});
  const { data: approvalOrder } = useSubscription<SubApprovalOrder>(SUB_APPROVAL_ORDER, {
    variables: { orderId },
  });

  const onClickModalCloseHandler = useCallback(() => {
    onCloseModal();
    history.push('/user/waiting');
  }, []);

  useEffect(() => {
    if (orderId && approvalOrder && orderId === approvalOrder?.subApprovalOrder.approvalOrderId) {
      onOpenModal();
    }
  }, [orderId, approvalOrder]);

  return (
    <>
      <StyledSearchDriver>
        <Header className="green-header" />
        <section>
          <div className="loading-center">
            주변에 운행이 가능한 드라이버를 탐색중입니다
            <ActivityIndicator size="large" />
          </div>
          <Button type="warning">탐색 취소</Button>
        </section>
      </StyledSearchDriver>
      <Modal visible={isModal} onClose={onClickModalCloseHandler}>
        오더가 매칭되었습니다.
      </Modal>
    </>
  );
};

export default SearchDriver;
