// src/components/cart/CartList.js
import { Typography, Box } from "@mui/material";
import CartItem from "./CartItem";
import { useCart } from "../../context/CartContext";

const CartList = () => {
  const { cart, total } = useCart();

  return (
    <Box sx={{ border: "1px solid #ddd", padding: "10px", borderRadius: "5px" }}>
      <Typography variant="h6">سبد خرید</Typography>
      {cart.length === 0 ? (
        <Typography>سبد خرید خالی است</Typography>
      ) : (
        <>
          {cart.map((item, index) => (
            <CartItem key={index} item={item} index={index} />
          ))}
          <Typography variant="h6" sx={{ marginTop: "10px" }}>
            جمع کل: {total.toLocaleString()} تومان
          </Typography>
        </>
      )}
    </Box>
  );
};

export default CartList;