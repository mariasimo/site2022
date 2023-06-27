import styled from 'styled-components';
import { BodyS, HeadingMBold } from '$/styles/typography';
import DefaultArrow from '$/assets/icons/arrow-link.svg';

export const Arrow = styled(DefaultArrow)`
  flex-shrink: 0;
  width: 1.5rem;
`;

export const Title = styled(HeadingMBold).attrs({ as: 'h2' })`
  margin-block-end: 0.5rem;
  padding-inline-end: 1.5rem;
  a:hover {
    color: var(--theme-interactive);
  }
`;

export const Container = styled.article<{ $disabled?: boolean }>`
  border-block-end: 1px solid var(--theme-line);
  padding-block: 1.5rem 2.75rem;

  &:first-child {
    border-block-start: 1px solid var(--theme-line);
  }

  ${Arrow}, ${Title} {
    transition: color ease 0.3s;
    color: ${({ $disabled }) =>
      $disabled ? 'var(--theme-disabledText)' : 'var(--theme-ink)'};
  }

  p {
    color: var(--theme-ink);
  }
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const Details = styled(BodyS).attrs({ as: 'p' })``;

export const LanguagesList = styled.span`
  display: inline;
  margin: 0;
  padding: 0;

  &:before {
    content: '|';
    margin-inline: 0.5rem;
  }

  a:hover {
    color: var(--theme-interactive);
  }

  a:not(:last-child):after {
    content: ',';
    margin-inline-end: 0.25rem;
  }
`;
