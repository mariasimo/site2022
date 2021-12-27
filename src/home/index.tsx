import { Container } from './styles';
import Head from 'next/head';

import Header from '$/common/components/Header';
import Footer from '$/common/components/Footer';
import HeroSection from './HeroSection';
import ResumeSection from './ResumeSection';
import BlogSection from './BlogSection';
import type { BlogPost } from '$/lib/api/posts';
import type { LearningInPublicNode } from '$/lib/api/learningInPublic';

function HomeView({
  posts,
  learningInPublic,
}: {
  posts: BlogPost[];
  learningInPublic: LearningInPublicNode;
}): JSX.Element {
  return (
    <Container>
      <Head>
        <title>María Simó Front—End Developer</title>
      </Head>
      <Header />
      <HeroSection />
      <BlogSection posts={posts} learningInPublic={learningInPublic} />
      <ResumeSection />
      <Footer />
    </Container>
  );
}

export default HomeView;
