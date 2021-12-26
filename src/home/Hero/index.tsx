import {
  Container,
  Lead,
  LeadBold,
  Text,
  Summary,
  SummaryBold,
  ContactBlock,
  Link,
} from './styles';

export const Hero = () => (
  <Container>
    <Lead>
      <LeadBold>María Simó </LeadBold> Front—end developer. Sharp and
      passionated individual coding since 2019. I’m big on clean and expresive
      code, design systems, polished layouts and fine—grained interactions &
      animations.
    </Lead>
    <Summary>
      As a <SummaryBold>developer</SummaryBold>, I want to grow horizontally,
      expanding myself towards adjacent areas to become a well-rounded
      specialist and a better team player. As a{' '}
      <SummaryBold>former designer</SummaryBold>, I want to champion the work of
      all my mates into the final product the client ends up interacting with.
      As a <SummaryBold>woman</SummaryBold>, I want to inspire others to follow
      a career in tech and explore new ways of leadership.
    </Summary>
    <ContactBlock>
      <Text>Currently Based in Madrid</Text>
      <Text>Made in Murcia</Text>
      <Text>holasoymariasimo@gmail.com</Text>
    </ContactBlock>
    <ContactBlock>
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
    </ContactBlock>
  </Container>
);
