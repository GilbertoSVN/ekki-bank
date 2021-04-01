import { toast } from 'react-toastify';
import {
  getUserByID,
  getUserFavoreds,
  removeFavored,
} from '../../services/connection';

export async function deleteFavored(userId, favoredId) {
  if (!userId && !favoredId) {
    toast.error('Invalid parameters');
    return { error: true };
  }

  if (userId === favoredId) {
    toast.error("Can't delete yourself");
    return { error: true };
  }

  const success = await removeFavored(userId, favoredId);

  if (success.status === 400) {
    toast.error(success.message);
    return { error: true };
  }

  const { email } = await getUserByID(userId);

  const data = await getUserFavoreds(email);

  if (data.status === 400) {
    toast.error(data.message);
    return { error: true };
  }

  toast.success('Deleted favored successfully');
  return data;
}
