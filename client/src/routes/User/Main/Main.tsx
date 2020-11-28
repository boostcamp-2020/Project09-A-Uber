import React, { FC, useState } from 'react';
import { Button } from 'antd-mobile';

import AutoLocation from '@components/AutoLocation';
import MapFrame from '@components/MapFrame';
import EstimatedTime from '@components/EstimatedTime';
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
  const [directions, setDirections] = useState<google.maps.DirectionsResult | undefined>(undefined);

  return (
    <MapFrame
      origin={origin}
      destination={destination}
      setDirections={setDirections}
      directions={directions}
    >
      <AutoLocation setPosition={setOrigin} />
      <AutoLocation setPosition={setDestination} />
      <EstimatedTime directions={directions} origin={origin} destination={destination} />
      <StyledButton type="primary">라이더 탐색</StyledButton>
    </MapFrame>
  );
};

export default Main;
