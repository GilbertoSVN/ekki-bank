import axios from 'axios';

export const api = axios.create({
  baseURL:
    process.env.REACT_APP_USE_FAKE_API === true
      ? `${process.env.REACT_APP_FAKE_API_URL}/api`
      : `${process.env.REACT_APP_API_URL}/`,
});
