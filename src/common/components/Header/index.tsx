import React from 'react';
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
} from './styles';

const Header = () => (
  <Container>
    <Row>
      <ThemeSwitcher />
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
    </ColumnsContainer>
  </Container>
);

export default Header;
