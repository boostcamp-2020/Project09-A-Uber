import React, { FC, useState } from 'react';
import { Button } from 'antd-mobile';

import AutoLocation from '@components/AutoLocation';
import MapFrame from '@components/MapFrame';
import { Location } from '@components/GoogleMap';

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

const Main: FC = () => {
  const [origin, setOrigin] = useState<Location>();
  const [destination, setDestination] = useState<Location>();

  return (
    <MapFrame origin={origin} destination={destination}>
      <AutoLocation setPosition={setOrigin}></AutoLocation>
      <AutoLocation setPosition={setDestination}></AutoLocation>
      <StyledButton type="primary">라이더 탐색</StyledButton>
    </MapFrame>
  );
};

export default Main;
