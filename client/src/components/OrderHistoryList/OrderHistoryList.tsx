import React, { FC } from 'react';
import { GetCompletedOrders_getCompletedOrders_completedOrders as CompletedOrders } from '@/types/api';
import styled from '@theme/styled';
import Log from './Log';

const StyledOrderHistoryList = styled.div`
  padding: 0 1rem;
  overflow-y: scroll;
  height: calc(100% - 3rem);
`;

interface OrderHistoryListProps {
  orders: CompletedOrders[] | undefined | null;
}

const OrderHistoryList: FC<OrderHistoryListProps> = ({ orders }) => {
  return (
    <StyledOrderHistoryList>
      {orders && orders.length !== 0 ? orders.map((order) => <Log order={order} />) : <>No Order</>}
    </StyledOrderHistoryList>
  );
};

export default OrderHistoryList;
