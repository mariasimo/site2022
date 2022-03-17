import styled from 'styled-components';
import { BodyMBold, BodyS, BodySBold } from '$/styles/typography';

export const Container = styled.aside`
  width: 100%;
  height: calc(100vh - 5rem);
  position: sticky;
  top: 2.5rem;
  display: flex;
  flex-direction: column;
  margin-block-end: 5rem;
`;

export const Title = styled(BodyMBold).attrs({ as: 'p' })`
  margin-block-end: 1.5rem;
`;

export const Section = styled(BodyS).attrs({ as: 'p' })`
  padding-block: 0.7rem;
  border-block-end: 1px solid var(--theme-line);

  :first-of-type {
    border-block-start: 1px solid var(--theme-line);
  }

  a {
    color: var(--theme-ink);
  }
`;

export const Links = styled(BodySBold).attrs({ as: 'div' })`
  display: flex;
  gap: 2rem;
  margin-block-start: auto;
`;

export const AnchorLink = styled.a`
  cursor: pointer;
  text-decoration: none;
  transition: color ease-in-out 0.25s;

  &:hover {
    color: var(--theme-interactive);
  }

  &:visited,
  &:active {
    color: var(--theme-ink);
  }
`;
