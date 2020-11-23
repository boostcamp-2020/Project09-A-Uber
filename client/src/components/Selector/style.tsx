import styled from '@theme/styled';

export const StyledSelector = styled.div`
  & select {
    width: 100%;
    border: 1px solid ${({ theme }) => theme.BORDER};
    border-radius: 4px;
    padding: 0.5rem 0.75rem;
  }
`;
