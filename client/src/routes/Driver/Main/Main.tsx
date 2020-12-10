import React, { FC, useState, useCallback, useEffect, useRef } from 'react';
import { useSubscription } from '@apollo/client';
import { useCustomQuery, useCustomMutation } from '@hooks/useApollo';
import {
  UpdateDriverLocation,
  GetUnassignedOrders,
  GetUnassignedOrders_getUnassignedOrders_unassignedOrders as Order,
  SubNewOrder,
} from '@/types/api';
import styled from '@theme/styled';
import MapFrame from '@components/MapFrame';
import OrderLog from '@components/OrderLog';
import Modal from '@components/Modal';
import OrderModalItem from '@components/OrderModalItem';
import { Location } from '@reducers/.';
import getUserLocation from '@utils/getUserLocation';
import { GET_UNASSIGNED_ORDERS, UPDATE_ORDER_LIST, SUB_NEW_ORDER } from '@queries/order';
import { UPDATE_DRIVER_LOCATION } from '@queries/user';
import useModal from '@hooks/useModal';

import { DRIVER } from '@utils/enums';

const StyledOrderLogList = styled.section`
  height: 100%;
  overflow: scroll;

  & > div {
    margin-bottom: 0.5rem;
  }

  & > h1 {
    display: flex;
    height: 100%;
    justify-content: center;
    align-items: center;
    font-size: 1.6rem;
    font-weight: 700;
    color: ${({ theme }) => theme.BORDER};
  }
`;

const Main: FC = () => {
  const { data: orders, callQuery } = useCustomQuery<GetUnassignedOrders>(GET_UNASSIGNED_ORDERS);
  const { unassignedOrders } = orders?.getUnassignedOrders || {};
  const [orderData, setOrderData] = useState<Order[] | null | undefined>();
  const [isModal, openModal, closeModal] = useModal();
  const [orderItem, setOrderItem] = useState<Order>();
  const [currentLocation, setCurrentLocation] = useState<Location>();
  const orderTimerRef = useRef<NodeJS.Timeout>();
  const [updateDriverLocation] = useCustomMutation<UpdateDriverLocation>(UPDATE_DRIVER_LOCATION);

  useSubscription<SubNewOrder>(SUB_NEW_ORDER, {
    variables: { lat: currentLocation?.lat, lng: currentLocation?.lng },
    onSubscriptionData: ({ subscriptionData }) => {
      const { newOrder } = subscriptionData.data?.subNewOrder || {};

      if (newOrder) {
        openModal();
        setOrderItem(newOrder);

        orderTimerRef.current = setTimeout(() => {
          closeModal();
        }, DRIVER.NEW_ORDER_DURATION);
      }
    },
  });

  const onClickCloseModal = useCallback(() => {
    if (orderTimerRef.current) {
      clearTimeout(orderTimerRef.current);
      orderTimerRef.current = undefined;
    }
    closeModal();
  }, [orderTimerRef.current]);

  useSubscription(UPDATE_ORDER_LIST, {
    onSubscriptionData: async () => {
      const newData = await callQuery();
      const { unassignedOrders: newOrderList } = newData?.data.getUnassignedOrders || {};
      setOrderData(newOrderList);
    },
  });

  const onClickOrder = (order: Order) => {
    openModal();
    setOrderItem(order);
  };

  const updateInitLocation = useCallback((location: Location | void) => {
    if (location) {
      updateDriverLocation({
        variables: location,
      });
      setCurrentLocation(location);
    }
  }, []);

  const watchUpdateCurrentLocation = useCallback((location: Position) => {
    const updateLocation = {
      lat: location.coords.latitude,
      lng: location.coords.longitude,
    };
    setCurrentLocation(updateLocation);
    updateDriverLocation({
      variables: updateLocation,
    });
  }, []);

  useEffect(() => {
    getUserLocation().then(updateInitLocation);
    const watchLocation = navigator.geolocation.watchPosition(watchUpdateCurrentLocation);

    return () => {
      navigator.geolocation.clearWatch(watchLocation);
    };
  }, []);

  useEffect(() => {
    setOrderData(unassignedOrders);
  }, [unassignedOrders]);

  return (
    <>
      {currentLocation && (
        <MapFrame origin={currentLocation}>
          <StyledOrderLogList>
            {orderData && orderData?.length !== 0 ? (
              orderData?.map((order) => (
                <OrderLog
                  order={order}
                  key={`order_list_${order._id}`}
                  onClick={() => onClickOrder(order)}
                />
              ))
            ) : (
              <h1>현재 요청이 없습니다</h1>
            )}
          </StyledOrderLogList>
        </MapFrame>
      )}
      <Modal visible={isModal} onClose={onClickCloseModal}>
        {orderItem && <OrderModalItem order={orderItem} closeModal={onClickCloseModal} />}
      </Modal>
    </>
  );
};

export default Main;
