import React, { FC, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { Button, Toast } from 'antd-mobile';
import { useMutation } from '@apollo/react-hooks';
import { SIGNUP_DRIVER } from '@queries/user.queries';
import { SignupDriver } from '@/types/api';
import styled from '@theme/styled';
import Selector from '@components/Selector';
import Input from '@components/Input';
import useChange from '@hooks/useChange';
import useValidator from '@hooks/useValidator';
import { isCarNumber, isLicense } from '@utils/validators';
import { TOAST_DURATION } from '@utils/enums';
import { Message } from '@utils/client-message';
import { ToggleFocus } from '@components/UserToggle';
import carTypeMapper from './carTypeMapper';

interface Props {
  name: string;
  email: string;
  password: string;
  phone: string;
  type: ToggleFocus;
}

const StyledDriverForm = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;

  & input,
  select {
    margin-bottom: 1.2rem;
  }

  & .am-button {
    cursor: pointer;
    margin-top: auto;
    font-weight: 700;
    font-size: 0.9rem;
  }
`;

export const carTypes: string[] = ['대형', '중형', '소형'];

const DriverForm: FC<Props> = ({ name, email, password, phone, type }) => {
  const history = useHistory();
  const [carType, , onChangeCarType] = useChange<HTMLSelectElement>('');
  const [carNumber, , onChangeCarNumber, isCarNumValid] = useValidator('', isCarNumber);
  const [license, , onChangeLicense, isLicenseValid] = useValidator('', isLicense);
  const [signUpMutation, { loading }] = useMutation<SignupDriver>(SIGNUP_DRIVER, {
    onCompleted: ({ signupDriver }) => {
      if (signupDriver.result === 'success') {
        Toast.success(Message.SucceedSignin, TOAST_DURATION.SIGNUP_SUCCESS, () => {
          history.push('/signin');
        });
      }
      if (signupDriver.result === 'fail') {
        Toast.fail(signupDriver.error, TOAST_DURATION.SIGNUP_FAILURE);
      }
    },
  });

  const onSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      const driverInfo = {
        licenseNumber: license,
        car: {
          carNumber,
          carType: carTypeMapper(carType),
        },
      };

      signUpMutation({
        variables: {
          name,
          email,
          password,
          phone,
          driver: driverInfo,
        },
      });
    },
    [carType, carNumber, license],
  );

  return (
    <StyledDriverForm>
      <Selector
        title="차량종류"
        name="car"
        items={carTypes}
        placeholder="차량을 선택해주세요"
        onChange={onChangeCarType}
      />
      <Input
        title="차량번호"
        placeholder="차량번호를 입력해주세요. 예시) 07나 1247"
        value={carNumber}
        onChange={onChangeCarNumber}
        allow={isCarNumValid}
      />
      <Input
        title="운전면허 번호"
        placeholder="운전면허 번호 입력해주세요. 12-12-123456-12"
        value={license}
        onChange={onChangeLicense}
        allow={isLicenseValid}
      />
      <Button
        type="primary"
        onClick={onSubmit}
        loading={loading}
        disabled={!carType || !isCarNumValid || !isLicenseValid}
      >
        회원가입
      </Button>
    </StyledDriverForm>
  );
};

export default DriverForm;
