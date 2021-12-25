import React from 'react';
import Badge from '$/common/components/Badge';
import {
  Container,
  Row,
  Column,
  Bold,
  Text,
  ThemeSwitcher,
  Link,
} from './styles';

const Header = () => (
  <Container>
    <Row>
      <ThemeSwitcher />
      <Text>
        <Bold>María Simó</Bold> Front—end developer
      </Text>
    </Row>
    <Column $showFrom="tabletLandscape">
      <Text>Currently Based in Madrid</Text>
      <Text>Made in Murcia</Text>
      <Text>holasoymariasimo@gmail.com</Text>
    </Column>
    <Column $showFrom="tabletPortrait">
      <Text>Also find me at</Text>
      <Link as="a" href="https://github.com/mariasimo" target="_blank">
        github.com/mariasimo
      </Link>
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
  </Container>
);

export default Header;
