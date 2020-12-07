import React, { useState, useCallback } from 'react';
import { Button } from 'antd-mobile';
import styled from '@theme/styled';
import { useSubscription } from '@apollo/react-hooks';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

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
import { calcLocationDistance } from '@utils/calcLocationDistance';
import CarInfo from '@components/CarInfo';
import Modal from '@components/Modal';
import useModal from '@hooks/useModal';
import { Message } from '@utils/client-message';
import { InitialState } from '@reducers/.';

const StyledWaitingDriverMenu = styled.section`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;

  & > .chat-with-driver {
    width: 100%;
    margin-top: 0.8rem;

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

// TODO: 출발지, 목적지 재지정 필요
const WaitingDriver = () => {
  const history = useHistory();
  const [directions, setDirections] = useState<google.maps.DirectionsResult | undefined>(undefined);
  const [driverLocation, setDriverLocation] = useState({ lat: 0, lng: 0 });
  const [isModal, openModal, closeModal] = useModal();
  const [didCloseModal, setDidCloseModal] = useState(false);
  const [carInfo, setCarInfo] = useState({ carNumber: '', carType: 'small' } as CarInfoType);
  const { id } = useSelector(({ order }: InitialState) => order || {});
  const { origin: userOrigin } = useSelector(({ order }: InitialState) => order.location);

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
      if (
        didCloseModal === false &&
        userOrigin &&
        calcLocationDistance(driverNewLocation, userOrigin) < 100
      ) {
        openModal();
        setDidCloseModal(true);
      }
    },
  });
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
    <>
      <MapFrame
        origin={driverLocation}
        destination={userOrigin}
        setDirections={setDirections}
        directions={directions}
      >
        <StyledWaitingDriverMenu>
          <EstimatedTime directions={directions} />
          <div className="chat-with-driver">
            <Button type="primary" onClick={onClickChatRoom}>
              드라이버와 채팅하기
            </Button>
          </div>
        </StyledWaitingDriverMenu>
      </MapFrame>
      <Modal visible={isModal} onClose={closeModal}>
        {carInfo && <CarInfo carInfo={carInfo} title={Message.DriverAjacent} />}
      </Modal>
    </>
  );
};

export default WaitingDriver;
