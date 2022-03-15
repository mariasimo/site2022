import React from 'react';
import { useTheme } from '$/styles/themes/ThemeContext';
import NextLink from 'next/link';
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
        <NextLink href="/" passHref>
          <Text as="a">
            <Bold>María Simó</Bold> Front—end developer
          </Text>
        </NextLink>
      </Row>
      <ColumnsContainer>
        <Column $showFrom="tabletPortrait">
          <FadeInBlock slideValue={10} delay={1}>
            <ContactBlock />
          </FadeInBlock>
        </Column>
        <Column $showFrom="mobile">
          <FadeInBlock slideValue={10} delay={1}>
            <SocialBlock />
          </FadeInBlock>
        </Column>
        <FadeInBlock slideValue={10} delay={1}>
          <Badge>Building in public</Badge>
        </FadeInBlock>
      </ColumnsContainer>
    </Container>
  );
};

export default Header;
