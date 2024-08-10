export const calculateBMI = (
  heightInCM: string,
  weightInKG: string,
): number => {
  if (!heightInCM || !weightInKG) {
    return 0;
  }
  const height = parseFloat(heightInCM) / 100;
  return parseFloat(weightInKG) / (height * height);
};
