import Layout from '$/common/layouts/Main';
import Hero from './NoteHero';

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
    </Layout>
  );
}

export default NoteDetailView;
