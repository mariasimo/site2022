import type { ComponentType, ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import { Container, Box } from './styles';
import ButtonIcon from '$/common/components/ButtonIcon';
import InfoIcon from '$/assets/icons/info.svg';
import Portal from '../Portal';
import useLogic from './logic';

import { animateText, animateTooltip } from './constants';

export default function Tooltip({ children }: { children: ReactNode }) {
  const {
    toggleShowTooltip,
    showTooltip,
    tooltipWidth,
    tooltipHeight,
    tooltipPos,
    getTooltipYPlacement,
    buttonRef,
  } = useLogic();

  return (
    <Container>
      <div ref={buttonRef}>
        <ButtonIcon
          icon={InfoIcon as ComponentType}
          label="Tooltip info icon"
          onClick={toggleShowTooltip}
        />
      </div>
      <Portal>
        <AnimatePresence>
          {showTooltip && buttonRef.current ? (
            <Box
              key="tooltip"
              $xCoord={tooltipPos.x}
              $yCoord={tooltipPos.y}
              $width={tooltipWidth}
              $height={tooltipHeight}
              variants={animateTooltip}
              initial="hidden"
              animate="visible"
              exit="exit"
              style={{
                originX: 0,
                originY: getTooltipYPlacement().isTopHalf ? 0 : 1,
              }}
              custom={{
                direction: getTooltipYPlacement().isTopHalf ? -1 : 1,
              }}
            >
              <motion.div variants={animateText}>{children}</motion.div>
            </Box>
          ) : null}
        </AnimatePresence>
      </Portal>
    </Container>
  );
}
