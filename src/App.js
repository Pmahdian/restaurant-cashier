
// src/App.js
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { CartProvider } from './context/CartContext'; 
import POSPage from './pages/POSPage';

const theme = createTheme({
  direction: 'rtl',
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <CartProvider>
        <POSPage />
      </CartProvider>
    </ThemeProvider>
  );
}
export default App;