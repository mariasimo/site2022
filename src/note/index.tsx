import Layout from '$/common/layouts/Main';
import type { BlogPost } from '$/lib/api/posts';
import Hero from './NoteHero';
import Content from './NoteContent';
import { Container, TableOfContents } from './styles';

function BlogEntryPage({ note }: { note?: BlogPost }): JSX.Element | null {
  if (!note) return null;

  const { title, summary, content } = note;
  return (
    <Layout title={'Title'}>
      <Hero title={title} summary={summary} />
      <Container>
        <Content children={content} />

        <TableOfContents />
      </Container>
    </Layout>
  );
}

export default BlogEntryPage;
