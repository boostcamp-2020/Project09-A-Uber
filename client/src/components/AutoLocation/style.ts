import styled from '@theme/styled';

export const AutoLocationWrapper = styled.div`
  margin-bottom: 0.5rem;
  position: relative;

  & input {
    width: 100%;
    padding: 0.3rem 0.8rem;
    border: none;
    border-bottom: 1px solid ${({ theme }) => theme.BORDER};
  }

  & > .before-placeholder {
    position: absolute;
    top: 50%;
    left: 0.2rem;
    transform: translate(-50%, -50%);
    color: ${({ theme }) => theme.BORDER};
  }

  & ul {
    position: absolute;
    top: 2rem;
    width: 100%;
    background-color: white;
    border: 1px solid ${({ theme }) => theme.BORDER};
    border-radius: 0.3rem;
    z-index: 1;

    & > li {
      padding: 0.6rem;
      font-weight: 600;
      font-size: 0.7rem;
      border-bottom: 1px solid ${({ theme }) => theme.BORDER};
    }
  }
`;
