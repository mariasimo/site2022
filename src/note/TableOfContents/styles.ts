import styled from 'styled-components';
import { BodyMBold, BodyS } from '$/styles/typography';

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
`;

export const Links = styled.div`
  display: flex;
  gap: 2rem;
  margin-block-start: auto;
`;
