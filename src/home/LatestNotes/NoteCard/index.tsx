import { Container, Title, DateText, Header, Arrow } from './styles';

export default function NoteCard({
  note,
}: {
  note: { slug: string; title: string };
}) {
  const { title } = note;

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
