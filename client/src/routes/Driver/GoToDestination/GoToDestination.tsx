import React, { FC, useCallback, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';

import MapFrame from '@/components/MapFrame';
import { UPDATE_DRIVER_LOCATION } from '@queries/user.queries';
import { UpdateDriverLocation } from '@/types/api';
import { useCustomMutation } from '@hooks/useApollo';
import { Button } from 'antd-mobile';
import styled from '@/theme/styled';
import getUserLocation from '@utils/getUserLocation';
import { DRIVER } from '@utils/enums';
import { numberWithCommas } from '@utils/numberWithCommas';

import { InitialState, Location } from '@reducers/.';

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
  const history = useHistory();
  const [directions, setDirections] = useState<google.maps.DirectionsResult | undefined>(undefined);
  const [currentLocation, setCurrentLocation] = useState({ lat: 0, lng: 0 });
  const [taxiFee, setTaxiFee] = useState(DRIVER.BASE_TAXI_FEE);
  const { id } = useSelector(({ order }: InitialState) => order || {});
  const { destination } = useSelector(({ order }: InitialState) => order.location || {});
  const [updateDriverLocationMutation] = useCustomMutation<UpdateDriverLocation>(
    UPDATE_DRIVER_LOCATION,
  );
  const onClickChatRoom = () => {
    history.push(`/chatroom/${id}`);
  };
  const updateInitLocation = useCallback((location: Location | void) => {
    if (location) {
      setCurrentLocation(location);
      updateDriverLocationMutation({ variables: location });
    }
  }, []);

  const watchUpdateCurrentLocation = useCallback((location: Position) => {
    const updateLocation = { lat: location.coords.latitude, lng: location.coords.longitude };
    setCurrentLocation(updateLocation);
    updateDriverLocationMutation({
      variables: updateLocation,
    });
  }, []);

  const updateTaxiFee = useCallback(() => {
    setTaxiFee(taxiFee + DRIVER.INCRESE_TAXI_FEE);
  }, [taxiFee]);

  useEffect(() => {
    getUserLocation().then(updateInitLocation);
    const watchLocation = navigator.geolocation.watchPosition(watchUpdateCurrentLocation);
    const updateTaxiFeeInterval = setInterval(updateTaxiFee, 5000);
    return () => {
      clearInterval(updateTaxiFeeInterval);
      navigator.geolocation.clearWatch(watchLocation);
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
        <Button className="driver-chat-btn" onClick={onClickChatRoom}>
          손님과의 채팅
        </Button>
        <Button className="driver-arrive-btn" type="primary">
          도착완료
        </Button>
      </StyledGoToDestinationMenu>
    </MapFrame>
  );
};

export default GoToDestination;
