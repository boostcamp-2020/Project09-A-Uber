import React, { FC, useState, useEffect } from 'react';
import { Loader } from '@googlemaps/js-api-loader';

import styled from '@theme/styled';
import GoogleMap, { Location } from '@components/GoogleMap';
import HeaderWithMenu from '@components/HeaderWithMenu';

interface Props {
  children: React.ReactChild | React.ReactChild[];
  origin?: Location;
  destination?: Location;
}

const StyledMapFrame = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;

  & > .map-section {
    flex: 15 0 0;
    position: relative;
    height: 100%;
  }

  & > .control-section {
    flex: 5 0 0;
    padding: 1.5rem;
  }
`;

const API_KEY = process.env.REACT_APP_GOOGLE_MAP_API as string;

const loader = new Loader({
  apiKey: API_KEY,
  version: 'weekly',
  libraries: ['places'],
});

const MapFrame: FC<Props> = ({ children, origin, destination }) => {
  const [isLoaded, setIsLoaded] = useState(false);

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
        <StyledMapFrame>
          <HeaderWithMenu className="green-header" />
          <section className="map-section">
            <GoogleMap origin={origin} destination={destination} />
          </section>
          <section className="control-section">{children}</section>
        </StyledMapFrame>
      )}
    </>
  );
};

export default MapFrame;
