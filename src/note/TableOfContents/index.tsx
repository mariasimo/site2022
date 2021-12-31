import ArrowLink from './ArrowLink';
import { Container, Title, Section, Links } from './styles';

export default function TableOfContents({
  className,
  sections,
}: {
  className?: string;
  sections: string[];
}) {
  return (
    <Container className={className}>
      {sections.length >= 2 ? (
        <>
          <Title>Table of Contents</Title>
          <div>
            {sections.map((s, idx) => (
              <Section key={`${s}-${idx}`}>{s}</Section>
            ))}
          </div>
        </>
      ) : null}
      <Links>
        <ArrowLink label="Go to Top" link="#" />
        <ArrowLink label="Go Home" link="#" />
      </Links>
    </Container>
  );
}
