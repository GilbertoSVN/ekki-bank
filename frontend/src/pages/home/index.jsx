import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { BankContext } from '../../context/bankContext';
import { getTransactionsByEmail } from '../../services/connection';
import { formatTime } from '../../utils/formatTime';
import styles from './home.module.scss';

export default function Home({ openModal }) {
  const { account } = useContext(BankContext);
  const [transactions, setTransactions] = useState([]);

  useEffect(async () => {
    const data = await getTransactionsByEmail('gilberto@gilberto.com');

    const newTransactions = data
      .slice()
      .sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );

    setTransactions(newTransactions);
  }, []);

  return (
    <div className={styles.container}>
      <section className={styles.resume}>
        <p>
          Balance:
          <span>
            {account?.balance &&
              Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'usd',
              }).format(account.balance.balance / 100)}
          </span>
        </p>
        <div>
          <p>
            Actual limit:
            <span>
              {account?.balance &&
                Intl.NumberFormat('en-US', {
                  style: 'currency',
                  currency: 'usd',
                }).format(account.balance.limit / 100)}
            </span>
          </p>
          <button type="button" onClick={openModal}>
            Change limit
          </button>
        </div>
      </section>

      <section className={styles.history}>
        <h1>Last transactions</h1>

        <table>
          <thead>
            <tr>
              <th>Type</th>
              <th>Value</th>
              <th>Date</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {transactions &&
              account &&
              transactions.slice(0, 5).map((transaction) => (
                <tr key={transaction.id}>
                  <td>
                    {account.user.id === transaction.received_by
                      ? 'Input'
                      : 'Output'}
                  </td>
                  <td
                    className={
                      account.user.id === transaction.received_by
                        ? styles.inputTransaction
                        : styles.outputTransaction
                    }
                  >
                    {Intl.NumberFormat('en-US', {
                      style: 'currency',
                      currency: 'usd',
                    }).format(transaction.value / 100)}
                  </td>
                  <td>{formatTime(new Date(transaction.createdAt))}</td>
                  <td>{transaction.description}</td>
                </tr>
              ))}
          </tbody>
        </table>
        <Link to="/history">See full history</Link>
      </section>
    </div>
  );
}
