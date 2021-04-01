import { toast } from 'react-toastify';
import { createNewFavored, getUserFavoreds } from '../../services/connection';

export async function newFavored(email, favoredEmail) {
  if (!email && !favoredEmail) {
    toast.error('Invalid parameters');
    return { error: true };
  }

  if (email === favoredEmail) {
    toast.error("Can't favor yourself");
    return { error: true };
  }

  const success = await createNewFavored(email, favoredEmail);

  if (success.status === 400) {
    toast.error(success.message);
    return { error: true };
  }

  const data = await getUserFavoreds(email);

  if (data.status === 400) {
    toast.error(data.message);
    return { error: true };
  }

  toast.success(`${favoredEmail} is now favored by ${email}`);

  return data;
}
