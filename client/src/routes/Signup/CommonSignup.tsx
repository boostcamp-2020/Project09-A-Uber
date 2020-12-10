import React, { FC } from 'react';
import { Button, Input } from 'antd';
import { ExclamationCircleTwoTone, CheckCircleTwoTone } from '@ant-design/icons';
import { Message } from '@utils/client-message';
import styled from '@theme/styled';
// import Input from '@components/Input';
import ProfileUplodaer from '@components/ProfileUploader';
import theme from '@/theme';

interface Props {
  name: string;
  email: string;
  password: string;
  passwordRe: string;
  phone: string;
  isName: boolean;
  isEmail: boolean;
  isPassword: boolean;
  isPasswordRe: boolean;
  isPhone: boolean;
  onChangeName: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeEmail: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangePassword: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangePasswordRe: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangePhone: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClickNextHandler: () => void;
  className?: string;
}

const StyledCommonSignup = styled.section`
  height: 100%;
  display: flex;
  flex-direction: column;

  & > div {
    margin-bottom: 1.2rem;
  }

  & > a {
    cursor: pointer;
    margin-top: auto;
    font-weight: 700;
    font-size: 0.9rem;
  }
`;

const suffix = (isVaildValue: boolean) => {
  return isVaildValue ? (
    <CheckCircleTwoTone twoToneColor={theme.PRIMARY} />
  ) : (
    <ExclamationCircleTwoTone twoToneColor={theme.RED} />
  );
};

const CommonSignup: FC<Props> = ({
  name,
  email,
  password,
  passwordRe,
  phone,
  isName,
  isEmail,
  isPassword,
  isPasswordRe,
  isPhone,
  onChangeName,
  onChangeEmail,
  onChangePassword,
  onChangePasswordRe,
  onChangePhone,
  onClickNextHandler,
  className,
}) => {
  return (
    <StyledCommonSignup className={className}>
      <ProfileUplodaer />
      <Input
        value={name}
        onChange={onChangeName}
        title="이름"
        placeholder="이름을 입력해 주세요."
        suffix={suffix(isName)}
      />
      <Input
        value={email}
        onChange={onChangeEmail}
        title="이메일"
        placeholder="이메일을 입력해 주세요."
        suffix={suffix(isEmail)}
      />
      <Input
        value={password}
        onChange={onChangePassword}
        title="비밀번호"
        placeholder="비밀번호를 입력해 주세요."
        type="password"
        suffix={suffix(isPassword)}
      />
      <Input
        value={passwordRe}
        onChange={onChangePasswordRe}
        title="비밀번호 재확인"
        placeholder="비밀번호를 한번 더 입력해 주세요."
        type="password"
        suffix={suffix(isPasswordRe)}
      />
      <Input
        value={phone}
        onChange={onChangePhone}
        title="핸드폰 번호"
        placeholder="핸드폰 번호를 입력해 주세요."
        suffix={suffix(isEmail)}
        data-testID="signup-phone"
      />

      <Button
        type="primary"
        onClick={onClickNextHandler}
        disabled={!isName || !isEmail || !isPassword || !isPasswordRe || !isPhone}
        data-testID="signup-next"
      >
        다음
      </Button>
    </StyledCommonSignup>
  );
};

CommonSignup.defaultProps = {
  className: '',
};

export default CommonSignup;
