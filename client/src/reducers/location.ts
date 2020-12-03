import { Location } from '.';

export const UPDATE_LOCATION_ORIGIN = 'UPDATE_LOCATION_ORIGIN';
export const UPDATE_LOCATION_DESTINATION = 'UPDATE_LOCATION_DESTINATION';
export const UPDATE_LOCATION_ALL = 'UPDATE_LOCATION_ALL';

// updateLocationOrigin
export interface UpdateLocationOrigin {
  type: typeof UPDATE_LOCATION_ORIGIN;
  location?: Location;
}

export const updateLocationOrigin = (location?: Location): UpdateLocationOrigin => ({
  type: UPDATE_LOCATION_ORIGIN,
  location,
});

// updateLocationDestination
export interface UpdateLocationDestination {
  type: typeof UPDATE_LOCATION_DESTINATION;
  location?: Location;
}

export const updateLocationDestination = (location?: Location): UpdateLocationDestination => ({
  type: UPDATE_LOCATION_DESTINATION,
  location,
});

// updateLocationAll
interface UpdateLocationAllProps {
  origin?: Location;
  destination?: Location;
}

export interface UpdateLocationAll {
  type: typeof UPDATE_LOCATION_ALL;
  origin?: Location;
  destination?: Location;
}

export const updateLocationALL = ({
  origin,
  destination,
}: UpdateLocationAllProps): UpdateLocationAll => ({
  type: UPDATE_LOCATION_ALL,
  origin,
  destination,
});

export type LocationActions = UpdateLocationOrigin | UpdateLocationDestination | UpdateLocationAll;
