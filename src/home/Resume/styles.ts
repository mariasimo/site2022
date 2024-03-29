import styled from 'styled-components';
import { from } from '$/styles/responsive';
import { BodySMBold, BodySM } from '$/styles/typography';

export const Container = styled.div`
  padding-block: 4rem;

  ${from.tabletPortrait} {
    padding-block: 8rem;
  }
`;

export const Section = styled.section`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;

  ${from.tabletPortrait} {
    gap: 3rem;
    grid-template-columns: repeat(8, 1fr);
  }

  &:not(:last-child) {
    margin-block-end: 5.5rem;
  }
`;

export const TitleColumn = styled.div`
  min-width: 0;

  ${from.tabletPortrait} {
    grid-column: 1/4;
  }
  ${from.tabletLandscape} {
    grid-column: 1/3;
  }
`;

export const Title = styled(BodySMBold).attrs({ as: 'h2' })``;

export const ContentColumns = styled.div`
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 3rem;

  ${from.tabletPortrait} {
    grid-column: 4/9;
  }

  ${from.tabletLandscape} {
    flex-direction: row;
    grid-column: 3/9;
  }
`;

export const Block = styled.article`
  flex: 1 1 0px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 2rem;
`;

export const LinksContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const Text = styled(BodySM)``;
export const Bold = styled(BodySMBold)``;
