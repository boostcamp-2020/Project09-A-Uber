import React, { FC } from 'react';
import { useSelector } from 'react-redux';

import styled from '@theme/styled';
import { InitialState } from '@reducers/.';

interface Props {
  directions: google.maps.DirectionsResult | undefined;
}

const StyledEstimatedTime = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  margin-top: 1.5rem;
  font-size: 1rem;

  & .estimated-time {
    margin-right: 0.5rem;
  }

  & .estimated-distance {
    margin-left: 0.5rem;
  }
`;

const EstimatedTime: FC<Props> = ({ directions }) => {
  const { origin, destination } = useSelector(({ order }: InitialState) => order.location);
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
