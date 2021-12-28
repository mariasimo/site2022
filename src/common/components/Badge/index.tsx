import React, { ReactNode } from 'react';
import { externalLinks } from '../../utils/links';
import { Container, Link } from './styles';

const Badge = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => (
  <Container className={className}>
    <Link as="a" href={externalLinks.tweetBuildInPublic} target="_blank">
      {children}
    </Link>
  </Container>
);

export default Badge;
