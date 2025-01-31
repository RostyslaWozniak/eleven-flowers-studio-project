"use client";

import type { CartItem } from "@/types";
import { createContext, useContext, useState } from "react";

type AddProductType = {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  size: string;
};

type CartContextTypes = {
  cartItems: CartItem[];
  addProductToCart: (product: AddProductType) => void;
  addOneToCart: (cartItemId: string) => void;
  removeOneFromCart: (cartItemId: string) => void;
  removeProductFromCart: (cartItemId: string) => void;
};

const CartContext = createContext<CartContextTypes | null>(null);

export default function CartProvider({ children }: React.PropsWithChildren) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const addProductToCart = (product: AddProductType) => {
    const existsProductInCart = cartItems.find(
      (cartItem) =>
        cartItem.productId === product.id && cartItem.size === product.size,
    );

    if (existsProductInCart) {
      setCartItems((prev) =>
        prev.map((item) =>
          item.productId === product.id && item.size === product.size
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        ),
      );
      return;
    }

    setCartItems((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        productId: product.id,
        productName: product.name,
        price: product.price,
        size: product.size,
        imageUrl: product.imageUrl,
        quantity: 1,
      },
    ]);
  };

  const addOneToCart = (cartItemId: string) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === cartItemId
          ? { ...item, quantity: item.quantity + 1 }
          : item,
      ),
    );
  };

  const removeOneFromCart = (cartItemId: string) => {
    const product = cartItems.find((item) => item.id === cartItemId);

    if (!product) return;

    if (product.quantity === 1) {
      return removeProductFromCart(cartItemId);
    }
    setCartItems((prev) =>
      prev.map((item) =>
        item.productId === product.productId && item.size === product.size
          ? { ...item, quantity: item.quantity - 1 }
          : item,
      ),
    );
  };

  const removeProductFromCart = (cartItemId: string) => {
    const product = cartItems.find((item) => item.id === cartItemId);

    if (!product) return;

    setCartItems((prev) =>
      prev.filter(
        (item) =>
          item.productId !== product.productId ||
          item.size !== product.size ||
          item.quantity !== product.quantity,
      ),
    );
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addProductToCart,
        addOneToCart,
        removeOneFromCart,
        removeProductFromCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
