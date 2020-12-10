import React, { FC } from 'react';
import { Descriptions } from 'antd';
import { GetCompletedOrders_getCompletedOrders_completedOrders as CompletedOrders } from '@/types/api';

import calcDriveTime from '@utils/calcDriveTime';

interface LogProps {
  order: CompletedOrders;
}

const { Item } = Descriptions;

const Log: FC<LogProps> = ({ order }) => {
  return (
    <Descriptions size="small" bordered>
      <Item label="출발지">{order.startingPoint.address}</Item>
      <Item label="도착지">{order.destination.address}</Item>
      <Item label="결제비">{`${order.amount} 원`}</Item>
      <Item label="운행시간">{calcDriveTime(order.startedAt, order.completedAt)}</Item>
    </Descriptions>
  );
};

export default Log;
