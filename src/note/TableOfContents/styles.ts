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

export const Footer = styled.footer`
  display: flex;
  justify-content: space-between;
  margin-block-start: auto;
  gap: 2rem;
`;

export const KudosContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
`;

export const KudosEmoji = styled.span`
  display: flex;
`;

export const KudosText = styled(BodyS)`
  font-variant-numeric: tabular-nums;
  width: 2rem;
  transition: color ease 0.15s;
`;

export const KudosButton = styled.button`
  background: transparent;
  box-shadow: none;
  border: none;
  cursor: pointer;
  transition: transform ease 0.15s;

  &:hover {
    ${KudosEmoji} {
      transform: scale(1.3);
      transition: transform ease 0.15s;
    }
  }
  &:active + * {
    color: var(--theme-inkHighContrast);
  }
`;
