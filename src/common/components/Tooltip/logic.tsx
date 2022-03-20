import {
  RefObject,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import { debounce } from 'debounce';

export default function useLogic() {
  const buttonRef = useRef<HTMLDivElement>(null);

  const baseWidth = 400;
  const maxTooltipHeight = 180;
  const safetyMargin = 24;
  const [isInit, setInit] = useState(false);
  const [showTooltip, setShowTooltip] = useState(true);
  const [tooltipWidth, setTooltipWidth] = useState(baseWidth);
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
      isLeftBound: buttonClientRect.left <= safetyMargin,
      isRightBound:
        buttonClientRect.left + tooltipWidth / 2 + safetyMargin >=
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
        window.innerWidth - safetyMargin * 2 <= tooltipWidth;
      const { isTopHalf } = getTooltipYPlacement();

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
        tooltipY = buttonY - tooltipHeight - safetyMargin / 2;
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

  function toggleShowTooltip() {
    updateTooltip();
    setShowTooltip((prev) => !prev);
  }

  return {
    toggleShowTooltip,
    showTooltip,
    tooltipPos,
    maxTooltipHeight,
    tooltipWidth,
    getTooltipYPlacement,
    buttonRef,
    initTooltip,
    isInit,
  };
}
