import React, { FC, useRef, useEffect } from 'react';

import { DirectionsService, DirectionsRenderer } from '@react-google-maps/api';

import { Location } from '@reducers/.';

interface Props {
  origin: Location;
  destination: Location;
  setDirections?: React.Dispatch<React.SetStateAction<google.maps.DirectionsResult | undefined>>;
  directions?: google.maps.DirectionsResult | undefined;
}

const Directions: FC<Props> = ({ origin, destination, setDirections, directions }) => {
  const count = useRef(0);

  const options: google.maps.DirectionsRendererOptions = {
    polylineOptions: {
      strokeColor: 'red',
      strokeWeight: 4,
      strokeOpacity: 0.8,
    },
  };

  useEffect(() => {
    if (count.current >= 2) count.current = 0;
  }, [origin.lat, origin.lng, destination.lat, destination.lng]);

  const directionsCallback = (
    result: google.maps.DirectionsResult,
    status: google.maps.DirectionsStatus,
  ): void => {
    if (status === 'OK' && count.current < 2) {
      count.current += 1;
      setDirections!(result);
    }
  };

  return (
    <>
      <DirectionsService
        options={{ origin, destination, travelMode: 'DRIVING' as google.maps.TravelMode }}
        callback={directionsCallback}
      />
      <DirectionsRenderer directions={directions} options={options} />
    </>
  );
};

export default Directions;
