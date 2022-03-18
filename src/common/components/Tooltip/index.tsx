import { ComponentType, ReactNode, useEffect, useRef, useState } from 'react';
import { Container, Box } from './styles';
import ButtonIcon from '$/common/components/ButtonIcon';
import InfoIcon from '$/assets/icons/info.svg';

export default function Tooltip({ children }: { children: ReactNode }) {
  // Add portal
  // Calc position and width
  // Get parent node, add position relative
  // Magnetic effect to cursor while open

  // On open, animate box from bottom to top (or corner to corner), then fade in text
  // Close on click outside
  // Close on scroll
  // Close if icon is not in viewport

  // p descendant of p error will be fix when this is a portal

  // calc tooltipHeight dinamically with maxHeight and pretty scrollbar

  const triggerRef = useRef<HTMLDivElement>(null);
  const [showTooltip, setShowTooltip] = useState(false);
  const baseWidth = 400;
  const [tooltipWidth, setTooltipWidth] = useState(baseWidth);
  const tooltipHeight = 200;
  const safetyMargin = 24;
  const [tooltipPosition, setTooltipPosition] = useState({
    x: -tooltipWidth / 2,
    y: safetyMargin,
  });

  const toggleShowTooltip = () => {
    if (triggerRef?.current) {
      const buttonClientRect = triggerRef?.current?.getBoundingClientRect();

      // extract this into a function and attach it to a resize window event
      let newX = tooltipPosition.x;
      let newY = tooltipPosition.y;
      let newWidth = tooltipWidth;

      // calcs when window is < tooltipWidth + margin * 2
      if (window.innerWidth - safetyMargin * 2 <= newWidth) {
        newWidth = window.innerWidth - safetyMargin * 2;
      } else {
        newWidth = baseWidth;
      }

      if (buttonClientRect.left - newX < 0) {
        // if button position have enough margin, place box in same x, otherwise add safety margin
        newX = buttonClientRect.left >= safetyMargin ? 0 : safetyMargin;
      }
      if (buttonClientRect.left + newWidth - newX > window.innerWidth) {
        newX =
          -(newWidth / 2) -
          (buttonClientRect.left + newWidth / 2 - window.innerWidth) -
          safetyMargin;
      }
      if (buttonClientRect.top - tooltipHeight - safetyMargin < 0) {
        newY = safetyMargin;
      }
      if (
        buttonClientRect.top + tooltipHeight + safetyMargin * 2 >
        window.innerHeight
      ) {
        newY = -tooltipHeight - safetyMargin / 2;
      }

      setTooltipWidth(newWidth);
      setTooltipPosition({ x: newX, y: newY });
      setShowTooltip((prev) => !prev);
    }
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
      {showTooltip ? (
        <Box
          $xCoord={tooltipPosition.x}
          $yCoord={tooltipPosition.y}
          $width={tooltipWidth}
          $height={tooltipHeight}
        >
          {children}
        </Box>
      ) : null}
    </Container>
  );
}
