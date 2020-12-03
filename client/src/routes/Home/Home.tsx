import React, { FC } from 'react';
import { useCustomQuery } from '@hooks/useApollo';
import { useHistory } from 'react-router-dom';

import { GET_USER_WITH_ORDER } from '@queries/user.queries';
import { GetUserWithOrder } from '@/types/api';

const Home: FC = () => {
  const history = useHistory();

  useCustomQuery<GetUserWithOrder>(GET_USER_WITH_ORDER, {
    onCompleted: ({ getUserWithOrder }) => {
      if (!getUserWithOrder.user) {
        history.replace('/signin');
        return;
      }
      history.replace(`/${getUserWithOrder.user.type}`);
    },
  });
  return <></>;
};

export default Home;
