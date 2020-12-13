import React, { FC } from 'react';
import { useHistory } from 'react-router-dom';
import { Modal } from 'antd';

import { GET_USER_WITH_ORDER } from '@queries/user';
import { ToggleFocus } from '@/types/userType';
import {
  GetUserWithOrder,
  GetUserWithOrder_getUserWithOrder_order as ResponseOrder,
  GetUserWithOrder_getUserWithOrder_user as ResponseUser,
  OrderStatus,
} from '@/types/api';
import { useCustomQuery } from '@hooks/useApollo';
import { useDispatch } from 'react-redux';
import { AddUserInfoWithOrder } from '@reducers/user';
import { Order } from '@/reducers';
import { Message } from '@utils/client-message';

const serverUserMapper = (user: ResponseUser) => ({
  _id: user._id,
  name: user.email,
  type: user.type,
});

const serverLocationMapper = (order: ResponseOrder) =>
  ({
    _id: order._id,
    location: {
      origin: {
        address: order.startingPoint?.address,
        lat: order.startingPoint?.coordinates[0],
        lng: order.startingPoint?.coordinates[1],
      },
      destination: {
        address: order.destination?.address,
        lat: order.destination?.coordinates[0],
        lng: order.destination?.coordinates[1],
      },
    },
  } as Order);

const clientRoutingMapper = (
  orderStatus: OrderStatus | undefined | null,
  type: ToggleFocus | undefined,
) => {
  if (orderStatus === undefined) {
    return type;
  }
  if (orderStatus === 'waiting') {
    if (type === 'user') return 'user/searchDriver';
    if (type === 'driver') return 'driver';
  }
  if (orderStatus === 'approval') {
    if (type === 'user') return 'user/waitingDriver';
    if (type === 'driver') return 'driver/goToOrigin';
  }
  if (orderStatus === 'startedDrive') {
    if (type === 'user') return 'user/goToDestination';
    if (type === 'driver') return 'driver/goToDestination';
  }
};

const auth = (Component: FC, type?: ToggleFocus): FC => () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const openModal = () => {
    Modal.error({
      title: Message.AuthTypeMessage,
      centered: true,
      onOk: () => {
        history.replace('/signin');
      },
      okText: '확인',
    });
  };

  const { loading } = useCustomQuery<GetUserWithOrder>(GET_USER_WITH_ORDER, {
    onCompleted: ({ getUserWithOrder }) => {
      if (!getUserWithOrder.user) {
        openModal();
        return;
      }
      if (type && getUserWithOrder.user.type !== type) {
        openModal();
      }
      const user = serverUserMapper(getUserWithOrder.user);

      let order: Order | null = null;

      if (getUserWithOrder.order !== null) {
        order = serverLocationMapper(getUserWithOrder.order);
      }
      dispatch(AddUserInfoWithOrder(user, order));

      const orderState = getUserWithOrder.order?.status;

      if (type) {
        history.push(`/${clientRoutingMapper(orderState, type)}`);
      }
    },
    onError: () => {
      openModal();
    },
  });

  return <>{!loading && <Component />}</>;
};

export default auth;
