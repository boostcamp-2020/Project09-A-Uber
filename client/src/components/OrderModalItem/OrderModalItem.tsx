/* eslint-disable no-underscore-dangle */
import React, { FC } from 'react';
import { useDispatch } from 'react-redux';
import { Button } from 'antd-mobile';

import { addOrderId } from '@reducers/order';
import styled from '@theme/styled';
import { useCustomMutation } from '@hooks/useApollo';
import { APPROVAL_ORDER } from '@queries/order.queries';
import {
  ApprovalOrder,
  GetUnassignedOrders_getUnassignedOrders_unassignedOrders as UnassignedOrder,
} from '@/types/api';

interface Props {
  order: UnassignedOrder;
  closeModal: () => void;
}

const StyledOrderItem = styled.div`
  font-size: 1rem;
  font-weight: 700;

  & > div {
    margin-bottom: 2rem;
    text-align: center;
  }

  & .origin,
  & .destination {
    display: block;
    margin-bottom: 0.8rem;
    height: 1.2rem;
    line-height: 1.2rem;
    text-align: left;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  & .am-button {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 2.2rem;
    font-size: 0.9rem;
  }
`;

const OrderModalItem: FC<Props> = ({ order, closeModal }) => {
  const dispatch = useDispatch();
  const [approvalOrder] = useCustomMutation<ApprovalOrder>(APPROVAL_ORDER, {
    onCompleted: ({ approvalOrder: approvalResult }) => {
      if (approvalResult.result === 'success') {
        closeModal();
      }
    },
  });

  const onClickApprovalOrder = () => {
    dispatch(addOrderId(order._id));
    approvalOrder({ variables: { orderId: order._id } });
  };

  return (
    <StyledOrderItem>
      <div>요청</div>
      <div className="location-info">
        <span className="origin">{`출발지: ${order.startingPoint.address}`}</span>
        <span className="destination">{`목적지: ${order.destination.address}`}</span>
      </div>
      <div>해당 운행을 수락하시겠습니까?</div>
      <Button type="primary" onClick={onClickApprovalOrder}>
        수락
      </Button>
    </StyledOrderItem>
  );
};

export default OrderModalItem;
