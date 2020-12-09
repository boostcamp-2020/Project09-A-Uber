import React, { useState, useEffect, useCallback, FC } from 'react';
import { useHistory } from 'react-router-dom';
import { Button, Toast } from 'antd-mobile';
import { useSelector } from 'react-redux';
import styled from '@theme/styled';

import MapFrame from '@components/MapFrame';
import { START_DRIVING } from '@queries/order';
import { UPDATE_DRIVER_LOCATION } from '@queries/user';
import { UpdateDriverLocation, StartDriving } from '@/types/api';
import { useCustomMutation } from '@hooks/useApollo';
import { InitialState } from '@reducers/.';
import { SUB_CHAT } from '@queries/chat';
import { useSubscription } from '@apollo/react-hooks';
import { TOAST_DURATION } from '@utils/enums';
import { Message } from '@utils/client-message';

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

const GoToOrigin: FC = () => {
  const [directions, setDirections] = useState<google.maps.DirectionsResult | undefined>(undefined);
  const [currentLocation, setCurrentLocation] = useState({ lat: 0, lng: 0 });
  const { id } = useSelector(({ order }: InitialState) => order || {});
  const { origin: userOrigin } = useSelector(({ order }: InitialState) => order.location || {});
  const [updateDriverLocationMutation] = useCustomMutation<UpdateDriverLocation>(
    UPDATE_DRIVER_LOCATION,
  );
  const [startDrivingMutation] = useCustomMutation<StartDriving>(START_DRIVING, {
    onCompleted: ({ startDriving }) => {
      if (startDriving?.result === 'success') {
        history.push('/driver/goToDestination');
      }
    },
  });
  const history = useHistory();

  const onClickChatRoom = () => {
    history.push(`/chatroom/${id}`);
  };

  useSubscription(SUB_CHAT, {
    variables: {
      chatId: id,
    },
    onSubscriptionData: () => {
      Toast.config({ mask: false, duration: TOAST_DURATION.RECEIVE_CHAT });
      Toast.info(Message.ChatMessage);
    },
  });

  const watchUpdateCurrentLocation = useCallback((location: Position) => {
    setCurrentLocation({
      lat: location.coords.latitude,
      lng: location.coords.longitude,
    });
    updateDriverLocationMutation({
      variables: { lat: location.coords.latitude, lng: location.coords.longitude },
    });
  }, []);

  const onClickStartDrive = useCallback(() => {
    startDrivingMutation({ variables: { orderId: id } });
  }, [id]);

  useEffect(() => {
    const watchLocation = navigator.geolocation.watchPosition(watchUpdateCurrentLocation);
    return () => {
      navigator.geolocation.clearWatch(watchLocation);
    };
  }, []);

  return (
    <>
      {userOrigin && (
        <MapFrame
          origin={currentLocation}
          destination={userOrigin}
          setDirections={setDirections}
          directions={directions}
        >
          <StyledDriverGoToOriginMenu>
            <div className="driver-start-order-btn">
              <div className="driver-start-order-info">손님이 탑승하시고 나서 눌러주세요.</div>
              <Button onClick={onClickStartDrive} type="primary">
                운행시작
              </Button>
              <Button className="driver-chat-btn" onClick={onClickChatRoom}>
                손님과의 채팅
              </Button>
            </div>
          </StyledDriverGoToOriginMenu>
        </MapFrame>
      )}
    </>
  );
};

export default GoToOrigin;
