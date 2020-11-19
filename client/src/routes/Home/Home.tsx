import React, { FC } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { useDispatch, useSelector } from 'react-redux';

import { helloQuery } from 'queries/hello';
import { InitialState } from 'reducers';
import addUserInfo from 'reducers/addUserInfo';

const Home: FC = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: InitialState) => state.user);
  const { loading, data, error } = useQuery(helloQuery);

  const onClick = () => {
    dispatch(addUserInfo('test string'));
  };

  if (loading) return <>loading</>;

  if (error) return <>error</>;

  return (
    <>
      <button onClick={onClick}></button>
      Home<span>{data.hello.result}</span>
    </>
  );
};

export default Home;
