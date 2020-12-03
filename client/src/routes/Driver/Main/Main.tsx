/* eslint-disable no-underscore-dangle */
import React, { FC, useState, useEffect } from 'react';
import { useSubscription } from '@apollo/client';
import { useCustomQuery, useCustomMutation } from '@hooks/useApollo';
import {
  UpdateDriverLocation,
  GetUnassignedOrders,
  GetUnassignedOrders_getUnassignedOrders_unassignedOrders as Order,
} from '@/types/api';
import styled from '@theme/styled';
import MapFrame from '@components/MapFrame';
import OrderLog from '@components/OrderLog';
import Modal from '@components/Modal';
import OrderModalItem from '@components/OrderModalItem';
import { Location } from '@reducers/.';
import getUserLocation from '@utils/getUserLocation';
import { GET_UNASSIGNED_ORDERS, UPDATE_ORDER_LIST, SUB_NEW_ORDER } from '@queries/order.queries';
import { UPDATE_DRIVER_LOCATION } from '@queries/user.queries';
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
  const [currentLocation, setCurrentLocation] = useState<Location>({ lat: 0, lng: 0 });
  const [updateDriverLocation] = useCustomMutation<UpdateDriverLocation>(UPDATE_DRIVER_LOCATION);
  const { data } = useSubscription(UPDATE_ORDER_LIST, {
    onSubscriptionData: async () => {
      const newData = await callQuery();
      const { unassignedOrders: newOrderList } = newData?.data.getUnassignedOrders || {};
      setOrderData(newOrderList);
    },
  });
  const { data: addedOrder, loading } = useSubscription(SUB_NEW_ORDER, {
    variables: { lat: currentLocation.lat, lng: currentLocation.lng },
  });
  const onClickOrder = (order: Order) => {
    openModal();
    setOrderItem(order);
  };

  const updateCurrentLocation = async () => {
    const curLocation = await getUserLocation();
    if (curLocation) {
      updateDriverLocation({
        variables: curLocation,
      });
      setCurrentLocation(curLocation);
    }
  };

  useEffect(() => {
    const locationUpdateTimer = setInterval(
      updateCurrentLocation,
      DRIVER.NEXT_LOCATION_UPDATE_TIME,
    );
    return () => clearInterval(locationUpdateTimer);
  }, []);

  useEffect(() => {
    if (!loading && addedOrder) {
      const { newOrder } = addedOrder.subNewOrder;
      openModal();
      setOrderItem(newOrder);

      const timer = setTimeout(() => {
        closeModal();
      }, DRIVER.NEW_ORDER_DURATION);
      return () => clearTimeout(timer);
    }
  }, [addedOrder]);

  useEffect(() => {
    setOrderData(unassignedOrders);
  }, [unassignedOrders]);

  return (
    <>
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
      <Modal visible={isModal} onClose={closeModal}>
        {orderItem && <OrderModalItem order={orderItem} closeModal={closeModal} />}
      </Modal>
    </>
  );
};

export default Main;
