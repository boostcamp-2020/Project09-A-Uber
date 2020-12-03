import React, { FC, useState, useCallback, useEffect } from 'react';
import { Button } from 'antd-mobile';
import styled from '@theme/styled';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';

import MapFrame from '@components/MapFrame';
import getUserLocation from '@utils/getUserLocation';
import { USER } from '@utils/enums';
import { InitialState, Location } from '@reducers/.';

// TODO: user/waitingDriver의 스타일과 유사, 추후 리팩터링 필요
const StyledUserGoToDestinationMenu = styled.section`
  height: 100%;
  display: flex;
  align-items: flex-end;

  & > .chat-with-driver {
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

const GoToDestination: FC = () => {
  const history = useHistory();
  const { id: orderId } = useSelector(({ order }: InitialState) => order || {});
  const { destination } = useSelector(({ order }: InitialState) => order.location || {});
  const [directions, setDirections] = useState<google.maps.DirectionsResult | undefined>(undefined);
  const [currentLocation, setCurrentLocation] = useState<Location>();

  const onClickChatRoom = useCallback(() => {
    history.push(`/chatroom/${orderId}`);
  }, []);

  const updateCurrentLocation = useCallback(async () => {
    const userLocation = await getUserLocation();
    if (userLocation) {
      setCurrentLocation(userLocation);
    }
  }, []);

  const watchUpdateCurrentLocation = useCallback((location: Position) => {
    setCurrentLocation({
      lat: location.coords.latitude,
      lng: location.coords.longitude,
    });
  }, []);

  useEffect(() => {
    updateCurrentLocation();
    const watchLocation = navigator.geolocation.watchPosition(watchUpdateCurrentLocation);
    return () => {
      navigator.geolocation.clearWatch(watchLocation);
    };
  }, []);

  return (
    <>
      {currentLocation && (
        <MapFrame
          origin={currentLocation}
          destination={destination}
          directions={directions}
          setDirections={setDirections}
        >
          <StyledUserGoToDestinationMenu>
            <div className="chat-with-driver">
              <Button type="primary" onClick={onClickChatRoom}>
                드라이버와 채팅하기
              </Button>
            </div>
          </StyledUserGoToDestinationMenu>
        </MapFrame>
      )}
    </>
  );
};

export default GoToDestination;
