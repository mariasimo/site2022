import SocialBlock from '$/common/components/SocialBlock';
import ContactBlock from '$/common/components/ContactBlock';
import {
  Container,
  Lead,
  LeadBold,
  Summary,
  SummaryBold,
  Column,
} from './styles';

export default function HeroSection() {
  return (
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
        <SummaryBold>former designer</SummaryBold>, I want to champion the work
        of all my mates into the final product the client ends up interacting
        with. As a <SummaryBold>woman</SummaryBold>, I want to inspire others to
        follow a career in tech and explore new ways of leadership.
      </Summary>
      <Column>
        <ContactBlock />
      </Column>
      <Column>
        <SocialBlock />
      </Column>
    </Container>
  );
}
