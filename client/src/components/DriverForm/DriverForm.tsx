import React, { FC, useCallback, useState } from 'react';
import { Button } from 'antd-mobile';
import styled from '@theme/styled';
import Selector from '@components/Selector';
import Input from '@components/Input';
import useChange from '@/hooks/useChange';
import { isCarNumber, isLicense } from '../../utils/vaildator';

interface Props {
  name: string;
  email: string;
  password: string;
  phone: string;
}

const StyledDriverForm = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  height: 612px;

  & input,
  select {
    margin-bottom: 1.2rem;
  }
`;

const carTypes: string[] = ['대형', '중형', '소형'];

const DriverForm: FC<Props> = ({ name, email, password, phone }) => {
  const [carType, , onChangeCarType] = useChange<HTMLSelectElement>('');
  const [carNumber, , onChangeCarNumber] = useChange('');
  const [lisence, , onChangeLisence] = useChange('');

  const onSubmit = useCallback(
    (e: React.FormEvent) => {
      // TODO: 회원가입 요청
      e.preventDefault();
      console.log(carType, carNumber, lisence);
    },
    [carType, carNumber, lisence],
  );

  return (
    <StyledDriverForm>
      <div>
        <Selector
          title="차량종류"
          name="car"
          items={carTypes}
          placeholder="차량을 선택해주세요"
          onChange={onChangeCarType}
        />

        <Input
          title="차량번호"
          placeholder="차량번호를 입력해주세요. 입력예시) 07나 0452"
          value={carNumber}
          onChange={onChangeCarNumber}
        />

        <Input
          title="운전면허 번호"
          placeholder="운전면허 번호 입력해주세요. 입력예시) 12-12-123456-12"
          value={lisence}
          onChange={onChangeLisence}
        />
      </div>
      <div>
        <Button type="primary" onClick={onSubmit}>
          회원가입
        </Button>
      </div>
    </StyledDriverForm>
  );
};

export default DriverForm;
