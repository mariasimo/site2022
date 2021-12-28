import { Container, Circle, Mask } from './styles';

export default function ThemeSwitcher({
  className,
  theme,
  handleClick,
}: {
  className?: string;
  theme: string;
  handleClick: () => void;
}) {
  return (
    <Container
      onClick={handleClick}
      $isLightTheme={theme === 'light'}
      className={className}
    >
      <Circle />
      <Mask $isLightTheme={theme === 'light'} />
    </Container>
  );
}
