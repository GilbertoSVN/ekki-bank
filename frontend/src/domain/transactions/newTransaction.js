import { toast } from 'react-toastify';
import {
  createTransaction,
  getBalanceByEmail,
  getTransactionsByEmail,
} from '../../services/connection';

export async function newTransaction(email, receiverEmail, value) {
  if (!email && !receiverEmail && !value) {
    toast.error('Invalid parameters');
    return { error: true };
  }

  const { balance, limit } = await getBalanceByEmail(email);

  let newLimit = +limit;
  let newValue = +value * 100;

  if (value * 100 > +balance + +limit) {
    toast.error('Insufficient found to make transation');
    return { error: true };
  }

  if (value * 100 > balance && value * 100 <= +balance + +limit) {
    // eslint-disable-next-line no-alert
    if (!window.confirm('Insuffient founds. Want to use your limit?')) {
      return { stop: true };
    }

    newLimit += +balance - value * 100;
    newValue = +balance;
  }

  const payload = {
    senderEmail: email,
    receiverEmail,
    value: newValue,
    limit: newLimit,
  };

  const transaction = await createTransaction(payload);
  if (transaction.status === 400) {
    toast.error(transaction.message);
    return { error: true };
  }

  const data = await getTransactionsByEmail(email);
  if (data.status === 400) {
    toast.error(data.message);
    return { error: true };
  }

  toast.success('Transaction made with success');

  return data
    .slice()
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
}
