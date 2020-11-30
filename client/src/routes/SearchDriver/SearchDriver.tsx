import React, { FC, useCallback, useEffect } from 'react';
import { Button, ActivityIndicator } from 'antd-mobile';
import { useSelector, useDispatch } from 'react-redux';
import { useSubscription } from '@apollo/react-hooks';
import { useHistory } from 'react-router-dom';

import styled from '@theme/styled';
import Header from '@components/HeaderWithMenu';
import Modal from '@components/Modal';
import CarInfo from '@components/CarInfo';
import { InitialState } from '@reducers/.';
import { SUB_APPROVAL_ORDER, GET_ORDER_CAR_INFO } from '@queries/order.queries';
import { SubApprovalOrder, GetOrderCarInfo } from '@/types/api';
import { useCustomQuery } from '@hooks/useApollo';
import useModal from '@hooks/useModal';
import { addCarInfo } from '@reducers/order';
import { Message } from '@utils/client-message';

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
  const dispatch = useDispatch();
  const [isModal, onOpenModal, onCloseModal] = useModal();
  const { refetch } = useCustomQuery<GetOrderCarInfo>(GET_ORDER_CAR_INFO, {
    skip: true,
  });
  const { id: orderId } = useSelector((state: InitialState) => state.order || {});
  const { carInfo } = useSelector((state: InitialState) => state.order || {});
  const { data: approvalOrder } = useSubscription<SubApprovalOrder>(SUB_APPROVAL_ORDER, {
    variables: { orderId },
  });

  const onClickModalCloseHandler = useCallback(() => {
    onCloseModal();
    history.push('/user/waiting');
  }, []);

  const onOpenOrderModal = useCallback(async () => {
    const { data } = await refetch({ orderId });
    const { carInfo: carInfoData } = data.getOrderCarInfo;
    if (!carInfoData) {
      return;
    }
    dispatch(addCarInfo(carInfoData));
    onOpenModal();
  }, [orderId]);

  useEffect(() => {
    if (orderId && approvalOrder && orderId === approvalOrder?.subApprovalOrder.approvalOrderId) {
      onOpenOrderModal();
    }
  }, [orderId, approvalOrder]);

  return (
    <>
      <StyledSearchDriver>
        <Header className="green-header" />
        <section>
          <div className="loading-center">
            주변에 운행이 가능한 드라이버를 탐색중입니다
            {!isModal && <ActivityIndicator size="large" />}
          </div>
          <Button type="warning">탐색 취소</Button>
        </section>
      </StyledSearchDriver>
      <Modal visible={isModal} onClose={onClickModalCloseHandler}>
        {carInfo && <CarInfo carInfo={carInfo} title={Message.DriverMatchingCompolete} />}
      </Modal>
    </>
  );
};

export default SearchDriver;
