import React, { useState, useEffect } from 'react';
import { Button } from 'antd-mobile';
import styled from '@theme/styled';

import MapFrame from '@components/MapFrame';
import { GET_ORDER } from '@queries/order.queries';
import { UPDATE_DRIVER_LOCATION } from '@queries/user.queries';
import { GetOrderInfo, UpdateDriverLocation } from '@/types/api';
import { Location } from '@components/GoogleMap/GoogleMap';
import { useCustomQuery, useCustomMutation } from '@hooks/useApollo';

const StyledDriverGoToOriginMenu = styled.section`
  height: 100%;
  display: flex;
  align-items: flex-end;

  & > .driver-start-order-btn {
    width: 100%;
    & > .driver-start-order-info {
      display: flex;
      justify-content: center;
      color: grey;
    }

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

const GoToOrigin = () => {
  const [directions, setDirections] = useState<google.maps.DirectionsResult | undefined>(undefined);
  const [currentLocation, setCurrentLocation] = useState({ lat: 0, lng: 0 });
  const { data } = useCustomQuery<GetOrderInfo>(GET_ORDER, {
    variables: { orderId: '5fc45539e439ea40e869bf47' },
  });
  const [updateDriverLocationMutation] = useCustomMutation<UpdateDriverLocation>(
    UPDATE_DRIVER_LOCATION,
  );

  const order = data?.getOrderInfo.order;

  const updateCurrentLocation = async () => {
    const currLocation = await new Promise<Location>((res) => {
      window.navigator.geolocation.getCurrentPosition((position) => {
        res({ lat: position.coords.latitude, lng: position.coords.longitude });
      });
    });

    setCurrentLocation(currLocation);
    updateDriverLocationMutation({
      variables: { lat: currLocation.lat, lng: currLocation.lng },
    });
  };

  useEffect(() => {
    const updateCurrentLocationInterval = setInterval(updateCurrentLocation, 5000);

    return () => {
      clearInterval();
    };
  }, []);

  return (
    <>
      <MapFrame
        origin={currentLocation}
        destination={{
          lat: order?.startingPoint.coordinates[0] as number,
          lng: order?.startingPoint.coordinates[1] as number,
        }}
        setDirections={setDirections}
        directions={directions}
      >
        <StyledDriverGoToOriginMenu>
          <div className="driver-start-order-btn">
            <div className="driver-start-order-info">손님이 탑승하시고 나서 눌러주세요.</div>
            <Button type="primary">운행시작</Button>
          </div>
        </StyledDriverGoToOriginMenu>
      </MapFrame>
    </>
  );
};

export default GoToOrigin;
