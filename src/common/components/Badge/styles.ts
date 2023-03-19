import styled from 'styled-components';
import { BodyXXSBold } from '$/styles/typography';
import { ShineEffect } from '$/styles/mixins';

export const Container = styled.div`
  align-items: center;
  background-color: var(--theme-interactive);
  border-radius: 0.75rem;
  display: inline-flex;
  height: 1.5rem;
  overflow: hidden;
  padding: 0.3rem 0.5rem;
  position: relative;
  width: fit-content;

  ${ShineEffect}
`;

export const Link = styled(BodyXXSBold)`
  color: var(--theme-paper);
`;
