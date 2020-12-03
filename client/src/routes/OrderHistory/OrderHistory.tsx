import React from 'react';

import OrderHistoryList from '@/components/OrderHistoryList';
import { GetCompletedOrders } from '@/types/api';
import { GET_COMPLETED_ORDER } from '@queries/order.queries';
import { useCustomQuery } from '@hooks/useApollo';

const OrderHistory = () => {
  const { data: orders } = useCustomQuery<GetCompletedOrders>(GET_COMPLETED_ORDER);
  console.log(orders);

  return <OrderHistoryList />;
};

export default OrderHistory;
