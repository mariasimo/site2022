import styled from 'styled-components';
import { BodyL, BodyLBold, HeadingL, HeadingLBold } from '$/styles/typography';
import { from } from '$/styles/responsive';

export const Container = styled.section`
  padding-block: 8rem;
  border-block-end: 1px solid var(--theme-line);

  ${from.tabletPortrait} {
    border-block-end: none;
  }
`;

export const Lead = styled(HeadingL).attrs({ as: 'h1' })`
  max-width: 56rem;
  margin-block-end: 3.5rem;
  line-height: 1.3;

  ${from.tabletPortrait} {
    margin-block-end: 2.6rem;
  }
`;

export const LeadBold = styled(HeadingLBold).attrs({ as: 'span' })``;

export const Summary = styled(BodyL).attrs({ as: 'p' })`
  max-width: 56rem;
  display: none;

  ${from.tabletPortrait} {
    display: block;
  }
`;

export const SummaryBold = styled(BodyLBold).attrs({ as: 'span' })``;

export const Column = styled.div`
  display: block;

  ${from.tabletPortrait} {
    display: none;
  }

  &:not(:last-of-type) {
    margin-block-end: 1.25rem;
  }
`;
