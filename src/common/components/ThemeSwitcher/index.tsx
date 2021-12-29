import type { Theme } from '../../../styles/themes';
import { Container, Circle, Mask } from './styles';

export default function ThemeSwitcher({
  className,
  theme,
  handleClick,
}: {
  className?: string;
  theme: Theme;
  handleClick: () => void;
}) {
  return (
    <Container onClick={handleClick} className={className}>
      <Circle />
      <Mask $isLightTheme={theme.name === 'light'} />
    </Container>
  );
}
