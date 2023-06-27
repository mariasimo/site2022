export const sortAlphabetical = <T extends string[]>(list: T) => {
  return list.sort((a, b) => a.localeCompare(b));
};
