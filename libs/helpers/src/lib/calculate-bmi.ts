export const calculateBMI = (
  heightInCM: number,
  weightInKG: number,
): number => {
  const height = heightInCM / 100;
  return weightInKG / (height * height);
};
