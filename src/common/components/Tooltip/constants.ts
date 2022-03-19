export const animateTooltip = {
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
  exit: {
    scaleY: 0,
    transition: {
      type: 'tween',
      ease: 'linear',
      when: 'afterChildren',
      scaleY: { duration: 0.25 },
    },
  },
};

export const animateText = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { type: 'tween', duration: 0.2 } },
  exit: { opacity: 0, y: -10 },
};
