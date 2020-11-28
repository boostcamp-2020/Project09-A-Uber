import React, { FC } from 'react';

import styled from '@theme/styled';

interface Props {
  isEstimatedTime: boolean;
  directions: google.maps.DirectionsResult | undefined;
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

const EstimatedTime: FC<Props> = ({ isEstimatedTime, directions }) => {
  const estimatedTime = directions?.routes[0].legs[0].duration;
  const estimatedDistance = directions?.routes[0].legs[0].distance;

  return (
    <>
      {isEstimatedTime && (
        <StyledEstimatedTime>
          <span className="estimated-time">소요 시간: {estimatedTime?.text}</span>
          <span className="estimated-distance">총 거리: {estimatedDistance?.text}</span>
        </StyledEstimatedTime>
      )}
    </>
  );
};

export default EstimatedTime;
