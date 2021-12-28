import React from 'react';
import { externalLinks } from '$/common/utils/links';
import { Container, Copyright, Bold, Text, Link } from './styles';

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
        <Link
          as="a"
          href={externalLinks.cvPath}
          rel="noopener noreferrer"
          target="_blank"
        >
          download my resume
        </Link>{' '}
        or contact me on{' '}
        <Link as="a" href={externalLinks.twitter} target="_blank">
          Twitter
        </Link>{' '}
        or via{' '}
        <Link as="a" href={externalLinks.mail} target="_blank">
          mail
        </Link>
        .
      </Text>
    </Container>
  );
};

export default Footer;
