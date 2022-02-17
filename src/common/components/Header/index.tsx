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
import FadeInBlock from '../FadeInBlock';

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
          <FadeInBlock>
            <ContactBlock />
          </FadeInBlock>
        </Column>
        <Column $showFrom="mobile">
          <FadeInBlock>
            <SocialBlock />
          </FadeInBlock>
        </Column>
        <FadeInBlock>
          <Badge>Building in public</Badge>
        </FadeInBlock>
      </ColumnsContainer>
    </Container>
  );
};

export default Header;
