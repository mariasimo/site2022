import type { SlidePosition } from './types';

const getPosition = ({ slideValue, from }: SlidePosition) => {
  const object: { x?: number; y?: number } = {};

  if (from === 'top' || from === 'bottom') {
    const sense = from === 'top' ? 1 : -1;
    object.y = slideValue > 0 ? slideValue * sense : 0;
  }
  if (from === 'left' || from === 'right') {
    const sense = from === 'right' ? 1 : -1;
    object.x = slideValue > 0 ? slideValue * sense : 0;
  }

  return object;
};

export default getPosition;
