import React, { useState, useEffect } from 'react';
import { Button } from 'antd-mobile';
import styled from '@theme/styled';
import { useSubscription } from '@apollo/react-hooks';

import MapFrame from '@components/MapFrame';
import { GET_ORDER } from '@queries/order.queries';
import { SUB_DRIVER_LOCATION } from '@queries/user.queries';
import { GetOrderInfo, SubDriverLocation } from '@/types/api';
import { useCustomQuery } from '@hooks/useApollo';

const StyledWaitingDriverMenu = styled.section`
  height: 100%;
  display: flex;
  align-items: flex-end;

  & > .cancel-order-btn {
    width: 100%;

    & > .am-button {
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      height: 2rem;
      margin: 0.8rem 0;
      font-weight: 700;
      font-size: 0.9rem;
    }
  }
`;

const WaitingDriver = () => {
  const [directions, setDirections] = useState<google.maps.DirectionsResult | undefined>(undefined);
  const [driverLocation, setDriverLocation] = useState({ lat: 0, lng: 0 });
  const { data } = useCustomQuery<GetOrderInfo>(GET_ORDER, {
    variables: { orderId: '5fc45539e439ea40e869bf47' },
  });
  useSubscription<SubDriverLocation>(SUB_DRIVER_LOCATION, {
    variables: { orderId: '5fc45539e439ea40e869bf47' },
    onSubscriptionData: ({ subscriptionData }) => {
      const driverNewLocation = subscriptionData.data?.subDriverLocation.coordinates as number[];
      setDriverLocation({ lat: driverNewLocation[0], lng: driverNewLocation[1] });
    },
  });
  const order = data?.getOrderInfo.order;

  return (
    <MapFrame
      origin={driverLocation}
      destination={{
        lat: order?.startingPoint.coordinates[0] as number,
        lng: order?.startingPoint.coordinates[1] as number,
      }}
      setDirections={setDirections}
      directions={directions}
    >
      <StyledWaitingDriverMenu>
        <div className="cancel-order-btn">
          <Button type="warning">취소</Button>
        </div>
      </StyledWaitingDriverMenu>
    </MapFrame>
  );
};

export default WaitingDriver;
