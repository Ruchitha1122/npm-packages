import React from 'react';
import ReactDOM from 'react-dom';


import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './tailwind.css';
import { FavoritesProvider } from './context/FavoritesContext';
 ReactDOM.render(
  <React.StrictMode>
    <FavoritesProvider>
      <App />
    </FavoritesProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
