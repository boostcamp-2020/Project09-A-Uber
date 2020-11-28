import React, { FC } from 'react';
import { useCustomQuery } from '@hooks/useApollo';
import { useHistory } from 'react-router-dom';

import { GET_USER_INFO } from '@queries/user.queries';
import { GetUserInfo } from '@/types/api';

const Home: FC = () => {
  const history = useHistory();

  useCustomQuery<GetUserInfo>(GET_USER_INFO, {
    onCompleted: ({ getUserInfo }) => {
      if (!getUserInfo.user) {
        history.replace('/signin');
        return;
      }
      history.replace(`/${getUserInfo.user.type}`);
    },
  });
  return <></>;
};

export default Home;
