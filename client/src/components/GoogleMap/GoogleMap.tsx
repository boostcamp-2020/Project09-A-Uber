import React, { FC, useState, useEffect, useCallback } from 'react';

import { GoogleMap as GoogleMapComponent, Marker } from '@react-google-maps/api';
import getUserLocation from '@utils/getUserLocation';
import { Location } from '@reducers/.';

import Directions from './Directions';

interface Props {
  origin?: Location;
  destination?: Location;
  setDirections?: React.Dispatch<React.SetStateAction<google.maps.DirectionsResult | undefined>>;
  directions: google.maps.DirectionsResult | undefined;
}

const containerStyle = {
  width: '100%',
  height: '100%',
};

const GoogleMap: FC<Props> = ({ origin, destination, setDirections, directions }) => {
  const [isInitLoad, setIsInitLoad] = useState(true);
  const [center, setCenter] = useState<Location>();

  const setCenterHandler = useCallback(async () => {
    if (origin && destination) {
      setCenter({
        lat: (origin.lat + destination.lat) / 2,
        lng: (origin.lng + destination.lng) / 2,
      });
      return;
    }
    if (origin) {
      setCenter({
        lat: origin.lat,
        lng: origin.lng,
      });
      return;
    }

    const currentLocation = await getUserLocation();
    if (currentLocation) {
      setCenter(currentLocation);
    }
  }, [origin, destination]);

  useEffect(() => {
    if (isInitLoad) {
      setTimeout(setCenterHandler, 100);
      setIsInitLoad(false);
    }
  }, []);

  useEffect(() => {
    if (!isInitLoad) {
      setTimeout(setCenterHandler, 100);
    }
  }, [origin, destination]);

  const onLoad = React.useCallback((map) => {
    const bounds = new window.google.maps.LatLngBounds();
    map.fitBounds(bounds);
  }, []);

  return (
    <GoogleMapComponent
      mapContainerStyle={containerStyle}
      center={center}
      zoom={10}
      onLoad={onLoad}
    >
      {origin && !destination && <Marker position={origin} />}
      {origin && destination && (
        <Directions
          origin={origin}
          destination={destination}
          setDirections={setDirections}
          directions={directions}
        />
      )}
    </GoogleMapComponent>
  );
};

export default React.memo(GoogleMap);
