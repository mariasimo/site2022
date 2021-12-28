import React from 'react';
import { useTheme } from '$/styles/themes/ThemeContext';
import {
  Container,
  Row,
  Column,
  Bold,
  Text,
  ThemeSwitcher,
  Badge,
  ColumnsContainer,
  AnimatedBorder,
} from './styles';
import ContactBlock from '$/common/components/ContactBlock';
import SocialBlock from '$/common/components/SocialBlock';

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
          <ContactBlock />
        </Column>
        <Column $showFrom="mobile">
          <SocialBlock />
        </Column>
        <Badge>Building in public</Badge>
      </ColumnsContainer>
    </Container>
  );
};

export default Header;
