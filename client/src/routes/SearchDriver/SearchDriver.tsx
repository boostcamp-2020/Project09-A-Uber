import React, { FC } from 'react';
import { Button, ActivityIndicator } from 'antd-mobile';

import styled from '@theme/styled';
import Header from '@components/HeaderWithMenu';

const StyledSearchDriver = styled.div`
  margin-bottom: 0.8rem;
  height: 100%;

  & > section {
    position: relative;
    height: calc(100% - 50px);
    position: relative;
    padding: 0 1.5rem 1.5rem 1.5rem;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;

    & > .loading-center {
      position: absolute;
      left: 50%;
      top: 40%;
      transform: translateX(-50%);
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      font-weight: 700;

      & > div {
        margin-top: 1rem;
      }
    }

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
  }
`;

const SearchDriver: FC = () => (
  <StyledSearchDriver>
    <Header className="green-header" />
    <section>
      <div className="loading-center">
        주변에 운행이 가능한 드라이버를 탐색중입니다
        <ActivityIndicator size="large" />
      </div>
      <Button type="warning">탐색 취소</Button>
    </section>
  </StyledSearchDriver>
);

export default SearchDriver;
