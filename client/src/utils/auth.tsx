import React, { FC, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Modal } from 'antd-mobile';

import { GET_USER_WITH_ORDER } from '@queries/user';
import { ToggleFocus, FOCUS_USER } from '@components/UserToggle';
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

const userTypeMapper = (type: ToggleFocus) => (type === FOCUS_USER ? '일반 사용자' : '드라이버');

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
  const [modalOpen, setModalOpen] = useState(false);
  const history = useHistory();
  const dispatch = useDispatch();

  const { loading } = useCustomQuery<GetUserWithOrder>(GET_USER_WITH_ORDER, {
    fetchPolicy: 'no-cache',
    onCompleted: ({ getUserWithOrder }) => {
      if (!getUserWithOrder.user) {
        setModalOpen(true);
        return;
      }
      if (type && type !== 'anyUser' && getUserWithOrder.user.type !== type) {
        setModalOpen(true);
      }
      const user = serverUserMapper(getUserWithOrder.user);

      let order: Order | null = null;

      if (getUserWithOrder.order !== null) {
        order = serverLocationMapper(getUserWithOrder.order);
      }
      dispatch(AddUserInfoWithOrder(user, order));

      const orderState = getUserWithOrder.order?.status;

      if (type !== 'anyUser') {
        history.push(`/${clientRoutingMapper(orderState, type)}`);
      }
    },
    onError: () => {
      setModalOpen(true);
    },
  });

  const onClickModalCloseHandler = () => {
    setModalOpen(false);
    history.replace('/signin');
  };

  return (
    <>
      <Modal
        visible={modalOpen}
        transparent
        title="알림"
        footer={[
          {
            text: 'Ok',
            onPress: onClickModalCloseHandler,
          },
        ]}
      >
        {type ? `${userTypeMapper(type)}${Message.AuthTypeMessage}` : Message.AuthMessage}
      </Modal>

      {!loading && !modalOpen && <Component />}
    </>
  );
};

export default auth;
