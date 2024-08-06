import {
  DAYS_KEY_VALUE,
  TWorkoutTemplateDetail,
} from '../../../../../../../libs/mx-schema/src';

export const getNextDay = (
  currentDay: TWorkoutTemplateDetail['day'],
  maxDays: number,
): TWorkoutTemplateDetail['day'] => {
  if (!currentDay) {
    return DAYS_KEY_VALUE.day1 as TWorkoutTemplateDetail['day'];
  }

  const daysArray = Object.values(DAYS_KEY_VALUE).slice(0, maxDays);
  const currentIndex = daysArray.indexOf(currentDay);

  if (currentIndex === -1) {
    throw new Error('The current day is not within the specified max days.');
  }

  const nextIndex = (currentIndex + 1) % daysArray.length;
  return daysArray[nextIndex] as TWorkoutTemplateDetail['day'];
};
