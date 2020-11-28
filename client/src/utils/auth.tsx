import React, { FC, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Modal } from 'antd-mobile';

import { GET_USER_INFO } from '@queries/user.queries';
import { ToggleFocus } from '@components/UserToggle';
import { GetUserInfo } from '@/types/api';
import { useCustomQuery } from '@hooks/useApollo';

const AUTH_MESSAGE = '로그인이 필요합니다';

const auth = (Component: FC, type?: ToggleFocus): FC => () => {
  const [modalOpen, setModalOpen] = useState(false);
  const history = useHistory();
  const { loading } = useCustomQuery<GetUserInfo>(GET_USER_INFO, {
    onCompleted: ({ getUserInfo }) => {
      if (!getUserInfo.user) {
        setModalOpen(true);
        return;
      }
      if (type && getUserInfo.user.type !== type) {
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
