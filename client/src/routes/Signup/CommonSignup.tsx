import React, { FC } from 'react';

import styled from '@theme/styled';
import Input from '@components/Input';

interface Props {
  name: string;
  email: string;
  password: string;
  passwordRe: string;
  phone: string;
  onChangeName: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeEmail: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangePassword: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangePasswordRe: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangePhone: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
}

const StyledCommonSignup = styled.section`
  margin-top: 1.5rem;
  transform: translateX(-100vw);

  & > div {
    margin-bottom: 1.2rem;
  }

  &.focus-section {
    transform: translateX(0px);
  }
`;

const CommonSignup: FC<Props> = ({
  name,
  email,
  password,
  passwordRe,
  phone,
  onChangeName,
  onChangeEmail,
  onChangePassword,
  onChangePasswordRe,
  onChangePhone,
  className,
}) => (
  <StyledCommonSignup className={className}>
    <Input value={name} onChange={onChangeName} title="이름" placeholder="이름을 입력해 주세요." />
    <Input
      value={email}
      onChange={onChangeEmail}
      title="이메일"
      placeholder="이메일을 입력해 주세요."
    />
    <Input
      value={password}
      onChange={onChangePassword}
      title="비밀번호"
      placeholder="비밀번호를 입력해 주세요."
    />
    <Input
      value={passwordRe}
      onChange={onChangePasswordRe}
      title="비밀번호 재확인"
      placeholder="비밀번호를 한번 더 입력해 주세요."
    />
    <Input
      value={phone}
      onChange={onChangePhone}
      title="핸드폰 번호"
      placeholder="핸드폰 번호를 입력해 주세요."
    />
  </StyledCommonSignup>
);

CommonSignup.defaultProps = {
  className: '',
};

export default CommonSignup;
