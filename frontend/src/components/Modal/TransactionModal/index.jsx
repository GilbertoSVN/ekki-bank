import { useState } from 'react';
import Modal from 'react-modal';
import { FiX } from 'react-icons/fi';

import styles from './transactionModal.module.scss';
import { getUserAccount } from '../../../services/connection';
import { newTransaction } from '../../../domain/transactions/newTransaction';

export function TransactionModal({ isOpen, onRequestClose }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [currency, setCurrency] = useState('');

  async function handleSubmit(ev) {
    ev.preventDefault();

    await newTransaction('gilberto@gilberto.com', email, currency);

    setName('');
    setEmail('');
    setPhone('');
    setCurrency('');

    onRequestClose();
  }

  async function handleSearchEmail(value) {
    const data = await getUserAccount(value);

    setName(data.user.name);
    setPhone(data.user.phone);
  }

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      overlayClassName="react-modal-overlay"
      className="react-modal-content"
    >
      <button
        type="button"
        onClick={onRequestClose}
        className="react-modal-close"
      >
        <FiX />
      </button>

      <form onSubmit={(ev) => handleSubmit(ev)} className={styles.form}>
        <h2>New Transaction</h2>

        <input
          placeholder="Email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
          onBlur={(event) => handleSearchEmail(event.target.value)}
        />

        <input
          placeholder="Name"
          value={name}
          onChange={(event) => setName(event.target.value)}
          required
          disabled
        />

        <input
          placeholder="Phone"
          value={phone}
          onChange={(event) => setPhone(event.target.value)}
          required
          disabled
        />

        <input
          placeholder="Value"
          value={currency}
          onChange={(event) => setCurrency(event.target.value)}
          required
        />

        <button type="submit">Cadastrar</button>
      </form>
    </Modal>
  );
}
