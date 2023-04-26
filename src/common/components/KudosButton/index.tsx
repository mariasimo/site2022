import { Container, Button, Emoji, Text } from './styles';

export const KudosButton = ({
  onClick,
  kudosCount,
}: {
  onClick: () => void;
  kudosCount: number;
}) => {
  return (
    <Container>
      <Button onClick={onClick}>
        <Emoji role="img" aria-label="clap">
          👏
        </Emoji>
      </Button>
      <Text>{kudosCount}</Text>
    </Container>
  );
};
