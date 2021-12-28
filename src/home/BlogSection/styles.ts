import styled from 'styled-components';
import { BodyMBold, BodyS, BodySBold, HeadingMBold } from '$/styles/typography';
import { from } from '$/styles/responsive';
import DefaultBookOpen from '$/assets/icons/book-open.svg';

export const Container = styled.section`
  display: grid;
  grid-template-columns: 1fr;
  gap: 3rem;
  padding-block: 1.5rem;
  fill: var(--theme-ink);

  ${from.tabletPortrait} {
    padding-block: 0;
    grid-template-columns: repeat(8, 1fr);
  }
`;

export const Info = styled.div`
  min-width: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  ${from.tabletPortrait} {
    grid-column: 1/4;
  }
  ${from.tabletLandscape} {
    grid-column: 1/3;
  }
`;

export const PostsList = styled.div`
  min-width: 0;

  ${from.tabletPortrait} {
    grid-column: 4/9;
  }

  ${from.tabletLandscape} {
    grid-column: 3/9;
  }
`;

export const Title = styled(BodyMBold).attrs({ as: 'h2' })`
  margin-block-end: 2.5rem;
`;

export const PostTitle = styled(HeadingMBold)``;

export const LearningContainer = styled(BodyS).attrs({ as: 'div' })`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  margin-block-end: 3rem;
  padding-inline-end: 3rem;
  max-width: 25rem;
`;

export const Bold = styled(BodySBold)``;
export const BookOpen = styled(DefaultBookOpen)`
  flex-shrink: 0;
`;
