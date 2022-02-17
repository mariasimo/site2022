import { Mask, Container } from './styles';
import type { Props, SlidePosition } from './types';
import getPosition from './utils';

const container = {
  hidden: ({ slideValue, from }: SlidePosition) => {
    const initialPos = getPosition({ slideValue, from });
    return {
      ...initialPos,
      opacity: 0,
    };
  },
  visible: ({ from }: { from: SlidePosition['from'] }) => {
    const finalPos = getPosition({ slideValue: 0, from });

    return {
      ...finalPos,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: 'easeOut',
        delay: 1.2,
      },
    };
  },
};

const FadeInBlock = ({
  children,
  slideValue = 0,
  from = 'top',
  className,
}: Props) => (
  <Mask>
    <Container
      initial="hidden"
      animate="visible"
      variants={container}
      custom={{ slideValue, from }}
      className={className}
    >
      {children}
    </Container>
  </Mask>
);

export default FadeInBlock;
