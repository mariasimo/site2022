import type { ThemeKey } from '$/styles/themes';
import { Container, Circle, Mask } from './styles';

export default function ThemeSwitcher({
  className,
  themeName,
  handleClick,
}: {
  className?: string;
  themeName: ThemeKey;
  handleClick: () => void;
}) {
  return (
    <Container
      onClick={handleClick}
      $isLightTheme={themeName === 'light'}
      className={className}
    >
      <Circle />
      <Mask $isLightTheme={themeName === 'light'} />
    </Container>
  );
}
