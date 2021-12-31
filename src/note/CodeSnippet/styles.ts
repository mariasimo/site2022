import styled from 'styled-components';
import { BodyLBold, BodyM } from '$/styles/typography';

export const Container = styled.article`
  grid-column: span 6;
  display: flex;
  flex-wrap: wrap;
  position: relative;
`;

export const Title = styled.h2`
  max-width: 12.5rem;
  flex: 40%;
  width: auto;
`;

export const Text = styled(BodyM).attrs({ as: 'p' })`
  flex: 66.666%;
  flex-grow: 0;
  margin-left: auto;
  width: auto;
  margin-block-end: 2rem;
  padding-inline-end: 3.5rem;
  font-size: 1.1rem;

  + p {
    margin-block-end: 0;
  }
`;

export const Blockquote = styled(BodyM).attrs({ as: 'blockquote' })`
  flex: calc(80% - 3.5rem / 2);
  flex-grow: 0;
  margin-inline: auto 0;
  margin-block: 0;
  width: auto;
  padding-block: 4rem;

  > p {
    margin-block-end: 0;
  }
`;

export const Image = styled.img`
  max-width: 100%;
  padding-inline-end: 3.5rem;
  padding-block: 3.5rem;
`;

export const CodeContainer = styled.div`
  width: 100%;
  padding-block: 3.5rem;
  font-size: 0.85rem;
  padding-inline-end: 3.5rem;
`;
