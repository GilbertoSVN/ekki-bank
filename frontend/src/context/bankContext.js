import { createContext, useEffect, useState } from 'react';
import { getUserAccount } from '../services/connection';

export const BankContext = createContext({});

export function BankProvider({ children }) {
  const [isLoading, setIsLoading] = useState(true);
  const [account, setAccount] = useState({});

  async function updateAccount() {
    setIsLoading(true);

    const userAccount = await getUserAccount('gilberto@gilberto.com').then(
      (data) => data
    );

    setAccount(userAccount);
    setIsLoading(false);
  }

  useEffect(async () => {
    await updateAccount();
  }, []);

  return (
    <BankContext.Provider
      value={{
        isLoading,
        account,
        setIsLoading,
        updateAccount,
      }}
    >
      {children}
    </BankContext.Provider>
  );
}
