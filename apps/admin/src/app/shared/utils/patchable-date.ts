export const patchableDate = (date = null): string => {
  const d = date ? new Date(date) : new Date();
  return d.toISOString().substring(0, 10);
};
