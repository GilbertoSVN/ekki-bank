import { useState } from 'react';
import Modal from 'react-modal';
import { FiX } from 'react-icons/fi';
import styles from './favoredModal.module.scss';
import { newFavored } from '../../../domain/favored/newFavored';
import { getUserAccount } from '../../../services/connection';

export function FavoredModal({ isOpen, onRequestClose }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  async function handleSubmit(ev) {
    ev.preventDefault();

    await newFavored('gilberto@gilberto.com', email);

    setName('');
    setEmail('');
    setPhone('');

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
        <h2>Register new favored</h2>

        <input
          placeholder="Email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          onBlur={(event) => handleSearchEmail(event.target.value)}
          required
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

        <button type="submit">Register</button>
      </form>
    </Modal>
  );
}
