import { useMemo, FC } from 'react';
import { createPortal } from 'react-dom';

interface Props {
  elementId: string;
}

const Portal: FC<Props> = ({ children, elementId }) => {
  const rootElement = useMemo(() => document.getElementById(elementId), [elementId]) as HTMLElement;

  return createPortal(children, rootElement);
};

export default Portal;
