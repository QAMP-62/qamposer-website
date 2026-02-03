import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '@carbon/styles/css/styles.css';
import App from './App';
import './index.scss';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
