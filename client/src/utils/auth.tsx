import React, { FC, useState } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { useHistory } from 'react-router-dom';
import { Modal } from 'antd-mobile';

import { GET_USER_INFO } from '@queries/user.queries';
import { GetUserInfo } from '@/types/api';

const AUTH_MESSAGE = '로그인이 필요합니다';

const auth = (Component: FC): FC => () => {
  const [modalOpen, setModalOpen] = useState(false);
  const history = useHistory();
  const { loading } = useQuery<GetUserInfo>(GET_USER_INFO, {
    onCompleted: ({ getUserInfo }) => {
      if (!getUserInfo.user) {
        setModalOpen(true);
      }
    },
    onError: () => {
      setModalOpen(true);
    },
  });

  const onClickModalCloseHandler = () => {
    setModalOpen(false);
    history.replace('/signin');
  };

  return (
    <>
      <Modal
        visible={modalOpen}
        transparent
        title="알림"
        footer={[
          {
            text: 'Ok',
            onPress: onClickModalCloseHandler,
          },
        ]}
      >
        {AUTH_MESSAGE}
      </Modal>
      {!loading && !modalOpen && <Component />}
    </>
  );
};

export default auth;
