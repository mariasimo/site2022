import styled from 'styled-components';
import { from } from './responsive';

const HeadingLBase = styled.span`
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: 1.3125rem;
  line-height: 1.4;

  ${from.mobile} {
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
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: 1.3125rem;
  line-height: 1.5;

  ${from.mobile} {
    font-size: 2rem;
  }
`;

export const HeadingM = styled(HeadingMBase)`
  font-weight: 400;
`;

export const HeadingMBold = styled(HeadingMBase)`
  font-weight: 500;
`;

const BodyLBase = styled.span`
  font-family: ${({ theme }) => theme.fonts.text};
  font-size: 1.25rem;
  line-height: 1.5;
`;

export const BodyL = styled(BodyLBase)`
  font-weight: 400;
`;

export const BodyLBold = styled(BodyLBase)`
  font-weight: 500;
`;

const BodyMBase = styled.span`
  font-family: ${({ theme }) => theme.fonts.text};
  font-size: 1rem;
  line-height: 1.6;
`;

export const BodyM = styled(BodyMBase)`
  font-weight: 400;
`;

export const BodyMBold = styled(BodyMBase)`
  font-weight: 500;
`;

const BodySBase = styled.span`
  font-family: ${({ theme }) => theme.fonts.text};
  font-size: 0.875rem;
  line-height: 1.6;
`;

export const BodyS = styled(BodySBase)`
  font-weight: 400;
`;

export const BodySBold = styled(BodySBase)`
  font-weight: 500;
`;

const BodyXSBase = styled.span`
  font-family: ${({ theme }) => theme.fonts.text};
  font-size: 0.75rem;
  line-height: 1.6;

  ${from.mobile} {
    font-size: 0.875rem;
  }
`;

export const BodyXS = styled(BodyXSBase)`
  font-weight: 400;
`;

export const BodyXSBold = styled(BodyXSBase)`
  font-weight: 500;
`;