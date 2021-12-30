import ArrowLink from './ArrowLink';
import { Container, Title, Section, Links } from './styles';

const sections = [
  'Introduction',
  'Authentication',
  'Authorization',
  'JWT',
  'Refresh Tokens',
  'Authz Flows',
  'Auth0',
  'Examples',
  'Conclusion',
];
export default function TableOfContents({ className }: { className?: string }) {
  return (
    <Container className={className}>
      <Title>Table of Contents</Title>
      <div>
        {sections.map((s, idx) => (
          <Section key={`${s}-${idx}`}>{s}</Section>
        ))}
      </div>
      <Links>
        <ArrowLink label="Go to Top" link="#" />
        <ArrowLink label="Go Home" link="#" />
      </Links>
    </Container>
  );
}
