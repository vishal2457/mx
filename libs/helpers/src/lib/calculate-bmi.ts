export const calculateBMI = (
  heightInCM: number,
  weightInKG: number,
): number => {
  if (!heightInCM || !weightInKG) {
    return 0;
  }
  const height = heightInCM / 100;
  return weightInKG / (height * height);
};
