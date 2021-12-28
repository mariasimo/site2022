import styled from 'styled-components';
import { BodyS } from '$/styles/typography';

export const Text = styled(BodyS).attrs({ as: 'p' })``;

export const Link = styled(BodyS)`
  display: inline;
  color: var(--theme-ink);

  &:hover {
    transition: color 300ms ease-in-out;
    color: var(--theme-interactive);
  }
`;
