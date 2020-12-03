import { Location } from '@reducers/.';

const getUserLocation = async (): Promise<Location | void> => {
  try {
    const userLocation = await new Promise<Location>((res, rej) => {
      window.navigator.geolocation.getCurrentPosition(
        (position) => {
          res({
            lat: Number(position.coords.latitude.toFixed(8)),
            lng: Number(position.coords.longitude.toFixed(8)),
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
