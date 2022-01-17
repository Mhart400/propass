import React, { useState, useContext, useEffect } from "react";


export const CartContext = React.createContext();

export function useCart() {
  return useContext(CartContext);
}

export function CartProvider({ children }) {
  
  const [cartItems, setCartItems] = useState(JSON.parse(localStorage.getItem('cart')));

  const addItemToCart = (item) => {
    let newCart = []
    if (cartItems && cartItems.length > 0) {
      newCart = [...cartItems, item];
    } else {
      newCart = [item];
    }
    setCartItems([...newCart]);
    localStorage.setItem('cart', JSON.stringify(newCart))
  };

  const [cartSummary, setCartSummary] = useState({
    itemCount: 0,
    totalPrice: 0,
  });

  const deleteItemFromCart = (index) => {
    let newCart = [...cartItems]
    newCart.splice(index, 1)
    setCartItems([...newCart])
    localStorage.setItem('cart', JSON.stringify(newCart))
  }

  useEffect(() => {
    // Update cartTotal
    let sumPrice = 0;
    try {

      cartItems.forEach((item) => {
        sumPrice += item.totalPrice;
      });
      setCartSummary({ itemCount: cartItems.length, totalPrice: sumPrice });
  } catch (error) {
    console.log('No Items in Cart')
  }
  }, [cartItems]);

  const value = {
    cartItems,
    addItemToCart,
    cartSummary,
    deleteItemFromCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
