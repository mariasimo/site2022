import { useState, useEffect, RefObject } from 'react';

type MousePosition = {
  mouseX: number;
  mouseY: number;
};

type Options = { strength: number };

export function useMagnetEffect(
  ref: RefObject<HTMLElement>,
  options?: Options,
) {
  const strength = options?.strength ?? 1;
  const [point, setPoint] = useState({ x: 0, y: 0 });
  const { mouseX, mouseY } = useMousePosition();

  useEffect(() => {
    if (ref.current) {
      const node = ref.current;

      const rect = node.getBoundingClientRect();
      const distanceToTrigger = rect.width * strength;
      const distanceToButtonCenter = distance(
        mouseX + window.scrollX,
        mouseY + window.scrollY,
        rect.left + rect.width / 2,
        rect.top + rect.height / 2,
      );

      if (distanceToButtonCenter < distanceToTrigger) {
        setPoint({
          x: (mouseX + window.scrollX - (rect.left + rect.width / 2)) * 0.2,
          y: (mouseY + window.scrollY - (rect.top + rect.height / 2)) * 0.2,
        });
      } else {
        setPoint({ x: 0, y: 0 });
      }
    }
  }, [mouseX, mouseY, ref, strength]);

  return point;
}

function distance(x1: number, y1: number, x2: number, y2: number) {
  return Math.hypot(x1 - x2, y1 - y2);
}

function useMousePosition() {
  const [mousePosition, setMousePosition] = useState<MousePosition>({
    mouseX: 0,
    mouseY: 0,
  });

  const updateMousePosition = (event: MouseEvent) => {
    setMousePosition({ mouseX: event.clientX, mouseY: event.clientY });
  };

  useEffect(() => {
    window.addEventListener('mousemove', updateMousePosition);
    return () => window.removeEventListener('mousemove', updateMousePosition);
  }, []);

  return mousePosition;
}
