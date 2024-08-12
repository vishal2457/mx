import { exerciseData } from './exersice';

export const bodyPartsData = [
  ...new Set(
    exerciseData.reduce<string[]>((acc, curr) => {
      curr.primaryMuscles.forEach((i) => acc.push(i));
      curr.secondaryMuscles.forEach((i) => acc.push(i));
      return acc;
    }, []),
  ),
].map((item) => {
  return { name: item };
});
