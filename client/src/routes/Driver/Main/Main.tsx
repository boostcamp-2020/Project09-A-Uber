/* eslint-disable no-underscore-dangle */
import React, { FC, useState } from 'react';
import { useCustomQuery } from '@hooks/useApollo';

import styled from '@theme/styled';
import MapFrame from '@components/MapFrame';
import OrderLog from '@components/OrderLog';
import Modal from '@components/Modal';
import OrderModalItem from '@components/OrderModalItem';
import { GET_UNASSIGNED_ORDERS } from '@queries/order.queries';
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
  const { data: orders } = useCustomQuery<GetUnassignedOrders>(GET_UNASSIGNED_ORDERS);
  const [isModal, openModal, closeModal] = useModal();
  const [orderItem, setOrderItem] = useState<Order>();
  const { unassignedOrders } = orders?.getUnassignedOrders || {};

  const onClickOrder = (order: Order) => {
    openModal();
    setOrderItem(order);
  };

  return (
    <>
      <MapFrame>
        <StyledOrderLogList>
          {unassignedOrders && unassignedOrders?.length !== 0 ? (
            unassignedOrders?.map((order) => (
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
