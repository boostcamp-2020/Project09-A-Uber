import React, { FC, useState } from 'react';
import GoogleMap from '@components/GoogleMap';
import { Button } from 'antd-mobile';

import AutoLocation from '@components/AutoLocation';
import { StyledMapWrapper, StyledLocation, StyledMainContainer } from './style';

const Home: FC = () => {
  const [origin, setOrigin] = useState({ lat: 51.507351, lng: -0.127758 });
  const [destination, setDestination] = useState({ lat: 51.509372, lng: -0.127758 });

  return (
    <>
      <StyledMainContainer>
        <StyledMapWrapper>
          <GoogleMap origin={origin} destination={destination} />
        </StyledMapWrapper>
        <StyledLocation>
          <AutoLocation setPosition={setOrigin}></AutoLocation>
          <AutoLocation setPosition={setDestination}></AutoLocation>
          <Button type="primary">라이더 탐색</Button>
        </StyledLocation>
      </StyledMainContainer>
    </>
  );
};
export default Home;
