import React, { ReactNode } from 'react';
import { Container } from './styles';

const Badge = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => <Container className={className}>{children}</Container>;

export default Badge;
