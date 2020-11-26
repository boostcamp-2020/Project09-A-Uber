import React, { FC, useState, useRef, useEffect } from 'react';

import { DirectionsService, DirectionsRenderer } from '@react-google-maps/api';

import { Location } from './GoogleMap';

interface Props {
  origin: Location;
  destination: Location;
}

const Directions: FC<Props> = ({ origin, destination }) => {
  const [directions, setDirections] = useState<google.maps.DirectionsResult | undefined>(undefined);
  const count = useRef(0);

  const options = {
    polylineOptions: {
      strokeColor: 'red',
      strockeWeight: 10,
      strokeOpacity: 0.8,
    },
  };

  useEffect(() => {
    count.current = 0;
  }, [origin.lat, origin.lng, destination.lat, destination.lng]);

  const directionsCallback = (
    result: google.maps.DirectionsResult,
    status: google.maps.DirectionsStatus,
  ): void => {
    if (status === 'OK' && count.current === 0) {
      count.current += 1;
      setDirections(result);
    }
  };

  return (
    <>
      <DirectionsService
        options={{ origin, destination, travelMode: 'BICYCLING' as any }}
        callback={directionsCallback}
      />
      <DirectionsRenderer directions={directions} options={options} />
    </>
  );
};

export default Directions;