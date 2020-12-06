import React, { FC, useCallback, useRef } from 'react';

import styled from '@theme/styled';

import profileImg from '@images/profile.svg';

const StyledProfileUploader = styled.button`
  position: relative;
  background: none;
  border: none;
  display: block;
  margin-left: auto;
  margin-bottom: 1.5rem;
  cursor: pointer;

  & > span {
    font-size: 0.6rem;
    font-weight: 600;
    color: ${({ theme }) => theme.PRIMARY};
    width: fit-content;
    position: absolute;
    bottom: 0.5rem;
    left: 50%;
    transform: translateX(-50%);
  }
`;

const ProfileUploader: FC = () => {
  const imageUpload = useRef<HTMLInputElement>(null);

  const onClickImageUploadHandler = useCallback(() => {
    imageUpload.current?.click();
  }, [imageUpload.current]);

  const onKeyDownImageUploadHandler = useCallback((e: React.KeyboardEvent) => {
    if (e.keyCode === 13) {
      imageUpload.current?.click();
    }
  }, []);

  return (
    <StyledProfileUploader type="button">
      <input type="file" ref={imageUpload} hidden />
      <img
        src={profileImg}
        alt="profile"
        onClick={onClickImageUploadHandler}
        onKeyDown={onKeyDownImageUploadHandler}
      />
      <span>편집</span>
    </StyledProfileUploader>
  );
};

export default ProfileUploader;
