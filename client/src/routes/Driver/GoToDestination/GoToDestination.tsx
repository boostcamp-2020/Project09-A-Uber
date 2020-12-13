import React, { FC, useCallback, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import MapFrame from '@/components/MapFrame';
import { UPDATE_DRIVER_LOCATION } from '@queries/user';
import { COMPLETE_ORDER, GET_ORDER_BY_ID } from '@/queries/order';
import {
  UpdateDriverLocation,
  CompleteOrder,
  getOrderById,
  getOrderById_getOrderById_order as OrderType,
} from '@/types/api';
import { useCustomMutation, useCustomQuery } from '@hooks/useApollo';
import useChatNotifycation from '@hooks/useChatNotifycation';
import styled from '@/theme/styled';
import getUserLocation from '@utils/getUserLocation';
import { DRIVER } from '@utils/enums';
import { numberWithCommas } from '@utils/numberWithCommas';
import calcDriveTime from '@utils/calcDriveTime';
import { Message } from '@utils/client-message';

import { InitialState, Location } from '@reducers/.';
import { resetOrder } from '@reducers/order';
import { Row, Col, Button, Modal } from 'antd';

const StyledGoToDestinationMenu = styled.div`
  display: flex;
  height: 100%;
  flex-direction: column;
  justify-content: flex-end;

  & .row {
    width: 100%;
    margin-bottom: 0.5rem;
  }
`;

const GoToDestination: FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [orderInfo, setorderInfo] = useState<OrderType | null>();
  const [directions, setDirections] = useState<google.maps.DirectionsResult | undefined>(undefined);
  const [currentLocation, setCurrentLocation] = useState({ lat: 0, lng: 0 });
  const [taxiFee, setTaxiFee] = useState(DRIVER.BASE_TAXI_FEE);
  const { id } = useSelector(({ order }: InitialState) => order || {});
  const { destination } = useSelector(({ order }: InitialState) => order.location || {});
  const { callQuery } = useCustomQuery<getOrderById>(GET_ORDER_BY_ID, { skip: true });
  const [updateDriverLocationMutation] = useCustomMutation<UpdateDriverLocation>(
    UPDATE_DRIVER_LOCATION,
  );

  useChatNotifycation(id || '');

  useEffect(() => {
    if (orderInfo) {
      Modal.success({
        title: Message.CompletedOrder,
        content: (
          <>
            <div>{`${Message.Origin}: ${orderInfo?.startingPoint.address}`}</div>
            <div>{`${Message.Destination}: ${orderInfo?.destination.address}`}</div>
            <div>{`${Message.Amount}: ${orderInfo?.amount}`}</div>
            <div>
              {`${Message.DrivingTime}: ${calcDriveTime(
                orderInfo?.completedAt,
                orderInfo?.startedAt,
              )}`}
            </div>
          </>
        ),
        centered: true,
        onOk: onCompleteOrderHandler,
        okText: '확인',
      });
    }
  }, [orderInfo]);

  const [completeOrderMutation] = useCustomMutation<CompleteOrder>(COMPLETE_ORDER, {
    onCompleted: async ({ completeOrder }) => {
      if (completeOrder.result === 'success') {
        const { data } = await callQuery({ orderId: id });
        setorderInfo(data?.getOrderById?.order);
      }
    },
  });

  const onCompleteOrderHandler = useCallback(() => {
    dispatch(resetOrder());
    history.push(`/driver`);
  }, []);

  const onClickOrderCompleteHandler = useCallback(() => {
    completeOrderMutation({ variables: { orderId: id, amount: taxiFee } });
  }, [id, taxiFee]);

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
    setTaxiFee((pre) => pre + DRIVER.INCRESE_TAXI_FEE);
  }, [taxiFee]);

  const onClickChatRoom = () => {
    history.push(`/chatroom/${id}`);
  };

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
    <>
      <MapFrame
        origin={currentLocation}
        destination={destination}
        setDirections={setDirections}
        directions={directions}
      >
        <StyledGoToDestinationMenu>
          <Row justify="center" align="middle" className="row">
            <Col>{`현재요금: ${numberWithCommas(taxiFee)}`}</Col>
          </Row>
          <Row justify="center" align="middle" className="row">
            <Col span={24}>
              <Button
                className="driver-arrive-btn"
                type="primary"
                onClick={onClickOrderCompleteHandler}
                block
              >
                도착완료
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
        </StyledGoToDestinationMenu>
      </MapFrame>
    </>
  );
};

export default GoToDestination;
