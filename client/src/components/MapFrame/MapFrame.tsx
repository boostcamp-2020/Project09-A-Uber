import React, { FC, useState, useEffect } from 'react';
import { Loader } from '@googlemaps/js-api-loader';

import styled from '@theme/styled';
import GoogleMap, { Location } from '@components/GoogleMap';
import HeaderWithMenu from '@components/HeaderWithMenu';

interface Props {
  children?: React.ReactChild | React.ReactChild[];
  origin?: Location;
  destination?: Location;
  setDirections?: React.Dispatch<React.SetStateAction<google.maps.DirectionsResult | undefined>>;
  directions?: google.maps.DirectionsResult | undefined;
}

const StyledMapFrame = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;

  & > .map-section {
    position: relative;
    height: 75%;
  }

  & > .control-section {
    padding: 1.5rem;
    height: 25%;
  }
`;

const API_KEY = process.env.REACT_APP_GOOGLE_MAP_API as string;

const loader = new Loader({
  apiKey: API_KEY,
  version: 'weekly',
  libraries: ['places'],
});

const MapFrame: FC<Props> = ({ children, origin, destination, setDirections, directions }) => {
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
            <GoogleMap
              origin={origin}
              destination={destination}
              setDirections={setDirections}
              directions={directions}
            />
          </section>
          <section className="control-section">{children}</section>
        </StyledMapFrame>
      )}
    </>
  );
};

export default MapFrame;
