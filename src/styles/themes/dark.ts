import base from './base';

const light = {
  name: 'dark',
  ...base,
  colors: {
    paper: '#111',
    ink: '#e1e1e1',
    accent: 'blue',
    interactive: '#ffbc00',
    line: '#707070',
    selectedText: '#afafaf',
    selectedTextBg: '#2a2a2a',
    blockquoteLine: '#c5c5c5',
    blockquoteBg: '#2a2a2a',
    disabledText: '#888',
  },
};

export default light;
