import Layout from '$/common/layouts/Main';
import type { BlogPost } from '$/lib/api/posts';
import Hero from './NoteHero';
import Content from './NoteContent';
import {
  Container,
  Contents,
  TableOfContents,
  LinksSection,
  Item,
  Title,
  ArrowLink,
  ContactSection,
  Bold,
  ChatHeart,
  Text,
} from './styles';
import { useRef } from 'react';

function BlogEntryPage({ note }: { note?: BlogPost }): JSX.Element | null {
  const contentRef = useRef<HTMLDivElement>(null);
  if (!note) return null;

  const { title, summary, content, references, backlinks } = note;
  const sections = note.content
    .split('\n## ')
    .map((el) =>
      el.includes('\n') ? el.split('\n')[0].replace(/#/g, '').trim() : '',
    )
    .filter(Boolean);

  return (
    <Layout title={`${title}| María Simó Front—End Developer`}>
      <Hero title={title} summary={summary} contentRef={contentRef} />
      <Container ref={contentRef}>
        <Contents>
          <Content children={content} />
        </Contents>
        <TableOfContents sections={sections} />
      </Container>
      {references.length || backlinks.length ? (
        <LinksSection>
          {references.length ? (
            <Item>
              <Title>References and further reading</Title>
              {references.map(({ label, value }) => (
                <ArrowLink key={value} label={label} link={value} />
              ))}
            </Item>
          ) : null}
          {backlinks.length ? (
            <Item>
              <Title>Backlinks</Title>
              {backlinks?.map(({ title: backlinkTitle, slug }) => (
                <ArrowLink key={slug} label={backlinkTitle} link={slug} />
              ))}
            </Item>
          ) : null}
        </LinksSection>
      ) : null}
      <ContactSection>
        <Item>
          <ChatHeart />
          <Text>
            Tell me what you think. I would love to receive your feedback.
          </Text>
          <Text>
            Would you like to invite me to give a talk about this at your event?
            Is there some topic of your interest you want me to write about?
          </Text>
          <Bold>Drop me a message</Bold>
        </Item>
      </ContactSection>
    </Layout>
  );
}

export default BlogEntryPage;
