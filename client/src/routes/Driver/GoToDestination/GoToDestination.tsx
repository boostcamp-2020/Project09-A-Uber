import React, { FC } from 'react';
import MapFrame from '@/components/MapFrame';
import { GET_ORDER } from '@queries/order.queries';
import { GetOrderInfo } from '@/types/api';
import { useCustomQuery } from '@hooks/useApollo';
import { Button } from 'antd-mobile';
import styled from '@/theme/styled';

const StyledGoToDestinationMenu = styled.div`
  display: flex;
  height: 100%;
  flex-direction: column;
  justify-content: flex-end;

  & span {
    text-align: center;
  }

  & .am-button {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 1rem;
    height: 2rem;
    cursor: pointer;
    font-weight: 700;
    font-size: 0.9rem;
  }

  & .driver-chat-btn {
    color: ${({ theme }) => theme.PRIMARY};
    border: 1px solid ${({ theme }) => theme.PRIMARY};
  }
`;

const GoToDestination: FC = () => {
  return (
    <MapFrame>
      <StyledGoToDestinationMenu>
        <span>요금부분: TODO</span>
        <Button className="driver-chat-btn">손님과의 채팅</Button>
        <Button className="driver-arrive-btn" type="primary">
          도착완료
        </Button>
      </StyledGoToDestinationMenu>
    </MapFrame>
  );
};

export default GoToDestination;
