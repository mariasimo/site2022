import Layout from '$/common/layouts/Main';
import Hero from './NoteHero';
import {
  Container,
  Contents,
  Content,
  Section,
  Title,
  Text,
  TableOfContents,
  Image,
} from './styles';

const summary = (
  <>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut a blandit neque.
    Nam non turpis ac diam tristique mattis sit amet non eros. Integer viverra
    enim pellentesque metus ultrices, sed sagittis elit consectetur. Quisque
    pharetra et erat sit amet feugiat. Fusce ullamcorper nisl vel ex consequat
    scelerisque.
  </>
);

const title = (
  <>
    Authn & Authz.
    <br /> The good, the bad and the ugly
  </>
);

function NoteDetailView(): JSX.Element {
  return (
    <Layout title={'Title'}>
      <Hero title={title} summary={summary} />
      <Container>
        <Contents>
          <Section>
            <Title>Authentication and authorizacion</Title>
            <Content>
              <Text>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut a
                blandit neque. Nam non turpis ac diam tristique mattis sit amet
                non eros. Integer viverra enim pellentesque metus ultrices, sed
                sagittis elit consectetur. Quisque pharetra et erat sit amet
                feugiat. Fusce ullamcorper nisl vel ex consequat scelerisque.
                Maecenas viverra accumsan ligula, id finibus enim luctus non.
                Suspendisse at suscipit orci. Nullam justo diam, vulputate at
                malesuada at, porttitor sed dui. Aliquam sed sagittis velit, eu
                elementum dolor. Suspendisse elit ipsum, gravida at laoreet
                eget, ultrices id enim.{' '}
              </Text>
            </Content>
            <Image src="test.png" />
          </Section>
        </Contents>
        <TableOfContents />
      </Container>
    </Layout>
  );
}

export default NoteDetailView;
