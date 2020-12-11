import React, { FC, useState, useCallback, useEffect, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { useSubscription } from '@apollo/client';
import { useDispatch } from 'react-redux';
import { useCustomQuery, useCustomMutation } from '@hooks/useApollo';
import {
  UpdateDriverLocation,
  GetUnassignedOrders,
  getOrderById,
  ApprovalOrder,
  GetUnassignedOrders_getUnassignedOrders_unassignedOrders as Order,
  GetUnassignedOrders_getUnassignedOrders_unassignedOrders_startingPoint as ServerLocation,
  SubNewOrder,
} from '@/types/api';
import styled from '@theme/styled';
import MapFrame from '@components/MapFrame';
import { Location } from '@reducers/.';
import getUserLocation from '@utils/getUserLocation';
import {
  GET_UNASSIGNED_ORDERS,
  UPDATE_ORDER_LIST,
  SUB_NEW_ORDER,
  APPROVAL_ORDER,
  GET_ORDER_BY_ID,
} from '@queries/order';
import { UPDATE_DRIVER_LOCATION } from '@queries/user';
import useModal from '@hooks/useModal';
import { Modal, message, List, Row, Col, Typography } from 'antd';
import { Message } from '@utils/client-message';
import { TOAST_DURATION, DRIVER } from '@utils/enums';
import { addOrderId } from '@reducers/order';
import { updateLocationALL } from '@reducers/location';

const { Title, Text } = Typography;

const StyledOrderLogList = styled.section`
  height: 100%;
  overflow: scroll;

  & .no-order {
    height: 100%;
  }

  & .order {
    background-color: ${({ theme }) => theme.LIGHT_GRAY};
    padding: 0 0;
    border-radius: 0.4rem;
  }

  & .order-row {
    padding: 0 0;
  }
`;

const Main: FC = () => {
  const { data: orders, callQuery } = useCustomQuery<GetUnassignedOrders>(GET_UNASSIGNED_ORDERS);
  const { unassignedOrders } = orders?.getUnassignedOrders || {};
  const [orderData, setOrderData] = useState<Order[] | null | undefined>();
  const [isModal, openModal, closeModal] = useModal();
  const [orderItem, setOrderItem] = useState<Order>();
  const [currentLocation, setCurrentLocation] = useState<Location>();
  const orderTimerRef = useRef<NodeJS.Timeout>();
  const [updateDriverLocation] = useCustomMutation<UpdateDriverLocation>(UPDATE_DRIVER_LOCATION);
  const history = useHistory();
  const dispatch = useDispatch();
  const { callQuery: getOrderQuery } = useCustomQuery<getOrderById>(GET_ORDER_BY_ID, {
    skip: true,
  });
  const [approvalOrder] = useCustomMutation<ApprovalOrder>(APPROVAL_ORDER, {
    onCompleted: ({ approvalOrder: approvalResult }) => {
      if (approvalResult.result === 'success') {
        closeModal();
      }
    },
  });

  useSubscription<SubNewOrder>(SUB_NEW_ORDER, {
    variables: { lat: currentLocation?.lat, lng: currentLocation?.lng },
    onSubscriptionData: ({ subscriptionData }) => {
      const { newOrder } = subscriptionData.data?.subNewOrder || {};

      if (newOrder) {
        openModal();
        setOrderItem(newOrder);

        orderTimerRef.current = setTimeout(() => {
          closeModal();
        }, DRIVER.NEW_ORDER_DURATION);
      }
    },
  });

  const onClickCloseModal = useCallback(() => {
    if (orderTimerRef.current) {
      clearTimeout(orderTimerRef.current);
      orderTimerRef.current = undefined;
    }
    closeModal();
  }, [orderTimerRef.current]);

  useSubscription(UPDATE_ORDER_LIST, {
    onSubscriptionData: async () => {
      const newData = await callQuery();
      const { unassignedOrders: newOrderList } = newData?.data.getUnassignedOrders || {};
      setOrderData(newOrderList);
    },
  });

  const onClickOrder = (order: Order) => {
    openModal();
    setOrderItem(order);
  };

  const updateInitLocation = useCallback((location: Location | void) => {
    if (location) {
      updateDriverLocation({
        variables: location,
      });
      setCurrentLocation(location);
    }
  }, []);

  const watchUpdateCurrentLocation = useCallback((location: Position) => {
    const updateLocation = {
      lat: location.coords.latitude,
      lng: location.coords.longitude,
    };
    setCurrentLocation(updateLocation);
    updateDriverLocation({
      variables: updateLocation,
    });
  }, []);

  useEffect(() => {
    getUserLocation().then(updateInitLocation);
    const watchLocation = navigator.geolocation.watchPosition(watchUpdateCurrentLocation);

    return () => {
      navigator.geolocation.clearWatch(watchLocation);
    };
  }, []);

  useEffect(() => {
    setOrderData(unassignedOrders);
  }, [unassignedOrders]);

  const localLocationMapper = (location: ServerLocation): Location => ({
    address: location.address,
    lat: location.coordinates[0],
    lng: location.coordinates[1],
  });

  const onClickApprovalOrder = useCallback(() => {
    (async () => {
      if (orderItem) {
        const { data } = await getOrderQuery({ orderId: orderItem._id });
        const status = data?.getOrderById?.order?.status;
        if (status === 'approval') {
          message.error(Message.FailureMatchingOrder, TOAST_DURATION.MATCHING_FAILURE);
          return closeModal();
        }
        if (status === 'waiting') {
          dispatch(addOrderId(orderItem._id));
          dispatch(
            updateLocationALL({
              origin: localLocationMapper(orderItem.startingPoint),
              destination: localLocationMapper(orderItem.destination),
            }),
          );
          approvalOrder({ variables: { orderId: orderItem._id } });
          return history.push('/driver/goToOrigin');
        }
        message.error(Message.FailureClosedOrder, TOAST_DURATION.MATCHING_FAILURE);
        return closeModal();
      }
      closeModal();
    })();
  }, [orderItem]);

  return (
    <>
      {currentLocation && (
        <MapFrame origin={currentLocation}>
          <StyledOrderLogList>
            {orderData && orderData.length !== 0 ? (
              <List
                className="order"
                size="small"
                dataSource={orderData}
                renderItem={(order) => (
                  <List.Item onClick={() => onClickOrder(order)}>
                    <Row className="order-row">
                      <Col flex="string">
                        <Text strong>{`출발지: ${order.startingPoint.address}`}</Text>
                      </Col>
                      <Col flex="string">
                        <Text strong>{`도착지: ${order.destination.address}`}</Text>
                      </Col>
                    </Row>
                  </List.Item>
                )}
              />
            ) : (
              <Row className="no-order" align="middle" justify="center">
                <Title level={2}>
                  <Text type="secondary" strong>
                    현재 요청이 없습니다
                  </Text>
                </Title>
              </Row>
            )}
          </StyledOrderLogList>
        </MapFrame>
      )}
      <Modal
        visible={isModal}
        onCancel={onClickCloseModal}
        onOk={onClickApprovalOrder}
        okText="수락"
        cancelText="닫기"
        title="요청"
        centered
      >
        {orderItem && (
          <>
            <p>{`출발지: ${orderItem.startingPoint.address}`}</p>
            <p>{`도착지: ${orderItem.destination.address}`}</p>
            <br />
            <p>해당 운행을 수락하시겠습니까?</p>
          </>
        )}
      </Modal>
    </>
  );
};

export default Main;
