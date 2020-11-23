import React, { FC } from 'react';

import { ToggleFocus, FOCUS_USER } from '@components/UserToggle';
import DriverForm from '@components/DriverForm';
import PaymentInfoForm from '@components/PaymentInfoForm';

interface Props {
  nextForm: ToggleFocus;
}

const NextSignup: FC<Props> = ({ nextForm }) => (
  <>{nextForm === FOCUS_USER ? <PaymentInfoForm /> : <DriverForm />}</>
);

export default NextSignup;
