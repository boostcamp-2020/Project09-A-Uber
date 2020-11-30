import { Location } from '@components/GoogleMap';

const rad = (x: number): number => {
  return (x * Math.PI) / 180;
};

export const calcLocationDistance = (baseLocation: Location, otherLocation: Location): number => {
  const R = 6378137;
  const dLat = rad(otherLocation.lat - baseLocation.lat);
  const dLong = rad(otherLocation.lng - baseLocation.lng);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(rad(baseLocation.lat)) *
      Math.cos(rad(otherLocation.lat)) *
      Math.sin(dLong / 2) *
      Math.sin(dLong / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c;
  return d;
};
