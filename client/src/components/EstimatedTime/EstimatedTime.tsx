import React, { FC, useEffect } from 'react';

import styled from '@theme/styled';
import { Location } from '@reducers/.';

interface Props {
  directions: google.maps.DirectionsResult | undefined;
  origin?: Location;
  destination?: Location;
}

const StyledEstimatedTime = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 1.5rem;
  font-size: 1rem;

  & .estimated-time {
    margin-right: 0.5rem;
  }

  & .estimated-distance {
    margin-left: 0.5rem;
  }
`;

const EstimatedTime: FC<Props> = ({ directions, origin, destination }) => {
  const estimatedTime = directions?.routes[0].legs[0].duration;
  const estimatedDistance = directions?.routes[0].legs[0].distance;

  return (
    <>
      {origin && destination && (
        <StyledEstimatedTime>
          <span className="estimated-time">소요 시간: {estimatedTime?.text}</span>
          <span className="estimated-distance">이동 거리: {estimatedDistance?.text}</span>
        </StyledEstimatedTime>
      )}
    </>
  );
};

export default EstimatedTime;
