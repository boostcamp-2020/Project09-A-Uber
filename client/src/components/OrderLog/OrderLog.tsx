import React, { FC } from 'react';

import { GetUnassignedOrders_getUnassignedOrders_unassignedOrders as UnassignedOrder } from '@/types/api';
import styled from '@theme/styled';

interface Props {
  order: UnassignedOrder;
  onClick?: () => void;
}

const StyledOrderLog = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${({ theme }) => theme.LIGHT_GRAY};
  padding: 0.4rem 0.8rem;
  border-radius: 0.4rem;
  cursor: pointer;

  & > .order-address {
    width: 45%;
    height: 0.8rem;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    font-weight: 700;
    font-size: 0.8rem;
  }

  & > .order-dot {
    background-color: ${({ theme }) => theme.PRIMARY};
    width: 0.3rem;
    height: 0.3rem;
    border-radius: 0.15rem;
  }
`;

const OrderLog: FC<Props> = ({ order, onClick }) => (
  <StyledOrderLog onClick={onClick}>
    <span className="order-dot" />
    <span className="order-address">{`출발지: ${order.startingPoint.address}`}</span>
    <span className="order-address">{`목적지: ${order.destination.address}`}</span>
  </StyledOrderLog>
);

export default OrderLog;
