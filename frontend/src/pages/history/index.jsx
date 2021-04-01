import { useContext, useState, useEffect } from 'react';
import { IoCaretForward, IoCaretBack } from 'react-icons/io5';
import { BankContext } from '../../context/bankContext';
import { getTransactionsByEmail } from '../../services/connection';
import { formatTime } from '../../utils/formatTime';
import styles from './history.module.scss';

export default function History({ openModal }) {
  const { account } = useContext(BankContext);
  const [option, setOption] = useState('all');
  const [pagination, setPagination] = useState(1);
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

  function paginationButtons() {
    if (!transactions) return [];

    const pages = [];

    for (let i = 0; i < transactions.length / 10; i++) {
      pages.push(i + 1);
    }

    return pages;
  }

  const handleSelectOption = (ev) => {
    setOption(ev.target.value);
  };

  const handleNextPage = () => {
    if (pagination === parseInt(transactions.length / 10, 10)) return;
    setPagination(pagination + 1);
  };

  const handleBackPage = () => {
    if (pagination === 1) return;
    setPagination(pagination - 1);
  };

  return (
    <div className={styles.container}>
      <section className={styles.history}>
        <div>
          <label htmlFor="type">
            Transaction type:
            <select
              name="type"
              defaultValue="all"
              onChange={(ev) => handleSelectOption(ev)}
            >
              <option value="all">All</option>
              <option value="receivedBy">Input</option>
              <option value="sendedBy">Output</option>
            </select>
          </label>

          <button type="button" onClick={openModal}>
            New transaction
          </button>
        </div>

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
              transactions
                .filter((transaction) => {
                  if (option === 'all') return transaction;

                  if (option === 'receivedBy')
                    return transaction.received_by === account.user.id;
                  return transaction.sended_by === account.user.id;
                })
                .slice(10 * (pagination - 1), 10 * pagination)
                .map((transaction) => (
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

        {transactions.length && (
          <div className={styles.pages}>
            <div className={styles.navigation}>
              <IoCaretBack onClick={handleBackPage} />
            </div>
            {paginationButtons().map((item) => (
              <button
                type="button"
                key={item}
                className={item === pagination ? styles.activePage : null}
                onClick={() => setPagination(item)}
              >
                {item}
              </button>
            ))}
            <div className={styles.navigation}>
              <IoCaretForward onClick={handleNextPage} />
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
