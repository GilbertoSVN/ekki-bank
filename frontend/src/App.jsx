import { useState, lazy, Suspense } from 'react';
import Modal from 'react-modal';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { Header } from './components/Header';
import { FavoredModal } from './components/Modal/FavoredModal';
import { LimitModal } from './components/Modal/LimitModal';
import { TransactionModal } from './components/Modal/TransactionModal';
import { BankProvider } from './context/bankContext';
import FavoredComponent from './pages/favored';
// import { History } from './pages/history';
// import { Home } from './pages/home';

import './styles/global.scss';
import 'rc-slider/assets/index.css';

Modal.setAppElement('#root');

const HomeComponent = lazy(() => import('./pages/home'));
const HistoryComponent = lazy(() => import('./pages/history'));

export function App() {
  const [transactionModalOpen, setTransactionModalOpen] = useState(false);
  const [limitModalOpen, setLimitModalOpen] = useState(false);
  const [favoredModalOpen, setFavoredModalOpen] = useState(false);

  function handleOpenTransactionModal() {
    setTransactionModalOpen(true);
  }

  function handleCloseTransactionModal() {
    setTransactionModalOpen(false);
  }

  function handleOpenLimitModal() {
    setLimitModalOpen(true);
  }

  function handleCloseLimitModal() {
    setLimitModalOpen(false);
  }

  function handleOpenFavoredModal() {
    setFavoredModalOpen(true);
  }

  function handleCloseFavoredModal() {
    setFavoredModalOpen(false);
  }

  return (
    <BankProvider>
      <Router>
        <Header />
        <Suspense fallback={<div>Carregando...</div>}>
          <Switch>
            <Route exact path="/">
              <HomeComponent openModal={handleOpenLimitModal} />
            </Route>
            <Route path="/favored">
              <FavoredComponent openModal={handleOpenFavoredModal} />
            </Route>
            <Route path="/history">
              <HistoryComponent openModal={handleOpenTransactionModal} />
            </Route>
          </Switch>
        </Suspense>
      </Router>
      <TransactionModal
        isOpen={transactionModalOpen}
        onRequestClose={handleCloseTransactionModal}
      />
      <LimitModal
        isOpen={limitModalOpen}
        onRequestClose={handleCloseLimitModal}
      />
      <FavoredModal
        isOpen={favoredModalOpen}
        onRequestClose={handleCloseFavoredModal}
      />
      <ToastContainer />
    </BankProvider>
  );
}
