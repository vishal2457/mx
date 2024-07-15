export const safeParseInt = (value): number => {
  if (!value) {
    return 0;
  }
  if (typeof value === 'number') {
    return value;
  }
  return parseInt(value);
};
