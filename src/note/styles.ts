import styled from 'styled-components';
import { BodyLBold, BodyS, BodySBold } from '$/styles/typography';
import DefaultTableOfContents from './TableOfContents';
import DefaultArrowLink from '$/common/components/ArrowLink';
import DefaultChatHeart from '$/assets/icons/chat-heart.svg';
import { from } from '$/styles/responsive';

export const Container = styled.div`
  display: flex;
  position: relative;
  padding-block-start: 2.5rem;
`;

export const TableOfContents = styled(DefaultTableOfContents)`
  width: 25%;
  flex-shrink: 0;
  display: none;

  ${from.tabletLandscape} {
    display: flex;
  }
`;

export const Contents = styled.div`
  width: auto;
`;

export const LinksSection = styled.section`
  padding-block: 2rem 5rem;
  border-top: 1px solid var(--theme-line);
  display: grid;
  gap: 2rem;
  grid-template-columns: repeat(auto-fit, minmax(24rem, calc(50% - 2rem / 2)));
`;

export const Item = styled.div``;

export const ArrowLink = styled(DefaultArrowLink)`
  margin-block-end: 1rem;
`;

export const Title = styled(BodyLBold).attrs({ as: 'h3' })`
  margin-block-end: 2rem;
`;

export const ContactSection = styled.section`
  padding-block: 2rem 5.8rem;
  border-top: 1px solid var(--theme-line);
  display: grid;
  gap: 2rem;
  grid-template-columns: repeat(auto-fit, minmax(auto, 13.25rem));
`;

export const Text = styled(BodyS).attrs({ as: 'p' })`
  margin-block-end: 0.7rem;
`;

export const Bold = styled(BodySBold).attrs({ as: 'p' })`
  margin-block-end: 0.7rem;
`;

export const ChatHeart = styled(DefaultChatHeart)`
  flex-shrink: 0;
  margin-block-end: 1rem;
  fill: var(--theme-ink);
`;
