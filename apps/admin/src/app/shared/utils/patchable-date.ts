export const patchableDate = (date: string | Date | null = null): string => {
  const d = date ? new Date(date) : new Date();
  return d.toISOString().substring(0, 10);
};
