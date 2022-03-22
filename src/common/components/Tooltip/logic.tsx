import { useCallback, useLayoutEffect, useRef, useState } from 'react';
import { debounce } from 'debounce';
import useOnClickOutside from '$/common/hooks/useOnClickOutside';
import { SAFETY_MARGIN, TOOLTIP_MAX_HEIGHT, TOOLTIP_WIDTH } from './constants';

export default function useLogic() {
  const buttonRef = useRef<HTMLDivElement>(null);
  const containerTooltip = useRef<HTMLDivElement>(null);

  const [isInit, setInit] = useState(false);
  const [showTooltip, setShowTooltip] = useState(true);
  const [tooltipWidth, setTooltipWidth] = useState(TOOLTIP_WIDTH);
  const [tooltipHeight, setTooltipHeight] = useState(0);
  const [tooltipPos, setTooltipPos] = useState({
    x: 0,
    y: 0,
  });

  function initTooltip(el: HTMLSpanElement) {
    if (el && !isInit) {
      setTooltipHeight(el?.clientHeight);
      setInit(true);
      setShowTooltip(false);
    }
  }

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
      isLeftBound: buttonClientRect.left <= SAFETY_MARGIN,
      isRightBound:
        buttonClientRect.left + tooltipWidth / 2 + SAFETY_MARGIN >=
        window.innerWidth,
    };
  }, [tooltipWidth]);

  const updateTooltip = useCallback(() => {
    const buttonClientRect = buttonRef?.current?.getBoundingClientRect();
    if (buttonClientRect) {
      const { x: buttonX, top: buttonY } = buttonClientRect;

      const centeredTooltip =
        buttonX + buttonClientRect.width / 2 - tooltipWidth / 2;

      const isWindowLessThanWidth =
        window.innerWidth - SAFETY_MARGIN * 2 <= tooltipWidth;
      const { isTopHalf } = getTooltipYPlacement();

      let tooltipX = centeredTooltip;
      let tooltipY = buttonY - tooltipHeight;
      let width = tooltipWidth;

      if (!isWindowLessThanWidth) {
        const { isLeftBound, isRightBound } = getTooltipXPlacement();

        if (isLeftBound) {
          tooltipX = buttonX <= SAFETY_MARGIN ? SAFETY_MARGIN : 0;
        } else if (isRightBound) {
          const partOfTooltipClipped = width - (window.innerWidth - buttonX);
          tooltipX = buttonX - partOfTooltipClipped - SAFETY_MARGIN;
        } else {
          tooltipX = centeredTooltip;
        }

        width = tooltipWidth;
      } else {
        width = window.innerWidth - SAFETY_MARGIN * 2;
        tooltipX = SAFETY_MARGIN;
      }

      if (isTopHalf) {
        tooltipY = buttonY + SAFETY_MARGIN;
      } else {
        tooltipY = buttonY - tooltipHeight - SAFETY_MARGIN / 2;
      }

      setTooltipPos({ x: tooltipX, y: tooltipY });
      setTooltipWidth(width);
    }
  }, [tooltipWidth, getTooltipXPlacement, getTooltipYPlacement, tooltipHeight]);

  useLayoutEffect(() => {
    if (buttonRef?.current) {
      const updateOnResize = debounce(updateTooltip, 100, false);

      const updateOnScroll = debounce(() => setShowTooltip(false), 25, true);

      if (showTooltip) {
        window.addEventListener('resize', updateOnResize);
        window.addEventListener('scroll', updateOnScroll);
      }

      return () => {
        window.removeEventListener('resize', updateOnResize);
        window.removeEventListener('scroll', updateOnScroll);
      };
    }

    return () => null;
  }, [updateTooltip, showTooltip]);

  useOnClickOutside(containerTooltip, () => setShowTooltip(false));

  function toggleShowTooltip() {
    updateTooltip();
    setShowTooltip((prev) => !prev);
  }

  return {
    toggleShowTooltip,
    showTooltip,
    tooltipPos,
    maxTooltipHeight: TOOLTIP_MAX_HEIGHT,
    tooltipWidth,
    getTooltipYPlacement,
    buttonRef,
    initTooltip,
    isInit,
    containerTooltip,
  };
}
