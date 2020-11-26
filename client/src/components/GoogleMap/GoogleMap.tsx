import React, { FC, useState, useEffect, useCallback } from 'react';

import { GoogleMap as GoogleMapComponent, LoadScript, Marker } from '@react-google-maps/api';

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
  height: '80%',
};

const API_KEY = process.env.REACT_APP_GOOGLE_MAP_API as string;

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

    const test = await new Promise<Location>((res) => {
      window.navigator.geolocation.getCurrentPosition((position) => {
        res({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      });
    });
    setCenter(test);
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
    <LoadScript googleMapsApiKey={API_KEY}>
      <GoogleMapComponent
        mapContainerStyle={containerStyle}
        center={center}
        zoom={10}
        onLoad={onLoad}
      >
        {origin && !destination && <Marker position={origin} />}
        {origin && destination && <Directions origin={origin} destination={destination} />}
      </GoogleMapComponent>
    </LoadScript>
  );
};

export default React.memo(GoogleMap);
