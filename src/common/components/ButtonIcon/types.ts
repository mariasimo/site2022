import type { ComponentType, MouseEventHandler } from 'react';

type Props = {
  icon: ComponentType;
  label: string;
  onClick: MouseEventHandler<HTMLButtonElement>;
  className?: string;
  disabled?: boolean;
};

export default Props;
