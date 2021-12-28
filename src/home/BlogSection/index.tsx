import React from 'react';
import type { BlogPost } from '$/lib/api/posts';
import {
  Container,
  Info,
  PostsList,
  Title,
  LearningContainer,
  Bold,
  BookOpen,
} from './styles';
import { BlogCard } from './BlogPost';
import type { LearningInPublicNode } from '$/lib/api/learningInPublic';
import RichTextRenderer from '$/common/components/RichTextRenderer';

export default function BlogSection({
  posts,
  learningInPublic,
}: {
  posts: BlogPost[];
  learningInPublic: LearningInPublicNode;
}) {
  const { current, next } = learningInPublic;
  return (
    <Container>
      <Info>
        <Title>Learning in public</Title>
        <LearningContainer>
          <BookOpen />
          <RichTextRenderer document={current} options={{ bold: Bold }} />
          <RichTextRenderer document={next} options={{ bold: Bold }} />
        </LearningContainer>
      </Info>
      <PostsList>
        {posts.map((p) => (
          <BlogCard post={p} key={p.id} />
        ))}
      </PostsList>
    </Container>
  );
}
