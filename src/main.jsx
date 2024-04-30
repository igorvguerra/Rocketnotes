import React from 'react';
import ReactDOM from 'react-dom/client';
import { ThemeProvider } from 'styled-components';
import { Routes } from './routes';
import theme from './styles/theme.js';
import GlobalStyles from './styles/global.js';

import { MyContext } from './myContext.js';


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <GlobalStyles/>
      <MyContext.Provider value={{ email: 'igor@email.com' }}>
        <Routes />
      </MyContext.Provider>
    </ThemeProvider>
  </React.StrictMode>,
)
