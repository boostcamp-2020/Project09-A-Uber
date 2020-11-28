import { Location } from '@components/GoogleMap';

const getUserLocation = async (): Promise<Location | void> => {
  try {
    const userLocation = await new Promise<Location>((res, rej) => {
      window.navigator.geolocation.getCurrentPosition(
        (position) => {
          res({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (err) => {
          rej(err);
        },
      );
    });
    return userLocation;
  } catch (error) {
    console.error(error);
  }
};

export default getUserLocation;
