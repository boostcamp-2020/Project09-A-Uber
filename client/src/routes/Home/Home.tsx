import React, { FC } from 'react';
import { useQuery } from '@apollo/react-hooks';

import { helloQuery } from 'queries/hello';

const Home: FC = () => {
  const { loading, data, error } = useQuery(helloQuery);

  console.log(data);

  if (loading) return <>loading</>;

  if (error) return <>error</>;

  return (
    <>
      Home<span>{data.hello.result}</span>
    </>
  );
};

export default Home;
