export const reduceWorkName = (title: string): string => {
  const words = title.split(' ');
  const abbreviation = words[0][0].toUpperCase() + words[1][0].toUpperCase();
  const number = words[words.length - 1];
  const result = abbreviation + '-' + number;

  return result;
};
