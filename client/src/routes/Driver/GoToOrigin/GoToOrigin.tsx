import React, { useState, useEffect, useCallback, FC } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import styled from '@theme/styled';

import MapFrame from '@components/MapFrame';
import { START_DRIVING } from '@queries/order';
import { UPDATE_DRIVER_LOCATION } from '@queries/user';
import { UpdateDriverLocation, StartDriving } from '@/types/api';
import { useCustomMutation } from '@hooks/useApollo';
import useChatNotifycation from '@hooks/useChatNotifycation';
import { InitialState } from '@reducers/.';
import { Button, Row, Col } from 'antd';

const StyledDriverGoToOriginMenu = styled.section`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: flex-end;

  & .row {
    width: 100%;
    margin-bottom: 0.5rem;
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

  useChatNotifycation(id || '');

  const history = useHistory();

  const onClickChatRoom = () => {
    history.push(`/chatroom/${id}`);
  };

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
            <Row justify="center" align="middle" className="row">
              <Col>손님이 탑승하시고 나서 눌러주세요.</Col>
            </Row>
            <Row justify="center" className="row">
              <Col span={24}>
                <Button onClick={onClickStartDrive} type="primary" block>
                  운행시작
                </Button>
              </Col>
            </Row>
            <Row justify="center" className="row">
              <Col span={24}>
                <Button className="driver-chat-btn" onClick={onClickChatRoom} block>
                  손님과의 채팅
                </Button>
              </Col>
            </Row>
          </StyledDriverGoToOriginMenu>
        </MapFrame>
      )}
    </>
  );
};

export default GoToOrigin;
