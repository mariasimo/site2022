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
import RevealedText from './RevealedText';
import FadeInBlock from '$/common/components/FadeInBlock';
import { motion } from 'framer-motion';

const leadText = [
  { style: LeadBold, text: 'María Simó' },
  {
    text: 'Front—end developer. Sharp and passionate individual coding since 2019. I’m big on clean and expressive code, design systems, polished layouts and fine—grained interactions & animations.',
  },
];

const container = {
  hidden: {
    y: 100,
  },
  visible: {
    y: 0,
    transition: {
      duration: 2,
      ease: [0.455, 0.03, 0.515, 0.955],
    },
  },
};

export default function HomeHero() {
  return (
    <Container>
      <motion.div initial="hidden" animate="visible" variants={container}>
        <Lead>
          {leadText.map((part, index) => (
            <RevealedText content={part} key={index} />
          ))}
        </Lead>
      </motion.div>
      <FadeInBlock slideValue={50}>
        <Summary>
          As a <SummaryBold>developer</SummaryBold>, I want to grow
          horizontally, expanding myself towards adjacent areas to become a
          well-rounded specialist and a better team player. As a{' '}
          <SummaryBold>former designer</SummaryBold>, I want to champion the
          work of all my mates into the final product the client ends up
          interacting with. As a <SummaryBold>woman</SummaryBold>, I want to
          inspire others to follow a career in tech and explore new ways of
          leadership.
        </Summary>
      </FadeInBlock>
      <Column>
        <FadeInBlock slideValue={50}>
          <ContactBlock />
        </FadeInBlock>
      </Column>
      <Column>
        <FadeInBlock slideValue={50}>
          <SocialBlock />
        </FadeInBlock>
      </Column>
    </Container>
  );
}
