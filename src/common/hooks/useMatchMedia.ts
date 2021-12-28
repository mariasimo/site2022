import { useEffect, useState } from 'react';
import type { ThemeKey } from '$/styles/themes';

const useMatchMedia = () => {
  const [colorScheme, setColorScheme] = useState<ThemeKey | null>();
  useEffect(() => {
    const mql = window.matchMedia('(prefers-color-scheme: dark)');
    const hasMediaQueryPreference = typeof mql.matches === 'boolean';

    if (hasMediaQueryPreference) {
      setColorScheme(mql.matches ? 'dark' : 'light');
    } else {
      // If they are using a browser/OS that doesn't support
      // color themes, let's default to 'light'.
      setColorScheme('light');
    }
  }, [setColorScheme]);

  if (colorScheme) {
    return colorScheme;
  } else {
    return 'light';
  }
};

export default useMatchMedia;
