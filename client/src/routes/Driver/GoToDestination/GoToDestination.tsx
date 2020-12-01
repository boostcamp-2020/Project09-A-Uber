import React, { FC, useEffect, useState } from 'react';
import MapFrame from '@/components/MapFrame';
import { GET_ORDER } from '@queries/order.queries';
import { UPDATE_DRIVER_LOCATION } from '@queries/user.queries';
import { GetOrderInfo, UpdateDriverLocation } from '@/types/api';
import { useCustomQuery, useCustomMutation } from '@hooks/useApollo';
import { Button } from 'antd-mobile';
import styled from '@/theme/styled';
import getUserLocation from '@utils/getUserLocation';
import { DRIVER } from '@utils/enums';
import { numberWithCommas } from '@utils/numberWithCommas';

const StyledGoToDestinationMenu = styled.div`
  display: flex;
  height: 100%;
  flex-direction: column;
  justify-content: flex-end;

  & span {
    text-align: center;
    font-weight: 700;
    font-size: 0.9rem;
  }

  & .am-button {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 1rem;
    height: 2rem;
    cursor: pointer;
    font-weight: 700;
    font-size: 0.9rem;
  }

  & .driver-chat-btn {
    color: ${({ theme }) => theme.PRIMARY};
    border: 1px solid ${({ theme }) => theme.PRIMARY};
  }
`;

const GoToDestination: FC = () => {
  const [directions, setDirections] = useState<google.maps.DirectionsResult | undefined>(undefined);
  const [currentLocation, setCurrentLocation] = useState({ lat: 0, lng: 0 });
  const [destination, setDestination] = useState({ lat: 0, lng: 0 });
  const [taxiFee, setTaxiFee] = useState(DRIVER.BASE_TAXI_FEE);
  const { callQuery } = useCustomQuery<GetOrderInfo>(GET_ORDER, { skip: true });
  const [updateDriverLocationMutation] = useCustomMutation<UpdateDriverLocation>(
    UPDATE_DRIVER_LOCATION,
  );
  const updateCurrentLocation = async () => {
    const currLocation = await getUserLocation();

    if (currLocation) {
      setTaxiFee((pre) => pre + DRIVER.INCRESE_TAXI_FEE);
      updateDriverLocationMutation({
        variables: { lat: currLocation.lat, lng: currLocation.lng },
      });
      setCurrentLocation(currLocation);
    }
  };

  useEffect(() => {
    (async () => {
      const result = await callQuery({ orderId: '5fc39490270c0a452ebfde4a' });
      const lat = result?.data.getOrderInfo.order?.destination.coordinates[0] as number;
      const lng = result?.data.getOrderInfo.order?.destination.coordinates[1] as number;
      setDestination({ lat, lng });
    })();
    const updateCurrentLocationInterval = setInterval(updateCurrentLocation, 5000);
    return () => {
      clearInterval(updateCurrentLocationInterval);
    };
  }, []);

  return (
    <MapFrame
      origin={currentLocation}
      destination={destination}
      setDirections={setDirections}
      directions={directions}
    >
      <StyledGoToDestinationMenu>
        <span>현재요금: {numberWithCommas(taxiFee)}</span>
        <Button className="driver-chat-btn">손님과의 채팅</Button>
        <Button className="driver-arrive-btn" type="primary">
          도착완료
        </Button>
      </StyledGoToDestinationMenu>
    </MapFrame>
  );
};

export default GoToDestination;
