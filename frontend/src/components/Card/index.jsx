import { FiX } from 'react-icons/fi';
import styles from './card.module.scss';

export function Card({ name, email, phone, userId, favoredId, handleDelete }) {
  return (
    <div className={styles.card}>
      <div className={styles.closeDiv}>
        <FiX
          className={styles.closeButton}
          onClick={() => handleDelete(userId, favoredId)}
        />
      </div>
      <div>
        <h6>Name:</h6>
        <p>{name}</p>
      </div>
      <div>
        <h6>E-mail:</h6>
        <p>{email}</p>
      </div>
      <div>
        <h6>Phone:</h6>
        <p>{phone}</p>
      </div>
    </div>
  );
}
