import React, { FC, useCallback, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import MapFrame from '@/components/MapFrame';
import Modal from '@components/Modal';
import { UPDATE_DRIVER_LOCATION } from '@queries/user.queries';
import { COMPLETE_ORDER, GET_ORDER_BY_ID } from '@/queries/order';
import {
  UpdateDriverLocation,
  CompleteOrder,
  getOrderById,
  getOrderById_getOrderById_order as OrderType,
} from '@/types/api';
import { useCustomMutation, useCustomQuery } from '@hooks/useApollo';
import { Button } from 'antd-mobile';
import styled from '@/theme/styled';
import getUserLocation from '@utils/getUserLocation';
import useModal from '@hooks/useModal';
import { DRIVER } from '@utils/enums';
import { numberWithCommas } from '@utils/numberWithCommas';
import calcDriveTime from '@utils/calcDriveTime';

import { InitialState, Location } from '@reducers/.';
import { resetOrder } from '@reducers/order';

const StyledGoToDestinationMenu = styled.div`
  display: flex;
  height: 100%;
  flex-direction: column;
  justify-content: flex-end;

  & span {
    text-align: center;
    font-weight: 700;
    font-size: 0.9rem;
  }

  & .am-button {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 1rem;
    height: 2rem;
    cursor: pointer;
    font-weight: 700;
    font-size: 0.9rem;
  }

  & .driver-chat-btn {
    color: ${({ theme }) => theme.PRIMARY};
    border: 1px solid ${({ theme }) => theme.PRIMARY};
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
  const [orderInfo, setorderInfo] = useState<OrderType | null>();
  const [directions, setDirections] = useState<google.maps.DirectionsResult | undefined>(undefined);
  const [currentLocation, setCurrentLocation] = useState({ lat: 0, lng: 0 });
  const [taxiFee, setTaxiFee] = useState(DRIVER.BASE_TAXI_FEE);
  const [isVisibleModal, openModal, closeModal] = useModal();
  const { id } = useSelector(({ order }: InitialState) => order || {});
  const { destination } = useSelector(({ order }: InitialState) => order.location || {});
  const { callQuery } = useCustomQuery<getOrderById>(GET_ORDER_BY_ID, { skip: true });
  const [updateDriverLocationMutation] = useCustomMutation<UpdateDriverLocation>(
    UPDATE_DRIVER_LOCATION,
  );
  const [completeOrderMutation] = useCustomMutation<CompleteOrder>(COMPLETE_ORDER, {
    onCompleted: async ({ completeOrder }) => {
      if (completeOrder.result === 'success') {
        const { data } = await callQuery({ orderId: id });
        setorderInfo(data?.getOrderById?.order);
        openModal();
      }
    },
  });

  const onClickChatRoom = () => {
    history.push(`/chatroom/${id}`);
  };

  const onCompleteOrderHandler = useCallback(() => {
    closeModal();
    dispatch(resetOrder());
    history.push(`/driver`);
  }, []);

  const onClickOrderCompleteHandler = useCallback(() => {
    completeOrderMutation({ variables: { orderId: id, amount: taxiFee } });
  }, [id, taxiFee]);

  const updateInitLocation = useCallback((location: Location | void) => {
    if (location) {
      setCurrentLocation(location);
      updateDriverLocationMutation({ variables: location });
    }
  }, []);

  const watchUpdateCurrentLocation = useCallback((location: Position) => {
    const updateLocation = { lat: location.coords.latitude, lng: location.coords.longitude };
    setCurrentLocation(updateLocation);
    updateDriverLocationMutation({
      variables: updateLocation,
    });
  }, []);

  const updateTaxiFee = useCallback(() => {
    setTaxiFee((pre) => pre + DRIVER.INCRESE_TAXI_FEE);
  }, [taxiFee]);

  useEffect(() => {
    getUserLocation().then(updateInitLocation);
    const watchLocation = navigator.geolocation.watchPosition(watchUpdateCurrentLocation);
    const updateTaxiFeeInterval = setInterval(updateTaxiFee, 5000);
    return () => {
      clearInterval(updateTaxiFeeInterval);
      navigator.geolocation.clearWatch(watchLocation);
    };
  }, []);

  return (
    <>
      <MapFrame
        origin={currentLocation}
        destination={destination}
        setDirections={setDirections}
        directions={directions}
      >
        <StyledGoToDestinationMenu>
          <span>현재요금: {numberWithCommas(taxiFee)}</span>
          <Button className="driver-chat-btn" onClick={onClickChatRoom}>
            손님과의 채팅
          </Button>
          <Button
            className="driver-arrive-btn"
            type="primary"
            onClick={onClickOrderCompleteHandler}
          >
            도착완료
          </Button>
        </StyledGoToDestinationMenu>
      </MapFrame>
      <Modal visible={isVisibleModal} onClose={onCompleteOrderHandler}>
        {orderInfo && (
          <OrderInfo>
            <div className="order-info-title">운행이 완료되었습니다</div>
            <div>출발지: {orderInfo?.startingPoint.address}</div>
            <div>목적지: {orderInfo?.destination.address}</div>
            <div>결제비: {orderInfo?.amount}</div>
            <div>이동시간: {calcDriveTime(orderInfo?.completedAt, orderInfo?.startedAt)}</div>
          </OrderInfo>
        )}
      </Modal>
    </>
  );
};

export default GoToDestination;
