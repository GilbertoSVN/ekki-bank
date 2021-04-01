import { useState, useContext } from 'react';
import Modal from 'react-modal';
import Slider from 'rc-slider';
import { FiX } from 'react-icons/fi';

import { toast } from 'react-toastify';
import styles from './limitModal.module.scss';
import { BankContext } from '../../../context/bankContext';
import { changeLimit } from '../../../domain/balance/changeLimit';

export function LimitModal({ isOpen, onRequestClose }) {
  const { account, updateAccount } = useContext(BankContext);
  const [limitValue, setValue] = useState(0);

  async function handleSubmit(ev) {
    ev.preventDefault();
    const { saved_limit, limit, total_limit } = account.balance;
    const newLimit = +limitValue * 100;
    let newSavedLimit = +saved_limit;
    let newTotalLimit = +total_limit;

    if (+newLimit > +limit + +saved_limit) {
      toast.error('Insufficient limit to handle request');
      return;
    }

    if (+newLimit < +limit) {
      newSavedLimit += +limit - +newLimit;
    }

    if (+newLimit > +limit && +newLimit <= +limit + +saved_limit) {
      newSavedLimit -= +newLimit - +limit;
    }

    newTotalLimit = +newLimit + +newSavedLimit;

    const payload = {
      id: account.balance.id,
      limit: newLimit,
      totalLimit: newTotalLimit,
      maxLimit: account.balance.max_limit,
      savedLimit: newSavedLimit,
      balance: account.balance.balance,
    };

    await changeLimit(account.user.email, payload);
    await updateAccount();

    onRequestClose();
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
        <h2>Adjust limit</h2>

        {account?.balance && (
          <>
            <div className={styles.limit}>
              <span>
                {Intl.NumberFormat('en-US', {
                  style: 'currency',
                  currency: 'USD',
                }).format(limitValue)}
              </span>
            </div>

            <div className={styles.slider}>
              <span>0</span>
              <Slider
                min={0}
                max={account?.balance?.max_limit / 100}
                value={limitValue}
                onChange={setValue}
                handleStyle={{
                  borderColor: '#dd6b20',
                  backgroundColor: '#dd6b20',
                  height: '1.25rem',
                  width: '1.25rem',
                }}
                trackStyle={{
                  backgroundColor: '#dd6b20',
                  height: '0.5rem',
                }}
                railStyle={{
                  height: '0.5rem',
                }}
              />
              <span>{account?.balance?.total_limit / 100 ?? 0}</span>
            </div>
          </>
        )}

        <button type="submit">Save changes</button>
      </form>
    </Modal>
  );
}
