import styled from 'styled-components';
import DefaultTableOfContents from './TableOfContents';

export const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  padding-block: 2.5rem;
`;

export const TableOfContents = styled(DefaultTableOfContents)`
  grid-column: span 2;
`;
