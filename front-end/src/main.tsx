import React from 'react';
import ReactDOM from 'react-dom/client';
import { AppQueryProvider } from '@app/providers/QueryProvider';
import { AppThemeProvider } from '@app/providers/ThemeProvider';
import { AppRouter } from '@app/router';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AppQueryProvider>
      <AppThemeProvider>
        <AppRouter />
      </AppThemeProvider>
    </AppQueryProvider>
  </React.StrictMode>
);