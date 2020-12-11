import React, { FC } from 'react';
import { List } from 'antd';

import { GetCompletedOrders_getCompletedOrders_completedOrders as CompletedOrders } from '@/types/api';

import Log from './Log';

interface OrderHistoryListProps {
  orders: CompletedOrders[] | undefined | null;
}

const OrderHistoryList: FC<OrderHistoryListProps> = ({ orders }) => {
  return (
    <>
      {orders && (
        <List
          dataSource={orders}
          renderItem={(order) => (
            <List.Item>
              <Log order={order} key={`completed_order_${order._id}`} />
            </List.Item>
          )}
        />
      )}
    </>
  );
};

export default OrderHistoryList;
