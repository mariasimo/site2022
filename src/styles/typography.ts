import styled from 'styled-components';
import { from } from './responsive';

const HeadingLBase = styled.span`
  font-family: var(--theme-font-display);
  font-size: 1.5rem;
  line-height: 1.2;

  ${from.mobile} {
    font-size: 1.8rem;
  }

  ${from.tabletPortrait} {
    font-size: 2.625rem;
  }
`;

export const HeadingL = styled(HeadingLBase)`
  font-weight: 400;
`;

export const HeadingLBold = styled(HeadingLBase)`
  font-weight: 500;
`;

const HeadingMBase = styled.span`
  font-family: var(--theme-font-display);
  font-size: 1.4rem;
  line-height: 1.2;

  ${from.mobile} {
    font-size: 1.5rem;
  }
`;

export const HeadingM = styled(HeadingMBase)`
  font-weight: 400;
`;

export const HeadingMBold = styled(HeadingMBase)`
  font-weight: 500;
`;

const BodyLBase = styled.span`
  font-family: var(--theme-font-display);
  font-size: 1.45rem;
  line-height: 1.5;
  letter-spacing: 0.015rem;
  word-spacing: 0.0625rem;
`;

export const BodyL = styled(BodyLBase)`
  font-weight: 400;
`;

export const BodyLBold = styled(BodyLBase)`
  font-weight: 500;
`;

const BodyMBase = styled.span`
  font-family: var(--theme-font-text);
  font-size: 1.25rem;
  line-height: 1.6;
  letter-spacing: 0.02rem;
  word-spacing: 0.0625rem;

  ${from.mobile} {
    font-size: 1.15rem;
  }
`;

export const BodyM = styled(BodyMBase)`
  font-weight: 400;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
`;

export const BodyMBold = styled(BodyMBase)`
  font-weight: 500;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
`;

const BodySMBase = styled.span`
  font-family: var(--theme-font-text);
  font-size: 1rem;
  line-height: 1.6;
  letter-spacing: 0.02rem;
  word-spacing: 0.0625rem;
`;

export const BodySM = styled(BodySMBase)`
  font-weight: 400;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
`;

export const BodySMBold = styled(BodySMBase)`
  font-weight: 500;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
`;

const BodySBase = styled.span`
  font-family: var(--theme-font-text);
  font-size: 0.875rem;
  line-height: 1.6;
`;

export const BodyS = styled(BodySBase)`
  font-weight: 400;
`;

export const BodySBold = styled(BodySBase)`
  font-weight: 500;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
`;

const BodyXSBase = styled.span`
  font-family: var(--theme-font-text);
  font-size: 0.875rem;
  line-height: 1.6;
  letter-spacing: 0.025rem;
  word-spacing: 0.0625rem;
`;

export const BodyXS = styled(BodyXSBase)`
  font-weight: 400;
`;

export const BodyXSBold = styled(BodyXSBase)`
  font-weight: 500;
`;

const BodyXXSBase = styled.span`
  font-family: var(--theme-font-text);
  font-size: 0.75rem;
  line-height: 1;
`;

export const BodyXXS = styled(BodyXXSBase)`
  font-weight: 400;
`;

export const BodyXXSBold = styled(BodyXXSBase)`
  font-weight: 500;
`;
