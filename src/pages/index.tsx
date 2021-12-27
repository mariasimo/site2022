import HomeView from '$/home';
import type { InferGetStaticPropsType } from 'next';
import { getAllPostsForHome } from '$/lib/api/posts';
import { getLearningInPublicNode } from '$/lib/api/learningInPublic';

function HomePage({
  allPosts,
  learningInPublicNode,
}: InferGetStaticPropsType<typeof getStaticProps>): JSX.Element {
  return <HomeView posts={allPosts} learningInPublic={learningInPublicNode} />;
}

export default HomePage;

export async function getStaticProps({ preview = false }) {
  const allPosts = (await getAllPostsForHome(preview)) ?? [];

  const learningInPublicNode = (await getLearningInPublicNode(preview)) ?? [];

  return {
    props: { preview, allPosts, learningInPublicNode },
  };
}
