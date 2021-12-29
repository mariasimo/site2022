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
  const { themeName, toggleTheme } = useTheme();

  return (
    <Container>
      {themeName === 'light' && <AnimatedBorder />}
      {themeName !== 'light' && <AnimatedBorder />}
      <Row>
        <ThemeSwitcher handleClick={toggleTheme} themeName={themeName} />
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
