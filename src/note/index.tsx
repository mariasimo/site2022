import Layout from '$/common/layouts/Main';
import Hero from './Hero';
import Content from './Content';
import NoteLinks from './LinkList';
import {
  Container,
  Contents,
  TableOfContents,
  LinksSection,
  Item,
  Title,
  ContactSection,
  Bold,
  ChatHeart,
  Text,
} from './styles';
import { useRef } from 'react';
import type { Note } from '$/common/utils/notes';
import { externalLinks } from '$/common/utils/links';

function NoteView({ note }: { note?: Note }): JSX.Element | null {
  const contentRef = useRef<HTMLDivElement>(null);
  if (!note) return null;

  const {
    title,
    summary,
    content,
    references,
    backlinks,
    published,
    lastUpdated,
    translations,
    socialImage,
    status,
    metaDescription,
    metaTitle,
    otherNotesLinks,
  } = note;

  const sections = note.content
    .split('\n## ')
    .map((el) =>
      el.includes('\n') ? el.split('\n')[0].replace(/#/g, '').trim() : '',
    )
    .filter(Boolean);

  return (
    <Layout title={`${title} | María Simó Front—End Developer`}>
      <Hero
        title={title}
        summary={summary}
        contentRef={contentRef}
        published={published}
        lastUpdated={lastUpdated}
        translations={translations}
        status={status}
        socialImage={socialImage}
        metaTitle={metaTitle}
        metaDescription={metaDescription}
      />
      <Container ref={contentRef}>
        <Contents>
          <Content children={content} />
        </Contents>
        <TableOfContents sections={sections} />
      </Container>
      {references || backlinks ? (
        <LinksSection>
          {references ? (
            <Item>
              <Title>References and further reading</Title>
              <NoteLinks children={references} />
            </Item>
          ) : null}
          {backlinks ? (
            <Item>
              <Title>Backlinks</Title>
              <NoteLinks children={backlinks} />
            </Item>
          ) : null}
          {!backlinks && otherNotesLinks ? (
            <Item>
              <Title>Keep exploring</Title>
              <NoteLinks children={otherNotesLinks} />
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
          <Bold>
            <a href={externalLinks.sendDM} target="_blank">
              Drop me a message
            </a>
          </Bold>
        </Item>
      </ContactSection>
    </Layout>
  );
}

export default NoteView;
