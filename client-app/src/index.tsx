import React from 'react';
import 'semantic-ui-css/semantic.min.css';
import './app/layout/styles.css';
import ReactDOM from 'react-dom/client';
import { store, StoreContext } from './app/stores/store';
import { BrowserRouter } from 'react-router-dom';
import App from './app/layout/App';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <StoreContext.Provider value={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StoreContext.Provider>
);
