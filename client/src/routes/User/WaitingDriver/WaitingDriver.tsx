import React, { useState, useCallback, useEffect } from 'react';
import { useSubscription } from '@apollo/react-hooks';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import styled from '@theme/styled';
import { Button, Row, Modal } from 'antd';
import MapFrame from '@components/MapFrame';
import EstimatedTime from '@components/EstimatedTime';
import { GET_ORDER_CAR_INFO, SUB_ORDER_CALL_STATUS } from '@queries/order';
import { SUB_DRIVER_LOCATION, GET_DRIVER_LOCATION } from '@queries/user';
import {
  SubDriverLocation,
  GetOrderCarInfo,
  CarInfo as CarInfoType,
  SubOrderCallStatus,
  getDriverLocation,
} from '@/types/api';

import { OrderCallStatus } from '@/types/orderCallStatus';
import { useCustomQuery } from '@hooks/useApollo';
import useChatNotifycation from '@hooks/useChatNotifycation';
import { calcLocationDistance } from '@utils/calcLocationDistance';
import { InitialState } from '@reducers/.';
import { ModalFuncProps } from 'antd/lib/modal/Modal';
import { Message } from '@/utils/client-message';
import { carTypeMapperToKor } from '@/utils/carTypeMapperToKor';

const StyledRow = styled(Row)`
  height: 100%;

  & > .ant-btn {
    width: 100%;
  }
`;

const WaitingDriver = () => {
  const history = useHistory();
  const [modalItem, setModalItem] = useState<ModalFuncProps>();
  const [directions, setDirections] = useState<google.maps.DirectionsResult | undefined>(undefined);
  const [driverLocation, setDriverLocation] = useState({ lat: 0, lng: 0 });
  const [didCloseModal, setDidCloseModal] = useState(false);
  const [carInfo, setCarInfo] = useState({ carNumber: '', carType: 'small' } as CarInfoType);
  const { id } = useSelector(({ order }: InitialState) => order || {});
  const { origin: userOrigin } = useSelector(({ order }: InitialState) => order.location);

  useChatNotifycation(id || '');

  useEffect(() => {
    setModalItem({
      title: Message.DriverAjacent,
      content: (
        <>
          <div>{`${Message.CarType} : ${carTypeMapperToKor(carInfo.carType)}`}</div>
          <div>{`${Message.CarNumber} : ${carInfo.carNumber}`}</div>
        </>
      ),
      centered: true,
      okText: '확인',
    });
  }, [carInfo]);

  useCustomQuery<getDriverLocation>(GET_DRIVER_LOCATION, {
    variables: { orderId: id },
    onCompleted: (data) => {
      if (data.getDriverLocation.driverLocation) {
        setDriverLocation(data.getDriverLocation.driverLocation);
      }
    },
  });

  useCustomQuery<GetOrderCarInfo>(GET_ORDER_CAR_INFO, {
    variables: { orderId: id },
    onCompleted: (data) => {
      setCarInfo({
        carNumber: data.getOrderCarInfo.carInfo?.carNumber,
        carType: data.getOrderCarInfo.carInfo?.carType,
      } as CarInfoType);
    },
  });

  useSubscription<SubDriverLocation>(SUB_DRIVER_LOCATION, {
    variables: { orderId: id },
    onSubscriptionData: ({ subscriptionData }) => {
      const driverNewLocation = {
        lat: subscriptionData.data?.subDriverLocation.coordinates[0] as number,
        lng: subscriptionData.data?.subDriverLocation.coordinates[1] as number,
      };

      setDriverLocation(driverNewLocation);
    },
  });

  useEffect(() => {
    const diffDistance = directions?.routes[0].legs[0].distance.value;

    if (!didCloseModal && userOrigin && diffDistance !== undefined && diffDistance <= 500) {
      Modal.info(modalItem as ModalFuncProps);
      setDidCloseModal(true);
    }
  }, [directions]);

  useSubscription<SubOrderCallStatus>(SUB_ORDER_CALL_STATUS, {
    variables: { orderId: id },
    onSubscriptionData: ({ subscriptionData }) => {
      if (subscriptionData.data?.subOrderCallStatus.status === OrderCallStatus.startedDrive) {
        history.push('/user/goToDestination');
      }
    },
  });

  const onClickChatRoom = useCallback(() => {
    history.push(`/chatroom/${id}`);
  }, [id]);

  return (
    <MapFrame
      origin={driverLocation}
      destination={userOrigin}
      setDirections={setDirections}
      directions={directions}
    >
      <StyledRow className="order-info" align="bottom">
        <EstimatedTime directions={directions} />
        <Button type="primary" onClick={onClickChatRoom}>
          드라이버와 채팅하기
        </Button>
      </StyledRow>
    </MapFrame>
  );
};

export default WaitingDriver;
