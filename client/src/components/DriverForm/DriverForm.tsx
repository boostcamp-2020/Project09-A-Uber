import React, { FC, useCallback, useState } from 'react';
import { Button } from 'antd-mobile';
import styled from '@theme/styled';
import Selector from '@components/Selector';
import Input from '@components/Input';

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

const DriverForm: FC = ({ ...common }) => {
  const [carType, setCarType] = useState('');
  const [carNumber, setCarNumber] = useState('');
  const [lisence, setLisence] = useState('');

  const onChangeCarType = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    setCarType(e.target.value);
  }, []);

  const onChangeCarNumber = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setCarNumber(e.target.value);
  }, []);

  const onChangeLisence = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setLisence(e.target.value);
  }, []);

  const onSubmit = useCallback((e: React.FormEvent) => {
    // TODO: 회원가입 요청
    e.preventDefault();
    console.log('api 요청.');
  }, []);

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
          placeholder="차량번호를 입력해주세요."
          value={carNumber}
          onChange={onChangeCarNumber}
        />

        <Input
          title="운전면허 번호"
          placeholder="운전면허 번호 입력해주세요."
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
