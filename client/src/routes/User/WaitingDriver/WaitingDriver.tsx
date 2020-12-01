import React, { useState } from 'react';
import { Button } from 'antd-mobile';
import styled from '@theme/styled';
import { useSubscription } from '@apollo/react-hooks';

import MapFrame from '@components/MapFrame';
import { GET_ORDER, GET_ORDER_CAR_INFO } from '@queries/order.queries';
import { SUB_DRIVER_LOCATION } from '@queries/user.queries';
import {
  GetOrderInfo,
  SubDriverLocation,
  GetOrderCarInfo,
  CarInfo as CarInfoType,
} from '@/types/api';
import { useCustomQuery } from '@hooks/useApollo';
import { calcLocationDistance } from '@utils/calcLocationDistance';
import CarInfo from '@components/CarInfo';
import Modal from '@components/Modal';
import useModal from '@hooks/useModal';
import { Message } from '@utils/client-message';

const StyledWaitingDriverMenu = styled.section`
  height: 100%;
  display: flex;
  align-items: flex-end;

  & > .cancel-order-btn {
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

const WaitingDriver = () => {
  const [directions, setDirections] = useState<google.maps.DirectionsResult | undefined>(undefined);
  const [driverLocation, setDriverLocation] = useState({ lat: 0, lng: 0 });
  const [isModal, openModal, closeModal] = useModal();
  const [carInfo, setCarInfo] = useState({ carNumber: '', carType: 'small' } as CarInfoType);
  useCustomQuery<GetOrderCarInfo>(GET_ORDER_CAR_INFO, {
    variables: { orderId: '5fc45539e439ea40e869bf47' },
    onCompleted: (data) => {
      setCarInfo({
        carNumber: data.getOrderCarInfo.carInfo?.carNumber,
        carType: data.getOrderCarInfo.carInfo?.carType,
      } as CarInfoType);
    },
  });
  const { data } = useCustomQuery<GetOrderInfo>(GET_ORDER, {
    variables: { orderId: '5fc45539e439ea40e869bf47' },
  });
  const destination = {
    lat: data?.getOrderInfo.order?.startingPoint.coordinates[0] as number,
    lng: data?.getOrderInfo.order?.destination.coordinates[1] as number,
  };
  useSubscription<SubDriverLocation>(SUB_DRIVER_LOCATION, {
    variables: { orderId: '5fc45539e439ea40e869bf47' },
    onSubscriptionData: ({ subscriptionData }) => {
      const driverNewLocation = {
        lat: subscriptionData.data?.subDriverLocation.coordinates[0] as number,
        lng: subscriptionData.data?.subDriverLocation.coordinates[1] as number,
      };
      setDriverLocation(driverNewLocation);
      if (calcLocationDistance(driverNewLocation, destination) < 100) {
        openModal();
      }
    },
  });

  return (
    <>
      <MapFrame
        origin={driverLocation}
        destination={destination}
        setDirections={setDirections}
        directions={directions}
      >
        <StyledWaitingDriverMenu>
          <div className="cancel-order-btn">
            <Button type="warning">취소</Button>
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
