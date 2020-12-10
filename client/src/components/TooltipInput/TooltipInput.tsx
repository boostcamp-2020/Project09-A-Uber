/* eslint-disable @typescript-eslint/no-empty-function */
import React, { FC } from 'react';
import { Tooltip, Input } from 'antd';
import { theme } from '@/theme';

interface Props {
  tooltipMessage?: string;
  allow?: boolean;
  value?: string;
  title?: string;
  placeholder?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  suffix?: React.ReactNode;
}

const TooltipInput: FC<Props> = ({
  tooltipMessage,
  allow,
  value,
  title,
  placeholder,
  onChange,
  suffix,
}) => {
  return (
    <>
      <Tooltip
        placement="bottomLeft"
        visible={!allow && value?.length !== 0}
        title={tooltipMessage}
        color={theme.RED}
      >
        <Input
          value={value}
          onChange={onChange}
          title={title}
          placeholder={placeholder}
          suffix={suffix}
        />
      </Tooltip>
    </>
  );
};

TooltipInput.defaultProps = {
  tooltipMessage: '',
  value: '',
  title: '',
  placeholder: '',
  suffix: '',
};

export default TooltipInput;
