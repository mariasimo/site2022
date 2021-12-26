import React, { ReactNode } from 'react';
import { Container } from './styles';

const Badge = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => (
  <Container className={className}>
    <a
      href="https://twitter.com/mariasimocodes/status/1474701212578717698"
      target="_blank"
    >
      {children}
    </a>
  </Container>
);

export default Badge;
