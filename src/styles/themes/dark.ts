import base from './base';

const light = {
  name: 'dark',
  ...base,
  colors: {
    paper: '#111',
    ink: '#e1e1e1',
    accent: 'blue',
    interactive: '#ffbc00',
    selectedText: '#afafaf',
    selectedTextBg: '#2a2a2a',
  },
};

export default light;