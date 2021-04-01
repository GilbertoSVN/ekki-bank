import { toast } from 'react-toastify';
import { getUserAccount, updateBalance } from '../../services/connection';

export async function changeLimit(email, payload) {
  const { id, limit, totalLimit, maxLimit, savedLimit, balance } = payload;

  if (+totalLimit > +maxLimit) {
    toast.error("Limit can't be higher than your max limit");
    return { error: true };
  }

  const success = updateBalance({
    id,
    limit,
    totalLimit: +totalLimit,
    savedLimit: +savedLimit,
    balance,
  });

  if (success.status === 400) {
    toast.error(success.message);
    return { error: true };
  }

  const account = await getUserAccount(email);

  if (account.status === 400) {
    toast.error(account.message);
    return { error: true };
  }

  return account.balance;
}
