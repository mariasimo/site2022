import styled from 'styled-components';
import {
  BodyL,
  BodyLBold,
  HeadingL,
  HeadingLBold,
  BodyS,
} from '$/styles/typography';
import { from } from '$/styles/responsive';

export const Container = styled.section`
  padding-block: 6.5rem 8rem;
`;

export const Lead = styled(HeadingL).attrs({ as: 'h1' })`
  max-width: 60rem;
  margin-block-end: 3.5rem;

  ${from.tabletPortrait} {
    margin-block-end: 2.6rem;
  }
`;

export const LeadBold = styled(HeadingLBold).attrs({ as: 'span' })``;

export const Summary = styled(BodyL).attrs({ as: 'p' })`
  max-width: 43.8rem;
  display: none;

  ${from.tabletPortrait} {
    display: block;
  }
`;

export const SummaryBold = styled(BodyLBold).attrs({ as: 'span' })``;

export const Text = styled(BodyS).attrs({ as: 'p' })``;

export const Link = styled(BodyS)`
  text-decoration: none;
  transition: color 300ms ease-out;
  display: inline;

  &:hover {
    color: #ccc;
  }
`;

export const ContactBlock = styled.div`
  display: block;

  ${from.tabletPortrait} {
    display: none;
  }

  &:not(:last-of-type) {
    margin-block-end: 1.25rem;
  }
`;
