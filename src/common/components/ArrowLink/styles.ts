import styled from 'styled-components';
import DefaultArrow from '$/assets/icons/arrow-link.svg';

export const Link = styled.a`
  text-decoration: none;
  display: flex;
  align-items: flex-start;
  fill: var(--theme-ink);
  color: var(--theme-ink);

  &:hover {
    color: var(--theme-interactive);
    fill: var(--theme-interactive);
  }
`;

export const Arrow = styled(DefaultArrow)`
  margin-inline-start: -0.35rem;
  margin-inline-end: 0.5rem;
  margin-block-start: 0.1rem;
  flex-shrink: 0;
`;
