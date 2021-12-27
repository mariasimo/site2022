import styled from 'styled-components';
import { BodyS, BodySBold } from '$/styles/typography';
import { from } from '$/styles/responsive';

export const Container = styled.footer`
  border-block-start: 1px solid ${({ theme }) => theme.colors.ink}75;
  padding-block: 1rem;
  display: grid;
  gap: 1rem;

  ${from.tabletPortrait} {
    grid-template-columns: repeat(8, 1fr);
    gap: 3rem;
  }
`;

export const Copyright = styled(BodyS).attrs({ as: 'div' })`
  min-width: 0;
  grid-row: 2;

  ${from.tabletPortrait} {
    grid-column: 1/4;
    grid-row: 1;
  }
  ${from.tabletLandscape} {
    grid-column: 1/3;
  }
`;

export const Text = styled(BodyS).attrs({ as: 'p' })`
  min-width: 0;
  max-width: 28rem;

  ${from.tabletPortrait} {
    grid-column: 4/9;
    max-width: none;
  }

  ${from.tabletLandscape} {
    flex-direction: row;
    grid-column: 3/9;
  }
`;

export const Bold = styled(BodySBold).attrs({ as: 'span' })``;

export const Link = styled(Bold).attrs({ as: 'a' })`
  text-decoration: none;
  transition: color 300ms ease-out;
  display: inline;
  cursor: pointer;

  &:hover {
    color: blue;
  }
`;
