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

function BlogEntryPage({ note }: { note?: BlogPost }): JSX.Element | null {
  if (!note) return null;

  const { title, summary, content, references, backlinks } = note;

  return (
    <Layout title={'Title'}>
      <Hero title={title} summary={summary} />
      <Container>
        <Contents>
          <Content children={content} />
        </Contents>

        <TableOfContents />
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
