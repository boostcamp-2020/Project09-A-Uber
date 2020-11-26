import styled from '@theme/styled';

export const StyledMapWrapper = styled.div`
  flex: 15 0 0;
  position: relative;
  height: 100%;
`;

export const StyledLocation = styled.div`
  flex: 5 0 0;
  padding: 1.5rem;

  & > .am-button {
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    height: 2rem;
    margin-bottom: 0.8rem;
    margin-top: 2rem;
    font-weight: 700;
    font-size: 0.9rem;
  }
`;

export const StyledMainContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;
