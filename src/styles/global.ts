import { createGlobalStyle } from 'styled-components';
import { normalize } from 'styled-normalize';

const styled = { createGlobalStyle };

const GlobalStyle = styled.createGlobalStyle`
  ${normalize};
  * {
    box-sizing: border-box;
  }
  body {
    font-family: 'Neue Haas Grotesk Display Pro', -apple-system,
      BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell',
      'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background-color: ${({ theme }) => theme.colors.paper};
    color: ${({ theme }) => theme.colors.ink};
    font-size: 16px;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  p {
    margin: 0;
    padding: 0;
  }

  a {
    color: ${({ theme }) => theme.colors.ink};
  }

  #__next {
    display: flex;
    min-height: 100vh;

    > * {
      flex: 1;
    }
  }

  ::-moz-selection {
    color: #555;
    background: #ccc;
  }

  ::selection {
    color: #555;
    background: #ccc;
  }
`;

export default GlobalStyle;
