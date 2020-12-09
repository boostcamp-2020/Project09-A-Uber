import React, { FC, useState, useCallback } from 'react';
import { Button, Toast } from 'antd-mobile';
import styled from '@theme/styled';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useSubscription } from '@apollo/react-hooks';

import MapFrame from '@components/MapFrame';
import Modal from '@components/Modal';
import { SUB_ORDER_CALL_STATUS, GET_ORDER_BY_ID } from '@/queries/order';
import { SUB_DRIVER_LOCATION, GET_DRIVER_LOCATION } from '@queries/user';
import {
  SubDriverLocation,
  getDriverLocation,
  SubOrderCallStatus,
  getOrderById,
  getOrderById_getOrderById_order as OrderType,
} from '@/types/api';
import { useCustomQuery } from '@hooks/useApollo';
import { OrderCallStatus } from '@/types/orderCallStatus';
import useModal from '@hooks/useModal';
import { InitialState, Location } from '@reducers/.';
import { resetOrder } from '@reducers/order';
import calcDriveTime from '@utils/calcDriveTime';
import { SUB_CHAT } from '@queries/chat';
import { TOAST_DURATION } from '@utils/enums';
import { Message } from '@utils/client-message';

// TODO: user/waitingDriver의 스타일과 유사, 추후 리팩터링 필요
const StyledUserGoToDestinationMenu = styled.section`
  height: 100%;
  display: flex;
  align-items: flex-end;

  & > .chat-with-driver {
    width: 100%;

    & > .am-button {
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      height: 2rem;
      margin: 0.8rem 0;
      font-weight: 700;
      font-size: 0.9rem;
    }
  }
`;

const OrderInfo = styled.div`
  font-size: 1rem;

  & .order-info-title {
    margin-bottom: 2rem;
  }

  & div {
    margin: 0.8rem 0;
  }
`;

const GoToDestination: FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [isVisibleModal, openModal, closeModal] = useModal();
  const { id: orderId } = useSelector(({ order }: InitialState) => order || {});
  const { destination } = useSelector(({ order }: InitialState) => order.location || {});
  const [directions, setDirections] = useState<google.maps.DirectionsResult | undefined>(undefined);
  const [driverLocation, setDriverLocation] = useState<Location>();
  const [orderInfo, setorderInfo] = useState<OrderType | null>();
  const { callQuery } = useCustomQuery<getOrderById>(GET_ORDER_BY_ID, { skip: true });

  useSubscription(SUB_CHAT, {
    variables: {
      chatId: orderId,
    },
    onSubscriptionData: () => {
      Toast.config({ mask: false, duration: TOAST_DURATION.RECEIVE_CHAT });
      Toast.info(Message.ChatMessage);
    },
  });

  const onClickChatRoom = useCallback(() => {
    history.push(`/chatroom/${orderId}`);
  }, []);

  const onCompleteOrderHandler = useCallback(() => {
    closeModal();
    dispatch(resetOrder());
    history.push(`/user`);
  }, []);

  useCustomQuery<getDriverLocation>(GET_DRIVER_LOCATION, {
    variables: { orderId },
    onCompleted: (data) => {
      if (data.getDriverLocation.driverLocation) {
        setDriverLocation(data.getDriverLocation.driverLocation);
      }
    },
  });

  useSubscription<SubDriverLocation>(SUB_DRIVER_LOCATION, {
    variables: { orderId },
    onSubscriptionData: ({ subscriptionData }) => {
      const driverNewLocation = {
        lat: subscriptionData.data?.subDriverLocation.coordinates[0] as number,
        lng: subscriptionData.data?.subDriverLocation.coordinates[1] as number,
      };
      setDriverLocation(driverNewLocation);
    },
  });

  useSubscription<SubOrderCallStatus>(SUB_ORDER_CALL_STATUS, {
    variables: { orderId },
    onSubscriptionData: async ({ subscriptionData }) => {
      if (subscriptionData.data?.subOrderCallStatus.status === OrderCallStatus.completedDrive) {
        const { data } = await callQuery({ orderId });
        setorderInfo(data?.getOrderById?.order);
        openModal();
      }
    },
  });

  return (
    <>
      {driverLocation && (
        <MapFrame
          origin={driverLocation}
          destination={destination}
          directions={directions}
          setDirections={setDirections}
        >
          <StyledUserGoToDestinationMenu>
            <div className="chat-with-driver">
              <Button type="primary" onClick={onClickChatRoom}>
                드라이버와 채팅하기
              </Button>
            </div>
          </StyledUserGoToDestinationMenu>
        </MapFrame>
      )}
      <Modal visible={isVisibleModal} onClose={onCompleteOrderHandler}>
        {orderInfo && (
          <OrderInfo>
            <div className="order-info-title">운행이 완료되었습니다</div>
            <div>{`출발지: '${orderInfo?.startingPoint.address}`}</div>
            <div>{`목적지: ${orderInfo?.destination.address}`}</div>
            <div>{`결제비: ${orderInfo?.amount}`}</div>
            <div>{`이동시간: ${calcDriveTime(orderInfo?.completedAt, orderInfo?.startedAt)}`}</div>
          </OrderInfo>
        )}
      </Modal>
    </>
  );
};

export default GoToDestination;
