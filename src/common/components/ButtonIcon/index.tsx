import type { ComponentType } from 'react';
import { Hidden, Button } from './styles';
import type Props from './types';

const ButtonIcon = ({ icon, label, onClick, className, disabled }: Props) => {
  const Icon: ComponentType = icon;

  return (
    <Button
      className={className}
      aria-labelledby="button-icon"
      type="button"
      onClick={onClick}
      disabled={!!disabled}
    >
      <Hidden>{label}</Hidden>
      <Icon aria-hidden="true" />
    </Button>
  );
};

export default ButtonIcon;
