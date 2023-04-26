import formatKebabCase from '$/common/utils/formatKebabCase';
import ArrowLink from '$/common/components/ArrowLink';
import { Container, Title, Section, Links, AnchorLink, Footer } from './styles';
import { useRouter } from 'next/router';
import { Props } from './types';

export default function TableOfContents({ className, sections }: Props) {
  const { replace, ...query } = useRouter();

  const handleSmoothScroll = (str: string) => {
    const nonAlphaNumericCharsButDash = new RegExp(/([^\w -]|_)/g);

    const sectionId = `#${formatKebabCase(
      str.replace(nonAlphaNumericCharsButDash, ''),
    )}`;
    void replace({ ...query, hash: sectionId });
  };

  return (
    <Container className={className}>
      {sections.length >= 2 ? (
        <>
          <Title>Table of Contents</Title>
          <div>
            {sections.map((sectionTitle, idx) => (
              <Section key={`${sectionTitle}-${idx}`}>
                <AnchorLink onClick={() => handleSmoothScroll(sectionTitle)}>
                  {sectionTitle}
                </AnchorLink>
              </Section>
            ))}
          </div>
        </>
      ) : null}
      <Footer>
        <Links>
          <ArrowLink label="Go to Top" link="#" backlink />
          <ArrowLink label="Go Home" link="/" backlink />
        </Links>
      </Footer>
    </Container>
  );
}
