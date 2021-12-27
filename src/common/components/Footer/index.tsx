import React from 'react';
import { Container, Copyright, Bold, Text, Link } from './styles';

const CV_PATH = '/files/maria-simo-cv-2022.pdf';
const TWITTER_LINK = 'https://twitter.com/mariasimocodes';
const MAIL = 'holasoymariasimo@gmail.com';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <Container>
      <Copyright>
        <Bold>© {currentYear}</Bold>
      </Copyright>
      <Text>
        I’m <Bold>available for freelance projects</Bold> on a case-by-case
        basis. You can{' '}
        <Link as="a" href={CV_PATH} rel="noopener noreferrer" target="_blank">
          download my resume
        </Link>{' '}
        or contact me on{' '}
        <Link as="a" href={TWITTER_LINK} target="_blank">
          Twitter
        </Link>{' '}
        or via{' '}
        <Link
          as="a"
          href={`mailto:${MAIL}?subject=Let's%20Talk!`}
          target="_blank"
        >
          mail
        </Link>
        .
      </Text>
    </Container>
  );
};

export default Footer;
