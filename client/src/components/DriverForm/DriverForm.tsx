import React, { FC, useCallback, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Button, Input, Form, Select, message, Row, Col } from 'antd';
import { ExclamationCircleTwoTone, CheckCircleTwoTone } from '@ant-design/icons';
import { useMutation } from '@apollo/react-hooks';
import { SIGNUP_DRIVER } from '@queries/user';
import { SignupDriver } from '@/types/api';
import styled from '@theme/styled';
import useValidator from '@hooks/useValidator';
import { isCarNumber, isLicense } from '@utils/validators';
import { TOAST_DURATION } from '@utils/enums';
import { Message } from '@utils/client-message';
import { ToggleFocus } from '@components/UserToggle';
import theme from '@/theme';
import { ValidateStatus } from 'antd/lib/form/FormItem';
import carTypeMapper from './carTypeMapper';

const StyledFrom = styled(Form)`
  height: 100%;
  position: relative;

  & .signup-button {
    position: absolute;
    bottom: 0;
    width: 100%;
  }
`;

interface Props {
  name: string;
  email: string;
  password: string;
  phone: string;
  type: ToggleFocus;
}

export const carTypes: string[] = ['대형', '중형', '소형'];

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

const { Option } = Select;

const DriverForm: FC<Props> = ({ name, email, password, phone }) => {
  const history = useHistory();
  const [carType, setCarType] = useState('');
  const [carNumber, , onChangeCarNumber, isCarNumValid] = useValidator('', isCarNumber);
  const [license, , onChangeLicense, isLicenseValid] = useValidator('', isLicense);
  const [signUpMutation, { loading }] = useMutation<SignupDriver>(SIGNUP_DRIVER, {
    onCompleted: ({ signupDriver }) => {
      if (signupDriver.result === 'success') {
        message.success({
          content: Message.SucceedSignup,
          style: {
            marginTop: '50vh',
          },
          duration: TOAST_DURATION.SIGNUP_SUCCESS,
          onClose: () => history.push('/signin'),
        });
      }
      if (signupDriver.result === 'fail') {
        message.error({
          content: signupDriver.error,
          style: {
            marginTop: '50vh',
          },
          duration: TOAST_DURATION.SIGNUP_FAILURE,
        });
      }
    },
  });

  const onChangeCarType = (value: string) => {
    setCarType(value);
  };

  const onSubmit = useCallback(() => {
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
  }, [carType, carNumber, license]);

  return (
    <StyledFrom layout="vertical" onFinish={onSubmit}>
      <Form.Item name="차량 종류" label="차량 종류">
        <Select placeholder="차량을 선택해주세요" onChange={onChangeCarType}>
          {carTypes.map((carType) => (
            <Option key={carType} value={carType}>
              {carType}
            </Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item
        name="차량번호"
        label="차량번호"
        validateStatus={validateStatus(isCarNumValid, carNumber)}
        help={helpMessage(isCarNumValid, carNumber, Message.CarNumberGuidance)}
      >
        <Input
          value={name}
          title="차량번호"
          placeholder="차량번호를 입력해주세요."
          onChange={onChangeCarNumber}
          suffix={suffix(isCarNumValid)}
          autoComplete="off"
          data-testId="signup-car-number"
        />
      </Form.Item>
      <Form.Item
        name="운전면허 번호"
        label="운전면허 번호"
        validateStatus={validateStatus(isLicenseValid, license)}
        help={helpMessage(isLicenseValid, license, Message.LicenseGuidance)}
      >
        <Input
          value={name}
          title="운전면허 번호"
          placeholder="운전면허 번호 입력해주세요."
          onChange={onChangeLicense}
          suffix={suffix(isLicenseValid)}
          autoComplete="off"
          data-testId="signup-car-number"
        />
      </Form.Item>
      <Row className="signup-button">
        <Col span={24}>
          <Button
            block
            type="primary"
            htmlType="submit"
            loading={loading}
            disabled={!carType || !isCarNumValid || !isLicenseValid}
            data-testID="signup-driver-submit"
          >
            회원가입
          </Button>
        </Col>
      </Row>
    </StyledFrom>
  );
};

export default DriverForm;
