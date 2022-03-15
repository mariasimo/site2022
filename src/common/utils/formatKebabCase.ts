const formatKebabCase = (text: string) =>
  text.toLowerCase().split(' ').join('-');

export default formatKebabCase;
