import styled from 'styled-components';
import { BodyLBold, BodyM } from '../styles/typography';
import DefaultTableOfContents from './TableOfContents';

export const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  padding-block: 2.5rem;
  gap: 3.5rem;
`;

export const Contents = styled.article`
  grid-column: span 6;
`;

export const TableOfContents = styled(DefaultTableOfContents)`
  grid-column: span 2;
`;

export const Section = styled.section`
  grid-column: span 6;
  display: flex;
  flex-wrap: wrap;
  gap: 3.5rem;
`;

export const Content = styled.div`
  flex: calc(60% - 3.5rem / 2);
  width: auto;
`;

export const Title = styled(BodyLBold)`
  flex: calc(40% - 3.5rem / 2);
  width: auto;
`;

export const Text = styled(BodyM)``;

export const Image = styled.img`
  max-width: 100%;
`;
