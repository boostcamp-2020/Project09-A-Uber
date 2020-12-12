import React, { FC, useState, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { message, Button } from 'antd';
import { Message } from '@utils/client-message';
import AutoLocation from '@components/AutoLocation';
import MapFrame from '@components/MapFrame';
import EstimatedTime from '@components/EstimatedTime';
import { InitialState } from '@reducers/.';
import { useCustomMutation } from '@hooks/useApollo';
import { CREATE_ORDER } from '@queries/order';
import { CreateOrder } from '@/types/api';
import { addOrderId } from '@reducers/order';

import styled from '@theme/styled';

const StyledButton = styled(Button)`
  width: 100%;
  margin-top: 1rem;
`;

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

      message.error({
        content: Message.NotSearchDriver,
        style: {
          marginTop: '40vh',
        },
      });
    },
  });
  const { origin, destination } = useSelector(({ order }: InitialState) => order.location);
  const [directions, setDirections] = useState<google.maps.DirectionsResult | undefined>(undefined);

  const onClickSearchDriver = useCallback(() => {
    if (!origin || !destination) {
      message.error({
        content: Message.NotEmptySearchForm,
        style: {
          marginTop: '40vh',
        },
      });
      return;
    }
    createOrderMutation({
      variables: {
        startingPoint: {
          address: origin.address || '',
          coordinates: [origin.lat, origin.lng],
        },
        destination: {
          address: destination.address || '',
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
      <AutoLocation locationType="origin" />
      <AutoLocation locationType="destination" />
      <EstimatedTime directions={directions} />
      <StyledButton type="primary" onClick={onClickSearchDriver}>
        라이더 탐색
      </StyledButton>
    </MapFrame>
  );
};

export default Main;
