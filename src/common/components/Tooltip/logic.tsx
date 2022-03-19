import { useCallback, useLayoutEffect, useRef, useState } from 'react';

export default function useLogic() {
  const buttonRef = useRef<HTMLDivElement>(null);

  const baseWidth = 400;
  const tooltipHeight = 180;
  const safetyMargin = 24;
  const [showTooltip, setShowTooltip] = useState(false);
  const [tooltipWidth, setTooltipWidth] = useState(baseWidth);
  const [tooltipPos, setTooltipPos] = useState({
    x: 0,
    y: 0,
  });

  const getTooltipYPlacement = useCallback(() => {
    const buttonClientRect = buttonRef?.current?.getBoundingClientRect();

    return {
      isTopHalf: buttonClientRect
        ? buttonClientRect.top < window.innerHeight / 2
        : false,
    };
  }, []);

  const getTooltipXPlacement = useCallback(() => {
    const buttonClientRect = buttonRef?.current?.getBoundingClientRect();
    if (!buttonClientRect) return { isLeftBound: false, isRightBound: false };

    return {
      isLeftBound: buttonClientRect.left <= safetyMargin,
      isRightBound:
        buttonClientRect.left + tooltipWidth / 2 + safetyMargin >=
        window.innerWidth,
    };
  }, [tooltipWidth]);

  const updateTooltip = useCallback(() => {
    const buttonClientRect = buttonRef?.current?.getBoundingClientRect();
    if (buttonClientRect) {
      const { x: buttonX, y: buttonY } = buttonClientRect;

      const centeredTooltip =
        buttonX + buttonClientRect.width / 2 - tooltipWidth / 2;

      const { isTopHalf } = getTooltipYPlacement();
      const isWindowLessThanWidth =
        window.innerWidth - safetyMargin * 2 <= tooltipWidth;

      let tooltipX = centeredTooltip;
      let tooltipY = buttonY - tooltipHeight;
      let width = tooltipWidth;

      if (!isWindowLessThanWidth) {
        const { isLeftBound, isRightBound } = getTooltipXPlacement();

        if (isLeftBound) {
          tooltipX = buttonX <= safetyMargin ? safetyMargin : 0;
        } else if (isRightBound) {
          const partOfTooltipClipped = width - (window.innerWidth - buttonX);
          tooltipX = buttonX - partOfTooltipClipped - safetyMargin;
        } else {
          tooltipX = centeredTooltip;
        }

        width = tooltipWidth;
      } else {
        width = window.innerWidth - safetyMargin * 2;
        tooltipX = safetyMargin;
      }

      if (isTopHalf) {
        tooltipY = buttonY + safetyMargin;
      } else {
        tooltipY = buttonY - tooltipHeight;
      }

      setTooltipPos({ x: tooltipX, y: tooltipY });
      setTooltipWidth(width);
    }
  }, [tooltipWidth, getTooltipXPlacement, getTooltipYPlacement]);

  useLayoutEffect(() => {
    // debounce
    if (buttonRef?.current) {
      window.addEventListener('resize', updateTooltip);

      // hide on scroll, when scroll is +100 with intersection observer
    }
  }, [updateTooltip]);

  function toggleShowTooltip() {
    updateTooltip();
    setShowTooltip((prev) => !prev);
  }

  return {
    toggleShowTooltip,
    showTooltip,
    tooltipPos,
    tooltipHeight,
    tooltipWidth,
    getTooltipYPlacement,
    buttonRef,
  };
}
