import { format } from 'date-fns';

export function formatDateToLocal(date: Date): string {
  return format(date, 'yyyy-MM-dd hh:mm:ss a');
}
