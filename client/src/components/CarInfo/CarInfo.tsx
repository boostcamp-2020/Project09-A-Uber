import React, { FC } from 'react';
import { Message } from '@utils/client-message';
import { CarInfo as CarInfoType } from '@/types/api';
import styled from '@/theme/styled';

interface Props {
  carInfo?: CarInfoType;
}

const StyledCarInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
  padding: 1rem 2rem;

  & > h1 {
    text-align: center;
    font-size: 1.1rem;
    margin-bottom: 2rem;
  }

  & span {
    margin-bottom: 0.7rem;
    font-size: 1.2rem;
  }
`;

const CarInfo: FC<Props> = ({ carInfo }) => {
  return (
    <StyledCarInfo>
      <h1>{Message.DriverAjacent}</h1>
      <span>차량번호 : {carInfo?.carNumber}</span>
      <span>차량타입: {carInfo?.carType}</span>
    </StyledCarInfo>
  );
};

export default CarInfo;
