"use client";

import { api } from "@/trpc/react";
import type { CartItem } from "@/types";
import { useLocale } from "next-intl";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

type AddProductType = {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  size: string;
};

type CartContextTypes = {
  cartItems: CartItem[];
  storedCartId: string | null;
  addProductToCart: (product: AddProductType) => void;
  removeOneFromCart: (productId: string, size: string) => void;
  // addOneToCart: (cartItemId: string) => void;
  // removeProductFromCart: (cartItemId: string) => void;
};

const CartContext = createContext<CartContextTypes | null>(null);

export default function CartProvider({ children }: React.PropsWithChildren) {
  const locale = useLocale();

  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const storedCartId =
    typeof window !== "undefined" ? localStorage.getItem("cartId") : null;

  // Fetch cart items from API
  const { data: serverCartItems } = api.public.cart.getCartItems.useQuery(
    { cartId: storedCartId },
    { enabled: Boolean(storedCartId) },
  );

  const { mutate: removeCartItem } =
    api.public.cart.removeCartItem.useMutation();

  useEffect(() => {
    setCartItems(serverCartItems ?? []);
  }, [serverCartItems]);

  const addProductToCart = useCallback(
    (product: AddProductType) => {
      const productExistsInCart = cartItems.find(
        (item) => item.productId === product.id && item.size === product.size,
      );

      if (!productExistsInCart) {
        setCartItems((prev) => {
          return [
            {
              id: crypto.randomUUID(),
              productId: product.id,
              productName: product.name,
              price: product.price,
              size: product.size,
              imageUrl: product.imageUrl,
              quantity: 1,
            },
            ...prev,
          ];
        });
        return;
      }

      setCartItems((prev) =>
        prev.map((item) =>
          item.productId === product.id && item.size === product.size
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        ),
      );
    },
    [cartItems],
  );

  const removeOneFromCart = useCallback(
    (productId: string, size: string) => {
      const item = cartItems.find(
        (item) => item.productId === productId && item.size === size,
      );

      if (item && (item?.quantity ?? 0) - 1 < 1) {
        removeCartItem({ cartItemId: item?.id });
      }

      setCartItems((prev) => {
        const newCartItems = prev.map((item) =>
          item.id === productId && item.size === size
            ? { ...item, quantity: item.quantity - 1 }
            : item,
        );
        return newCartItems.filter((item) => item.quantity);
      });
      console.log("HERE");
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [cartItems],
  );

  // Memoize context value to avoid unnecessary re-renders
  const contextValue = useMemo(
    () => ({
      cartItems,
      locale,
      storedCartId,
    }),
    [cartItems, locale, storedCartId],
  );

  return (
    <CartContext.Provider
      value={{ addProductToCart, removeOneFromCart, ...contextValue }}
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
