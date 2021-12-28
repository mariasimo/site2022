import { createGlobalStyle, css } from 'styled-components';
import { normalize } from 'styled-normalize';
import themes from './themes';

const styled = { createGlobalStyle };

const Theming = css`
  :root {
    --theme-font-display: 'Neue Haas Grotesk Display Pro';
    --theme-font-text: 'Neue Haas Grotesk Text Pro';
    --theme-line: ${themes.light.colors.line};
    --theme-ink: ${themes.light.colors.ink};
    --theme-paper: ${themes.light.colors.paper};
    --theme-accent: ${themes.light.colors.accent};
    --theme-interactive: ${themes.light.colors.interactive};
    --theme-selectedText: ${themes.light.colors.selectedText};
    --theme-selectedTextBg: ${themes.light.colors.selectedTextBg};
  }

  html.dark {
    --theme-ink: ${themes.dark.colors.ink};
    --theme-line: ${themes.dark.colors.line};
    --theme-paper: ${themes.dark.colors.paper};
    --theme-accent: ${themes.dark.colors.accent};
    --theme-interactive: ${themes.dark.colors.interactive};
    --theme-selectedText: ${themes.dark.colors.selectedText};
    --theme-selectedTextBg: ${themes.dark.colors.selectedTextBg};
  }
`;

const GlobalStyle = styled.createGlobalStyle`
  ${normalize};

  ${Theming};

  * {
    box-sizing: border-box;
  }
  body {
    font-family: 'Neue Haas Grotesk Display Pro', -apple-system,
      BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell',
      'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;

    font-size: 16px;
    transition: background-color 300ms ease-out, color 300ms ease-in-out 200ms;

    background: var(--theme-paper);
    color: var(--theme-ink);
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
    text-decoration: none;
  }

  #__next {
    display: flex;
    min-height: 100vh;

    > * {
      flex: 1;
    }
  }

  ::-moz-selection {
    background: var(--theme-selectedText);
    color: var(--theme-selectedTextBg);
  }

  ::selection {
    background: var(--theme-selectedText);
    color: var(--theme-selectedTextBg);
  }
`;

export default GlobalStyle;
