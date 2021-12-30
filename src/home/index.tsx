import Hero from './HomeHero';
import Resume from './Resume';
import Blog from './Blog';
import type { BlogPost } from '$/lib/api/posts';
import type { LearningInPublicNode } from '$/lib/api/learningInPublic';
import Layout from '$/common/layouts/Main';

function HomeView({
  posts,
  learningInPublic,
}: {
  posts: BlogPost[];
  learningInPublic: LearningInPublicNode;
}): JSX.Element {
  return (
    <Layout title="María Simó Front—End Developer">
      <Hero />
      <Blog posts={posts} learningInPublic={learningInPublic} />
      <Resume />
    </Layout>
  );
}

export default HomeView;
