import React, { FC } from 'react';

import { ToggleFocus, FOCUS_USER } from '@components/UserToggle';
import DriverForm from '@components/DriverForm';
import PaymentInfoForm from '@components/PaymentInfoForm';

interface Props {
  nextForm: ToggleFocus;
  name: string;
  email: string;
  password: string;
  phone: string;
}

const NextSignup: FC<Props> = ({ nextForm, name, email, password, phone }) => (
  <>
    {nextForm === FOCUS_USER ? (
      <PaymentInfoForm
        name={name}
        email={email}
        password={password}
        phone={phone}
        type={nextForm}
      />
    ) : (
      <DriverForm name={name} email={email} password={password} phone={phone} type={nextForm} />
    )}
  </>
);

export default NextSignup;
