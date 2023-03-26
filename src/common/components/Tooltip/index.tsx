import type { ComponentType, ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import { Container, Box } from './styles';
import ButtonIcon from '$/common/components/ButtonIcon';
import InfoIcon from '$/assets/icons/info.svg';
import Portal from '$/common/components/Portal';
import useLogic from './logic';

import { animateText, animateTooltip } from './constants';

export default function Tooltip({ children }: { children: ReactNode }) {
  const {
    toggleShowTooltip,
    showTooltip,
    tooltipWidth,
    maxTooltipHeight,
    tooltipPos,
    getTooltipYPlacement,
    buttonRef,
    initTooltip,
    containerTooltip,
    isInit,
  } = useLogic();

  return (
    <Container>
      <span ref={buttonRef}>
        <ButtonIcon
          icon={InfoIcon as ComponentType}
          label="Tooltip info icon"
          onClick={toggleShowTooltip}
        />
      </span>
      <Portal>
        <AnimatePresence>
          {showTooltip ? (
            <div ref={containerTooltip}>
              <Box
                ref={initTooltip}
                key="tooltip"
                $xCoord={tooltipPos.x}
                $yCoord={tooltipPos.y}
                $width={tooltipWidth}
                $maxHeight={maxTooltipHeight}
                variants={animateTooltip}
                initial={isInit ? 'hidden' : 'noInit'}
                animate="visible"
                exit="exit"
                style={{
                  originX: 0,
                  originY: getTooltipYPlacement().isTopHalf ? 0 : 1,
                }}
              >
                <motion.div variants={animateText}>{children}</motion.div>
              </Box>
            </div>
          ) : null}
        </AnimatePresence>
      </Portal>
    </Container>
  );
}
