import React, { FC } from 'react';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';

const GoogleMap: FC = () => {
  const mapStyles = {
    width: '100%',
    height: '100%',
  };

  return (
    <Map google={google} zoom={15} style={mapStyles} initialCenter={{ lat: 37.5, lng: 127 }}>
      <Marker position={{ lat: 37.5, lng: 127 }}></Marker>
    </Map>
  );
};

export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_GOOGLE_MAP_API!,
})(GoogleMap);
