import { addHours } from 'date-fns';

export function addHoursToDate(date: Date, hours: string): Date {
  const intervalHours = parseInt(hours.replace('h', ''), 10);

  return addHours(date, intervalHours);
}
