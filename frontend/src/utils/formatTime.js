import { format } from 'date-fns';
import pt from 'date-fns/locale/pt-BR';

export function formatTime(date) {
  return format(date, 'dd/MMM/yy HH:mm:ss', { locale: pt });
}
