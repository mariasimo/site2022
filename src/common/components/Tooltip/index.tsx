import {
  ComponentType,
  ReactNode,
  useCallback,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import { Container, Box } from './styles';
import ButtonIcon from '$/common/components/ButtonIcon';
import InfoIcon from '$/assets/icons/info.svg';
import Portal from '../Portal';

export default function Tooltip({ children }: { children: ReactNode }) {
  const triggerRef = useRef<HTMLDivElement>(null);

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
    const buttonClientRect = triggerRef?.current?.getBoundingClientRect();

    return {
      isTopHalf: buttonClientRect
        ? buttonClientRect.top < window.innerHeight / 2
        : false,
    };
  }, []);

  const getTooltipXPlacement = useCallback(() => {
    const buttonClientRect = triggerRef?.current?.getBoundingClientRect();
    if (!buttonClientRect) return { isLeftBound: false, isRightBound: false };

    return {
      isLeftBound: buttonClientRect.left <= safetyMargin,
      isRightBound:
        buttonClientRect.left + tooltipWidth / 2 + safetyMargin >=
        window.innerWidth,
    };
  }, [tooltipWidth]);

  const updateTooltip = useCallback(() => {
    const buttonClientRect = triggerRef?.current?.getBoundingClientRect();
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
    if (triggerRef?.current) {
      window.addEventListener('resize', updateTooltip);

      // hide on scroll, when scroll is +100 with intersection observer
    }
  }, [updateTooltip]);

  function toggleShowTooltip() {
    updateTooltip();
    setShowTooltip((prev) => !prev);
  }

  const box = {
    hidden: {
      scaleX: 0,
      scaleY: 0,
      transition: {
        type: 'tween',
        ease: 'linear',
        when: 'afterChildren',
      },
    },
    visible: {
      scaleX: [0, 1, 1],
      scaleY: [0, 0, 1],
      transition: {
        type: 'tween',
        ease: 'linear',
        when: 'beforeChildren',
        scaleY: { duration: 0.5 },
        scaleX: { duration: 0.1 },
      },
    },
    exit: ({ direction }: { direction: number }) => ({
      y: -10 * direction,
      transition: {
        type: 'tween',
        ease: 'linear',
        when: 'beforeChildren',
        duration: 0.1,
      },
    }),
  };

  const text = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { type: 'tween', duration: 0.2 } },
  };

  return (
    <Container>
      <div ref={triggerRef}>
        <ButtonIcon
          icon={InfoIcon as ComponentType}
          label="Tooltip info icon"
          onClick={toggleShowTooltip}
        />
      </div>
      <Portal>
        <AnimatePresence>
          {showTooltip && triggerRef.current ? (
            <Box
              key="tooltip"
              $xCoord={tooltipPos.x}
              $yCoord={tooltipPos.y}
              $width={tooltipWidth}
              $height={tooltipHeight}
              variants={box}
              initial="hidden"
              animate="visible"
              exit="exit"
              // change this depending on placement
              // if is in bottom, originY = 0, and exit 10
              style={{
                originX: 0,
                originY: getTooltipYPlacement().isTopHalf ? 0 : 1,
              }}
              custom={{
                direction: getTooltipYPlacement().isTopHalf ? -1 : 1,
              }}
            >
              <motion.div variants={text}>{children}</motion.div>
            </Box>
          ) : null}
        </AnimatePresence>
      </Portal>
    </Container>
  );
}
