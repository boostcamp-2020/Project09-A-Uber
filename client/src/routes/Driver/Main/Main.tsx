/* eslint-disable no-underscore-dangle */
import React, { FC, useState, useEffect } from 'react';
import { useSubscription } from '@apollo/client';
import { useCustomQuery } from '@hooks/useApollo';

import styled from '@theme/styled';
import MapFrame from '@components/MapFrame';
import OrderLog from '@components/OrderLog';
import Modal from '@components/Modal';
import OrderModalItem from '@components/OrderModalItem';
import { GET_UNASSIGNED_ORDERS, UPDATE_ORDER_LIST } from '@queries/order.queries';
import useModal from '@hooks/useModal';
import {
  GetUnassignedOrders,
  GetUnassignedOrders_getUnassignedOrders_unassignedOrders as Order,
} from '@/types/api';

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
  const { data } = useSubscription(UPDATE_ORDER_LIST, {
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

  useEffect(() => {
    setOrderData(unassignedOrders);
  }, [unassignedOrders]);

  return (
    <>
      <MapFrame>
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
