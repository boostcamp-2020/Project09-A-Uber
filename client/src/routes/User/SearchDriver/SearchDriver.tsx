import React, { FC, useCallback, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useSubscription } from '@apollo/react-hooks';
import { useHistory } from 'react-router-dom';

import styled from '@theme/styled';
import Header from '@components/HeaderWithMenu';
import { Spin, Button, message, Layout, Row, Col, notification } from 'antd';
import { InitialState } from '@reducers/.';
import { SUB_ORDER_CALL_STATUS, GET_ORDER_CAR_INFO, CANCEL_ORDER } from '@/queries/order';
import { SubOrderCallStatus, GetOrderCarInfo, CancelOrder } from '@/types/api';
import { OrderCallStatus } from '@/types/orderCallStatus';
import { useCustomQuery, useCustomMutation } from '@hooks/useApollo';
import { addCarInfo } from '@reducers/order';
import { Message } from '@utils/client-message';
import { ArgsProps } from 'antd/lib/notification';
import { carTypeMapperToKor } from '@utils/carTypeMapperToKor';

const StyledSearchDriver = styled.div`
  height: 100%;

  & .ant-layout-content {
    position: relative;
    height: calc(100% - 64px);
  }

  & .ant-btn {
    width: 100%;
  }

  & .search-spinner {
    position: absolute;
    width: 100%;
    left: 50%;
    top: 40%;
    transform: translateX(-50%);
  }

  & .cancel-button {
    height: 100%;
    padding-bottom: 1.5rem;
  }
`;

const { Content } = Layout;

const SearchDriver: FC = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [isDisabled, SetIsDisabled] = useState(false);
  const { callQuery } = useCustomQuery<GetOrderCarInfo>(GET_ORDER_CAR_INFO, {
    skip: true,
  });
  const { id: orderId } = useSelector((state: InitialState) => state.order || {});
  useSubscription<SubOrderCallStatus>(SUB_ORDER_CALL_STATUS, {
    variables: { orderId },
    onSubscriptionData: ({ subscriptionData }) => {
      if (subscriptionData.data?.subOrderCallStatus.status === OrderCallStatus.approval) {
        onOpenOrderModal();
      }
    },
  });
  const [cancelOrderMutation] = useCustomMutation<CancelOrder>(CANCEL_ORDER, {
    onCompleted: ({ cancelOrder }) => {
      if (cancelOrder.result === 'fail') {
        message.error(Message.FailureCancelOrder);
        return;
      }
      history.push('/user');
    },
  });

  const openNotificationWithIcon = (options: ArgsProps) => {
    SetIsDisabled(true);
    notification.success({
      ...options,
      key: 'updatable',
      onClose: () => {
        history.push('/user/waitingDriver');
      },
    });
  };

  const onClickCancelOrderHandler = useCallback(() => {
    cancelOrderMutation({ variables: { orderId } });
  }, [orderId]);

  const onOpenOrderModal = useCallback(async () => {
    const { data } = await callQuery({ orderId });
    const { carInfo: carInfoData } = data.getOrderCarInfo;

    if (!carInfoData) {
      return;
    }
    dispatch(addCarInfo(carInfoData));

    const options = {
      message: Message.DriverMatchingCompolete,
      description: (
        <>
          <div>{`${Message.CarType} : ${carTypeMapperToKor(carInfoData.carType)}`}</div>
          <div>{`${Message.CarNumber} : ${carInfoData.carNumber}`}</div>
        </>
      ),
    };

    openNotificationWithIcon(options);
  }, [orderId]);

  return (
    <>
      <StyledSearchDriver>
        <Header className="green-header" />
        <Content>
          <Row className="search-spinner" align="middle" justify="center">
            <Spin size="large" tip="주변에 운행이 가능한 드라이버를 탐색중입니다." />
          </Row>
          <Row className="cancel-button" justify="center" align="bottom">
            <Col span={22}>
              <Button danger disabled={isDisabled} onClick={onClickCancelOrderHandler}>
                탐색 취소
              </Button>
            </Col>
          </Row>
        </Content>
      </StyledSearchDriver>
    </>
  );
};

export default SearchDriver;
