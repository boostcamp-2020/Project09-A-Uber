import React, { FC } from 'react';
import { CarInfo as CarInfoType } from '@/types/api';
import styled from '@/theme/styled';
import carTypeMapper from './carTypeMapper';

interface Props {
  carInfo?: CarInfoType;
  title?: string;
}

const StyledCarInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
  padding: 1rem;

  & > h1 {
    text-align: center;
    font-size: 1rem;
    font-weight: 700;
    margin-bottom: 2rem;
  }

  & span {
    margin-bottom: 0.7rem;
    font-size: 1.2rem;
  }
`;

const CarInfo: FC<Props> = ({ carInfo, title }) => {
  return (
    <StyledCarInfo>
      <h1>{title}</h1>
      <span>차량번호 : {carInfo?.carNumber}</span>
      <span>차량타입: {carTypeMapper(carInfo?.carType)}</span>
    </StyledCarInfo>
  );
};

CarInfo.defaultProps = {
  title: '',
};

export default CarInfo;
