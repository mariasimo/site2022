import HomeView from '$/home';
import type { InferGetStaticPropsType } from 'next';
import { getAllPostsForHome } from '$/lib/api';

function HomePage({
  allPosts,
}: InferGetStaticPropsType<typeof getStaticProps>): JSX.Element {
  return <HomeView posts={allPosts} />;
}

export default HomePage;

export async function getStaticProps({ preview = false }) {
  const allPosts = (await getAllPostsForHome(preview)) ?? [];

  return {
    props: { preview, allPosts },
  };
}
