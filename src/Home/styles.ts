import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  padding: 20px;
  line-height: 1.5;

  b {
    text-rendering: optimizelegibility;
    -webkit-font-smoothing: subpixel-antialiased;
    letter-spacing: 0.02rem;
    font-weight: 500;
  }

  a {
    display: flex;
    align-items: center;
  }
`;
