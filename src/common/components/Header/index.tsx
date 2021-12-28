import React from 'react';
import { useTheme } from '$/common/hooks/ThemeContext';
import {
  Container,
  Row,
  Column,
  Bold,
  Text,
  ThemeSwitcher,
  Link,
  Badge,
  ColumnsContainer,
  AnimatedBorder,
} from './styles';

const Header = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <Container>
      {theme.name === 'light' && <AnimatedBorder />}
      {theme.name !== 'light' && <AnimatedBorder />}
      <Row>
        <ThemeSwitcher handleClick={toggleTheme} theme={theme} />
        <Text>
          <Bold>María Simó</Bold> Front—end developer
        </Text>
      </Row>
      <ColumnsContainer>
        <Column $showFrom="tabletPortrait">
          <Text>Currently Based in Madrid</Text>
          <Text>Made in Murcia</Text>
          <Text>holasoymariasimo@gmail.com</Text>
        </Column>
        <Column $showFrom="mobile">
          <Text>Also find me at</Text>
          <Text as="a" href="https://github.com/mariasimo" target="_blank">
            github.com/mariasimo
          </Text>
          <Text>
            in{' '}
            <Link as="a" href="https://github.com/mariasimo" target="_blank">
              @mariasimo
            </Link>{' '}
            tw{' '}
            <Link as="a" href="https://github.com/mariasimo" target="_blank">
              @mariasimocodes
            </Link>
          </Text>
        </Column>
        <Badge>Building in public</Badge>
      </ColumnsContainer>
    </Container>
  );
};

export default Header;
