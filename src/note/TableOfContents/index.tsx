import formatKebabCase from '$/common/utils/formatKebabCase';
import type { MutableRefObject } from 'react';
import ArrowLink from '$/common/components/ArrowLink';
import { Container, Title, Section, Links, AnchorLink } from './styles';
import MarkdownParser from '../../common/components/MarkdownParser';

export default function TableOfContents({
  className,
  sections,
  contentRef,
}: {
  className?: string;
  sections: string[];
  contentRef: MutableRefObject<HTMLDivElement | null>;
}) {
  const handleSmoothScroll = (str: string) => {
    contentRef?.current
      ?.querySelector(`#${formatKebabCase(str)}`)
      ?.scrollIntoView({
        behavior: 'smooth',
      });
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
                  <MarkdownParser children={sectionTitle} />
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
