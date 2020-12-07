import React, { FC } from 'react';
import { GetCompletedOrders_getCompletedOrders_completedOrders as CompletedOrders } from '@/types/api';
import styled from '@theme/styled';
import calcDriveTime from '@utils/calcDriveTime';

const StyledLog = styled.div`
  border: 1px solid lightgray;
  border-radius: 0.5rem;
  margin: 1rem 0;
  padding: 0.5rem;

  & .completed-order-info {
    display: flex;
    margin-bottom: 0.4rem;

    & .completed-order-info-title {
      margin-right: 2.3rem;
    }
  }

  & .last-completed-order-info {
    display: flex;

    & .completed-order-info-title {
      margin-right: 1.5rem;
    }
  }
`;

interface LogProps {
  order: CompletedOrders;
}

const Log: FC<LogProps> = ({ order }) => {
  return (
    <StyledLog>
      <div className="completed-order-info">
        <div className="completed-order-info-title">출발지 </div>
        <div>{order.startingPoint.address}</div>
      </div>
      <div className="completed-order-info">
        <div className="completed-order-info-title">도착지 </div>
        <div>{order.destination.address}</div>
      </div>
      <div className="completed-order-info">
        <div className="completed-order-info-title">결제비 </div>
        <div>{`${order.amount} 원`}</div>
      </div>
      <div className="last-completed-order-info">
        <div className="completed-order-info-title">운행시간 </div>
        <div>{calcDriveTime(order.startedAt, order.completedAt)}</div>
      </div>
    </StyledLog>
  );
};

export default Log;
