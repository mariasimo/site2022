import formatKebabCase from '$/common/utils/formatKebabCase';
import type { MutableRefObject } from 'react';
import ArrowLink from '$/common/components/ArrowLink';
import { Container, Title, Section, Links, AnchorLink } from './styles';
import { useRouter } from 'next/router';

export default function TableOfContents({
  className,
  sections,
  contentRef,
}: {
  className?: string;
  sections: string[];
  contentRef: MutableRefObject<HTMLDivElement | null>;
}) {
  const { replace, ...query } = useRouter();

  const handleSmoothScroll = (str: string) => {
    const nonAlphaNumericCharsButDash = new RegExp(/([^\w -]|_)/g);

    const sectionId = `#${formatKebabCase(
      str.replace(nonAlphaNumericCharsButDash, ''),
    )}`;
    contentRef?.current?.querySelector(sectionId)?.scrollIntoView({
      behavior: 'smooth',
    });

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
      <Links>
        <ArrowLink label="Go to Top" link="#" backlink />
        <ArrowLink label="Go Home" link="/" backlink />
      </Links>
    </Container>
  );
}
