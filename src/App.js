// src/App.js
import { CartProvider } from "./context/CartContext";
import POSPage from "./pages/POSPage";

function App() {
  return (
    <CartProvider>
      <POSPage />
    </CartProvider>
  );
}

export default App;