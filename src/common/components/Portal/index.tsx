import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import type { ReactNode } from 'react-markdown/lib/react-markdown';

export default function Portal({ children }: { children: ReactNode }) {
  const [isBrowser, setIsBrowser] = useState(false);

  useEffect(() => {
    setIsBrowser(true);
  }, []);

  if (isBrowser) {
    const portalNode = document.getElementById('portal-root');
    return portalNode ? createPortal(children, portalNode) : null;
  }
  return null;
}
