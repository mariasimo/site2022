import type { BlogPost } from '$/lib/api/posts';
import { Container, Title, DateText, Header, Arrow } from './styles';

export function BlogCard({ post }: { post: BlogPost }) {
  const { title } = post;

  return (
    <Container>
      <Header>
        <Title>{title}</Title>
        <Arrow />
      </Header>
      <DateText>Coming soon</DateText>
    </Container>
  );
}
