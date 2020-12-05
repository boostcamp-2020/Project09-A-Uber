import React from 'react';
import { useHistory } from 'react-router-dom';

import OrderHistoryList from '@/components/OrderHistoryList';
import {
  GetCompletedOrders,
  GetCompletedOrders_getCompletedOrders_completedOrders as CompletedOrders,
} from '@/types/api';
import { GET_COMPLETED_ORDER } from '@queries/order';
import { useCustomQuery } from '@hooks/useApollo';
import HeaderWithBack from '@components/HeaderWithBack';

const OrderHistory = () => {
  const history = useHistory();
  const { data } = useCustomQuery<GetCompletedOrders>(GET_COMPLETED_ORDER);
  const completedOrders = data?.getCompletedOrders.completedOrders;

  const onClickBackButton = () => {
    history.goBack();
  };

  return (
    <>
      <HeaderWithBack onClick={onClickBackButton} className="green-header" />
      <OrderHistoryList orders={completedOrders} />
    </>
  );
};

export default OrderHistory;
