import { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { BankContext } from '../../context/bankContext';
import styles from './header.module.scss';

export function Header() {
  const { account } = useContext(BankContext);

  function navigationButtons() {
    return (
      <>
        <li>
          <NavLink to="/" exact activeClassName={styles.actived}>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/favored" activeClassName={styles.actived}>
            Favored
          </NavLink>
        </li>
        <li>
          <NavLink to="/history" activeClassName={styles.actived}>
            History
          </NavLink>
        </li>
      </>
    );
  }

  return (
    <header className={styles.container}>
      <div className={styles.content}>
        <h1>Ekki Bank</h1>
        <nav className={styles.navigation}>
          <ul>{navigationButtons()}</ul>
        </nav>
        <div>
          <p>
            Conta:
            <span>{account?.formattedAccount}</span>
          </p>
          <span>{account?.user?.name}</span>
        </div>
      </div>
    </header>
  );
}
