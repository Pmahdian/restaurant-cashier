import React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import POSPage from './pages/POSPage';

const theme = createTheme({
  direction: 'rtl',
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <POSPage />
    </ThemeProvider>
  );
}

export default App;