import type { ThemeKey } from '$/styles/themes';
import { Button, SunAndMoon } from './styles';

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
    <Button
      onClick={handleClick}
      className={className}
      title="Toggles light & dark"
      aria-label="auto"
      aria-live="polite"
    >
      <SunAndMoon $isLightTheme={themeName === 'light'} />
    </Button>
  );
}
