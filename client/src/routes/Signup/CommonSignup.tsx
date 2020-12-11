import React, { FC } from 'react';
import { Button, Input, Form } from 'antd';
import { ExclamationCircleTwoTone, CheckCircleTwoTone } from '@ant-design/icons';
import { Message } from '@utils/client-message';
import styled from '@theme/styled';
import theme from '@/theme';
import { ValidateStatus } from 'antd/lib/form/FormItem';

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

  & .ant-btn {
    margin-top: auto;
  }
`;

const suffix = (isVaildValue: boolean) => {
  return isVaildValue ? (
    <CheckCircleTwoTone twoToneColor={theme.PRIMARY} />
  ) : (
    <ExclamationCircleTwoTone twoToneColor={theme.RED} />
  );
};

const validateStatus = (isVaildValue: boolean, value: string): ValidateStatus => {
  return !isVaildValue && value.length !== 0 ? 'error' : '';
};

const helpMessage = (isVaildValue: boolean, value: string, helpMessage: string): string | false => {
  return !isVaildValue && value.length !== 0 && helpMessage;
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
      <Form layout="vertical">
        <Form.Item
          preserve
          name="이름"
          label="이름"
          validateStatus={validateStatus(isName, name)}
          help={helpMessage(isName, name, Message.NameGuidance)}
        >
          <Input
            value={name}
            title="이름"
            placeholder="이름을 입력해 주세요."
            onChange={onChangeName}
            suffix={suffix(isName)}
            autoComplete="off"
          />
        </Form.Item>
        <Form.Item name="이메일" label="이메일" validateStatus={validateStatus(isEmail, email)}>
          <Input
            value={email}
            title="이메일"
            placeholder="이메일을 입력해 주세요."
            onChange={onChangeEmail}
            suffix={suffix(isEmail)}
            autoComplete="off"
          />
        </Form.Item>
        <Form.Item
          name="비밀번호"
          label="비밀번호"
          validateStatus={validateStatus(isPassword, password)}
          help={helpMessage(isPassword, password, Message.PasswordGuidance)}
        >
          <Input
            value={password}
            type="password"
            title="비밀번호"
            placeholder="비밀번호를 입력해 주세요."
            onChange={onChangePassword}
            suffix={suffix(isPassword)}
            autoComplete="off"
          />
        </Form.Item>

        <Form.Item
          name="비밀번호 재확인"
          label="비밀번호 재확인"
          validateStatus={validateStatus(isPasswordRe, passwordRe)}
          help={helpMessage(isPasswordRe, passwordRe, Message.PasswordCheckGuidance)}
        >
          <Input
            value={passwordRe}
            type="password"
            title="비밀번호 재확인"
            placeholder="비밀번호를 한번 더 입력해 주세요."
            onChange={onChangePasswordRe}
            suffix={suffix(isPasswordRe)}
            autoComplete="off"
          />
        </Form.Item>

        <Form.Item
          name="핸드폰 번호"
          label="핸드폰 번호"
          validateStatus={validateStatus(isPhone, phone)}
          help={helpMessage(isPhone, phone, Message.PhoneGuidance)}
        >
          <Input
            value={phone}
            title="핸드폰 번호"
            placeholder="핸드폰 번호를 입력해 주세요."
            onChange={onChangePhone}
            suffix={suffix(isPhone)}
            autoComplete="off"
          />
        </Form.Item>
      </Form>
      <Button
        block
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
