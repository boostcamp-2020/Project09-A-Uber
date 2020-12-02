interface Location {
  lat: number;
  lng: number;
}

const rad = (x: number): number => {
  return (x * Math.PI) / 180;
};

export const calcLocationDistance = (baseLocation: Location, otherLocation: Location): number => {
  const EarthRadius = 6378137;
  const dLat = rad(otherLocation.lat - baseLocation.lat);
  const dLong = rad(otherLocation.lng - baseLocation.lng);
  const coordinateCartesian =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(rad(baseLocation.lat)) *
      Math.cos(rad(otherLocation.lat)) *
      Math.sin(dLong / 2) *
      Math.sin(dLong / 2);
  const angle = 2 * Math.atan2(Math.sqrt(coordinateCartesian), Math.sqrt(1 - coordinateCartesian));
  const DistanceDiff = EarthRadius * angle;
  return DistanceDiff;
};
