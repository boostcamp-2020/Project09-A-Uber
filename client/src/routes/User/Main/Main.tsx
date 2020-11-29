import React, { FC, useState, useCallback } from 'react';
import { Toast, Button } from 'antd-mobile';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import AutoLocation from '@components/AutoLocation';
import MapFrame from '@components/MapFrame';
import EstimatedTime from '@components/EstimatedTime';
import { Location } from '@components/GoogleMap';
import { useCustomMutation } from '@hooks/useApollo';
import { CREATE_ORDER } from '@queries/order.queries';
import { CreateOrder } from '@/types/api';
import { addOrderId } from '@reducers/order';

import styled from '@theme/styled';

const StyledButton = styled(Button)`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  height: 2rem;
  margin-bottom: 0.8rem;
  margin-top: 2rem;
  font-weight: 700;
  font-size: 0.9rem;
`;

const TOAST_MESSAGE_DURATION = 2;

const Main: FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [createOrderMutation] = useCustomMutation<CreateOrder>(CREATE_ORDER, {
    onCompleted: ({ createOrder }) => {
      if (createOrder.result === 'success' && createOrder.orderId) {
        history.push('/user/searchDriver');
        dispatch(addOrderId(createOrder.orderId));
        return;
      }
      Toast.fail('라이더 탐색에 실패했습니다', TOAST_MESSAGE_DURATION);
    },
  });
  const [origin, setOrigin] = useState<Location>();
  const [destination, setDestination] = useState<Location>();
  const [directions, setDirections] = useState<google.maps.DirectionsResult | undefined>(undefined);

  const onClickSearchDriver = useCallback(() => {
    if (!origin || !destination) {
      Toast.fail('출발지와 목적지를 모두 입력해주세요', TOAST_MESSAGE_DURATION);
      return;
    }
    createOrderMutation({
      variables: {
        startingPoint: {
          coordinates: [origin.lat, origin.lng],
        },
        destination: {
          coordinates: [destination.lat, destination.lng],
        },
      },
    });
  }, [origin, destination]);

  return (
    <MapFrame
      origin={origin}
      destination={destination}
      setDirections={setDirections}
      directions={directions}
    >
      <AutoLocation setPosition={setOrigin} />
      <AutoLocation setPosition={setDestination} />
      <EstimatedTime directions={directions} origin={origin} destination={destination} />
      <StyledButton type="primary">라이더 탐색</StyledButton>
    </MapFrame>
  );
};

export default Main;