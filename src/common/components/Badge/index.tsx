import React, { ReactNode } from 'react';
import { Container, Link } from './styles';

const TWEET_BUILDING_IN_PUBLIC =
  'https://twitter.com/mariasimocodes/status/1474701212578717698';

const Badge = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => (
  <Container className={className}>
    <Link as="a" href={TWEET_BUILDING_IN_PUBLIC} target="_blank">
      {children}
    </Link>
  </Container>
);

export default Badge;
