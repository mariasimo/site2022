import styled from 'styled-components';
import { BodyS } from '$/styles/typography';

export const Text = styled(BodyS).attrs({ as: 'p' })``;

export const Link = styled(BodyS)`
  display: inline;
  color: var(--theme-ink);

  &:hover {
    color: var(--theme-interactive);
  }
`;

export const SocialAbbr = styled.span`
  width: 1.25rem;
  font-variant-numeric: tabular-nums;
  display: inline-flex;
  vertical-align: top;
`;
