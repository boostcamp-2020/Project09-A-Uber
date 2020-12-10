import React, { FC, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useSubscription } from '@apollo/react-hooks';
import { useHistory } from 'react-router-dom';

import styled from '@theme/styled';
import Modal from '@components/Modal';
import { Spin, Button, message, Layout, Row, Col } from 'antd';
import CarInfo from '@components/CarInfo';
import { InitialState } from '@reducers/.';
import { SUB_ORDER_CALL_STATUS, GET_ORDER_CAR_INFO, CANCEL_ORDER } from '@/queries/order';
import { SubOrderCallStatus, GetOrderCarInfo, CancelOrder } from '@/types/api';
import { OrderCallStatus } from '@/types/orderCallStatus';
import { useCustomQuery, useCustomMutation } from '@hooks/useApollo';
import useModal from '@hooks/useModal';
import { addCarInfo } from '@reducers/order';
import { Message } from '@utils/client-message';

const { Header, Content } = Layout;

const StyledSearchDriver = styled.div`
  height: 100%;

  & .ant-layout-content {
    position: relative;
    height: calc(100% - 64px);
  }

  .ant-btn {
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

const SearchDriver: FC = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [isModal, onOpenModal, onCloseModal] = useModal();
  const { callQuery } = useCustomQuery<GetOrderCarInfo>(GET_ORDER_CAR_INFO, {
    skip: true,
  });
  const { id: orderId } = useSelector((state: InitialState) => state.order || {});
  const { carInfo } = useSelector((state: InitialState) => state.order || {});
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

  const onClickModalCloseHandler = useCallback(() => {
    onCloseModal();
    history.push('/user/waitingDriver');
  }, []);

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
    onOpenModal();
  }, [orderId]);

  return (
    <>
      <StyledSearchDriver>
        <Header />
        <Content>
          {!isModal && (
            <>
              <Row className="search-spinner" align="middle" justify="center">
                <Spin size="large" tip="주변에 운행이 가능한 드라이버를 탐색중입니다." />
              </Row>
              <Row className="cancel-button" justify="center" align="bottom">
                <Col span={22}>
                  <Button danger onClick={onClickCancelOrderHandler}>
                    탐색 취소
                  </Button>
                </Col>
              </Row>
            </>
          )}
        </Content>
      </StyledSearchDriver>
      <Modal visible={isModal} onClose={onClickModalCloseHandler}>
        {carInfo && <CarInfo carInfo={carInfo} title={Message.DriverMatchingCompolete} />}
      </Modal>
    </>
  );
};

export default SearchDriver;
