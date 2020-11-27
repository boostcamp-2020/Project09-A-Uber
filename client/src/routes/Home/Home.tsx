import React, { FC, useState, useEffect } from 'react';
import { Button } from 'antd-mobile';
import { Loader } from '@googlemaps/js-api-loader';

import AutoLocation from '@components/AutoLocation';
import GoogleMap, { Location } from '@components/GoogleMap';

import { StyledMapWrapper, StyledLocation, StyledMainContainer } from './style';

const API_KEY = process.env.REACT_APP_GOOGLE_MAP_API as string;

const loader = new Loader({
  apiKey: API_KEY,
  version: 'weekly',
  libraries: ['places'],
});

const Home: FC = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [origin, setOrigin] = useState<Location>();
  const [destination, setDestination] = useState<Location>();

  const initialScriptLoad = async () => {
    await loader.load();
    setIsLoaded(true);
  };

  useEffect(() => {
    initialScriptLoad();
  }, []);

  return (
    <>
      {isLoaded && (
        <StyledMainContainer>
          <StyledMapWrapper>
            <GoogleMap origin={origin || undefined} destination={destination || undefined} />
          </StyledMapWrapper>
          <StyledLocation>
            <AutoLocation setPosition={setOrigin}></AutoLocation>
            <AutoLocation setPosition={setDestination}></AutoLocation>
            <Button type="primary">라이더 탐색</Button>
          </StyledLocation>
        </StyledMainContainer>
      )}
    </>
  );
};
export default Home;
