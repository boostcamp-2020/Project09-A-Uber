/* eslint-disable no-underscore-dangle */
import React, { FC } from 'react';
import { useCustomQuery } from '@hooks/useApollo';

import styled from '@theme/styled';
import MapFrame from '@components/MapFrame';
import OrderLog from '@components/OrderLog';
import { GET_UNASSIGNED_ORDERS } from '@queries/order.queries';
import { GetUnassignedOrders } from '@/types/api';

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

  return (
    <MapFrame>
      <StyledOrderLogList>
        {orders?.getUnassignedOrders.unassignedOrders?.map((order) => (
          <>
            <OrderLog order={order} key={`order_list_${order._id}`} />
          </>
        )) || <h1>현재 요청이 없습니다</h1>}
      </StyledOrderLogList>
    </MapFrame>
  );
};

export default Main;
