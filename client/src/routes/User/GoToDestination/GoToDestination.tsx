import React, { FC, useState, useCallback, useEffect } from 'react';
import { Button, Modal } from 'antd';
import styled from '@theme/styled';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useSubscription } from '@apollo/react-hooks';

import MapFrame from '@components/MapFrame';
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
import { InitialState, Location } from '@reducers/.';
import { resetOrder } from '@reducers/order';
import calcDriveTime from '@utils/calcDriveTime';
import { Message } from '@utils/client-message';

const StyledUserGoToDestinationMenu = styled.section`
  height: 100%;
  display: flex;
  align-items: flex-end;

  & .ant-btn {
    width: 100%;
  }
`;

const GoToDestination: FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { id: orderId } = useSelector(({ order }: InitialState) => order || {});
  const { destination } = useSelector(({ order }: InitialState) => order.location || {});
  const [directions, setDirections] = useState<google.maps.DirectionsResult | undefined>(undefined);
  const [driverLocation, setDriverLocation] = useState<Location>();
  const [orderInfo, setorderInfo] = useState<OrderType | null>();
  const { callQuery } = useCustomQuery<getOrderById>(GET_ORDER_BY_ID, { skip: true });

  useEffect(() => {
    if (orderInfo) {
      Modal.success({
        title: Message.CompletedOrder,
        content: (
          <>
            <div>{`${Message.Origin}: '${orderInfo?.startingPoint.address}`}</div>
            <div>{`${Message.Destination}: ${orderInfo?.destination.address}`}</div>
            <div>{`${Message.Amount}: ${orderInfo?.amount}`}</div>
            <div>
              {`${Message.DrivingTime}: ${calcDriveTime(
                orderInfo?.completedAt,
                orderInfo?.startedAt,
              )}`}
            </div>
          </>
        ),
        centered: true,
        onOk: onCompleteOrderHandler,
      });
    }
  }, [orderInfo]);

  const onClickChatRoom = useCallback(() => {
    history.push(`/chatroom/${orderId}`);
  }, []);

  const onCompleteOrderHandler = useCallback(() => {
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
        setorderInfo(data.getOrderById.order);
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
            <Button type="primary" onClick={onClickChatRoom}>
              드라이버와 채팅하기
            </Button>
          </StyledUserGoToDestinationMenu>
        </MapFrame>
      )}
    </>
  );
};

export default GoToDestination;
