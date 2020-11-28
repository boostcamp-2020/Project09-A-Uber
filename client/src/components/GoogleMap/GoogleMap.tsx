import React, { FC, useState, useEffect, useCallback } from 'react';

import { GoogleMap as GoogleMapComponent, Marker } from '@react-google-maps/api';
import getUserLocation from '@utils/getUserLocation';

import Directions from './Directions';

export interface Location {
  lat: number;
  lng: number;
}

interface Props {
  origin?: Location;
  destination?: Location;
}

const containerStyle = {
  width: '100%',
  height: '100%',
};

const GoogleMap: FC<Props> = ({ origin, destination }) => {
  const [center, setCenter] = useState({ lat: 0, lng: 0 });

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
    const centerInterval = setInterval(setCenterHandler, 5000);

    return () => {
      clearInterval(centerInterval);
    };
  }, []);

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
      {origin && destination && <Directions origin={origin} destination={destination} />}
    </GoogleMapComponent>
  );
};

export default React.memo(GoogleMap);
