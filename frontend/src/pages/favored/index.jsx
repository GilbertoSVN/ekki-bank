import { memo, useEffect, useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import { Card } from '../../components/Card';
import { getUserFavoreds } from '../../services/connection';
import { deleteFavored } from '../../domain/favored/deleteFavored';
import styles from './favored.module.scss';

function Favored({ openModal }) {
  const [filterInput, setFilterInput] = useState('');
  const [favoredList, setFavoredList] = useState([{}]);

  const getFavoredList = async () => {
    const data = await getUserFavoreds('gilberto@gilberto.com');
    setFavoredList(data);
  };

  useEffect(async () => {
    await getFavoredList();
  }, []);

  const handleInput = (ev) => {
    setFilterInput(ev.target.value);
  };

  const handleDelete = async (id, favoredId) => {
    await deleteFavored(id, favoredId);

    await getFavoredList();
  };

  return (
    <div className={styles.container}>
      <div className={styles.favored}>
        <div className={styles.header}>
          <div>
            <p>Filter by email:</p>
            <label htmlFor="email">
              <input
                aria-details="Filter favored users by email"
                id="email"
                type="text"
                value={filterInput}
                onChange={(ev) => handleInput(ev)}
              />
              <FiSearch />
            </label>
          </div>
          <button type="button" onClick={openModal}>
            New favored
          </button>
        </div>
        <div>
          <h1>Favored List</h1>
          <div className={styles.favoredGrid}>
            {favoredList &&
              favoredList
                .filter((favored) =>
                  favored?.favored?.email?.includes(filterInput)
                )
                .map((favored) => (
                  <Card
                    key={favored.favored.id}
                    name={favored.favored.name}
                    email={favored.favored.email}
                    phone={favored.favored.phone}
                    favoredId={favored.user_id}
                    userId={favored.favored_by}
                    handleDelete={handleDelete}
                  />
                ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default memo(Favored);
