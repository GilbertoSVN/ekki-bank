import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './App';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
// import reportWebVitals from "./reportWebVitals";

import { createMirajeServer } from './services/miraje';

import 'react-toastify/dist/ReactToastify.css';

if (process.env.REACT_APP_USE_FAKE_API === true) {
  createMirajeServer();

  Notification.requestPermission();

  if (Notification.permission === 'granted') {
    // eslint-disable-next-line no-new
    new Notification('Development with Fake API', {
      body:
        'You are using a Fake API version for design development. If you want to connect to a local database, set REACT_APP_USE_FAKE_API to false on .env file',
    });
  }
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

serviceWorkerRegistration.register();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
