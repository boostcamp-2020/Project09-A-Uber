import React, { FC, useCallback } from 'react';
import { Button, ActivityIndicator, Toast } from 'antd-mobile';
import { useSelector, useDispatch } from 'react-redux';
import { useSubscription } from '@apollo/react-hooks';
import { useHistory } from 'react-router-dom';

import styled from '@theme/styled';
import Header from '@components/HeaderWithMenu';
import Modal from '@components/Modal';
import CarInfo from '@components/CarInfo';
import { InitialState } from '@reducers/.';
import { SUB_ORDER_CALL_STATUS, GET_ORDER_CAR_INFO, CANCEL_ORDER } from '@/queries/order';
import { SubOrderCallStatus, GetOrderCarInfo, CancelOrder } from '@/types/api';
import { OrderCallStatus } from '@/types/orderCallStatus';
import { useCustomQuery, useCustomMutation } from '@hooks/useApollo';
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
  const { callQuery } = useCustomQuery<GetOrderCarInfo>(GET_ORDER_CAR_INFO, {
    skip: true,
  });
  const { id: orderId } = useSelector((state: InitialState) => state.order || {});
  const { carInfo } = useSelector((state: InitialState) => state.order || {});
  useSubscription<SubOrderCallStatus>(SUB_ORDER_CALL_STATUS, {
    variables: { orderId },
    onSubscriptionData: ({ subscriptionData }) => {
      if (subscriptionData.data?.subOrderCallStatus.status === OrderCallStatus.approval) {
        onOpenOrderModal();
      }
    },
  });
  const [cancelOrderMutation] = useCustomMutation<CancelOrder>(CANCEL_ORDER, {
    onCompleted: ({ cancelOrder }) => {
      if (cancelOrder.result === 'fail') {
        Toast.fail(Message.FailureCancelOrder);
        return;
      }
      history.push('/user');
    },
  });

  const onClickModalCloseHandler = useCallback(() => {
    onCloseModal();
    history.push('/user/waitingDriver');
  }, []);

  const onClickCancelOrderHandler = useCallback(() => {
    cancelOrderMutation({ variables: { orderId } });
  }, [orderId]);

  const onOpenOrderModal = useCallback(async () => {
    const { data } = await callQuery({ orderId });
    const { carInfo: carInfoData } = data.getOrderCarInfo;
    if (!carInfoData) {
      return;
    }
    dispatch(addCarInfo(carInfoData));
    onOpenModal();
  }, [orderId]);

  return (
    <>
      <StyledSearchDriver>
        <Header className="green-header" />
        <section>
          <div className="loading-center">
            주변에 운행이 가능한 드라이버를 탐색중입니다
            {!isModal && <ActivityIndicator size="large" />}
          </div>
          <Button type="warning" onClick={onClickCancelOrderHandler}>
            탐색 취소
          </Button>
        </section>
      </StyledSearchDriver>
      <Modal visible={isModal} onClose={onClickModalCloseHandler}>
        {carInfo && <CarInfo carInfo={carInfo} title={Message.DriverMatchingCompolete} />}
      </Modal>
    </>
  );
};

export default SearchDriver;
