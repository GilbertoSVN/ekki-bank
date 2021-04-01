import { api } from './api';

export function getUserByID(id) {
  const data = api
    .get(`/users/${id}`)
    .then((res) => res.data)
    .catch((err) => ({
      status: err.response.status,
      message: err.response.data.error,
    }));

  return data;
}

export function getUserAccount(email) {
  const data = api
    .get(`/accounts/${email}`)
    .then((res) => res.data)
    .catch((err) => ({
      status: err.response.status,
      message: err.response.data.error,
    }));

  return data;
} // account '', user {}, balance {}

export function getUserFavoreds(email) {
  const data = api
    .get(`/favoreds/${email}`)
    .then((res) => res.data)
    .catch((err) => ({
      status: err.response.status,
      message: err.response.data.error,
    }));

  return data;
} // favored {}

export function createNewFavored(email, favoredEmail) {
  const data = api
    .post('/favoreds', { email, favored_email: favoredEmail })
    .then((res) => res.data)
    .catch((err) => ({
      status: err.response.status,
      message: err.response.data.error,
    }));

  return data;
} // id, user_id, favored_by

export function removeFavored(userId, favoredId) {
  const data = api
    .delete('/favoreds', { data: { user_id: userId, favored_id: favoredId } })
    .then((res) => res.data)
    .catch((err) => ({
      status: err.response.status,
      message: err.response.data.error,
    }));

  return data;
} // -> message

export function getBalanceByEmail(email) {
  const data = api
    .get(`/balances/${email}`)
    .then((res) => res.data)
    .catch((err) => ({
      status: err.response.status,
      message: err.response.data.error,
    }));

  return data;
} // balance {}

export function updateBalance(payload) {
  const { id, limit, totalLimit, savedLimit, balance } = payload;

  const data = api
    .put(`/balances/${id}`, {
      limit,
      total_limit: totalLimit,
      saved_limit: savedLimit,
      balance,
    })
    .then((res) => res.data)
    .catch((err) => ({
      status: err.response.status,
      message: err.response.data.error,
    }));

  return data; // balance {}
}

export function getTransactionsByEmail(email) {
  const data = api
    .get(`/transactions/${email}`)
    .then((res) => res.data)
    .catch((err) => ({
      status: err.response.status,
      message: err.response.data.error,
    }));

  return data;
}

export function createTransaction(payload) {
  const { senderEmail, receiverEmail, value, limit } = payload;

  const data = api
    .post('/transactions', {
      sender_email: senderEmail,
      receiver_email: receiverEmail,
      value,
      limit,
    })
    .then((res) => res.data)
    .catch((err) => ({
      status: err.response.status,
      message: err.response.data.error,
    }));

  return data;
} // transaction result -> id, description
