import React from 'react';
import {
  Container,
  Info,
  PostsList,
  Title,
  LearningContainer,
  Bold,
  BookOpen,
} from './styles';
import NoteCard from './NoteCard';
import type { NoteCard as NoteCardType } from '$/common/utils/notes';

export default function Blog({
  notes,
  learningInPublic,
}: {
  notes: NoteCardType[];
  learningInPublic: { current: string; next: string };
}) {
  const { current, next } = learningInPublic;
  return (
    <Container>
      <Info>
        <Title>Learning in public</Title>
        <LearningContainer>
          <BookOpen />
          <p>
            <Bold>Right Now</Bold> {current}
          </p>
          <p>
            <Bold>Looking forward to</Bold> {next}
          </p>
        </LearningContainer>
      </Info>
      <PostsList>
        {notes.map((note) => (
          <NoteCard note={note} key={note.slug} />
        ))}
      </PostsList>
    </Container>
  );
}
