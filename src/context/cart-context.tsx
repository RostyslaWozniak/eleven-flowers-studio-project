"use client";

import { useDebounceCallback } from "@/hooks/use-debounce-callback";
import { api } from "@/trpc/react";
import type { CartItem } from "@/types";
import { useLocale } from "next-intl";
import {
  createContext,
  type Dispatch,
  type SetStateAction,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

type CartContextTypes = {
  cartItems: CartItem[];
  storedCartId: string | null;
  isCartOpen: boolean;
  totalItems: number;
  totalPrice: number;
  setCartItems: Dispatch<SetStateAction<CartItem[]>>;
  addOneToCart: (product: AddProductType) => void;
  removeCartItem: (id: string) => void;
  removeOneFromCart: (productId: string, size: string) => void;
  setIsCartOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const CartContext = createContext<CartContextTypes | null>(null);

export type AddProductType = {
  id: string;
  name: string;
  price: number | null;
  imageUrl: string;
  size: string;
  slug: string;
};

export default function CartProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const locale = useLocale();

  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);

  const storedCartId =
    typeof window !== "undefined" ? localStorage.getItem("cartId") : null;

  // Fetch cart items from API
  const { data: serverCartItems } = api.public.cart.getCartItems.useQuery(
    { cartId: storedCartId },
    { enabled: Boolean(storedCartId) },
  );

  const { mutate: removeCartItemOnServer } =
    api.public.cart.removeCartItem.useMutation();

  const { mutate: setServerCartItem } = api.public.cart.mutateCart.useMutation({
    onSuccess: (data) => {
      localStorage.setItem("cartId", data.cartId);
    },
  });

  const debouncedUpdateCart = useDebounceCallback(setServerCartItem, 500);

  const addOneToCart = (product: AddProductType) => {
    setCartItems((prev) => {
      const cartItemExists = prev.find(
        (item) => item.productId === product.id && item.size === product.size,
      );

      let updatedCart;
      if (!cartItemExists) {
        updatedCart = [
          {
            id: product.id + product.size,
            productId: product.id,
            productName: product.name,
            slug: product.slug,
            price: product.price,
            size: product.size,
            imageUrl: product.imageUrl,
            quantity: 1,
          },
          ...prev,
        ];
      } else {
        updatedCart = prev.map((item) =>
          item.productId === product.id && item.size === product.size
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }

      // Find the updated item and debounce its API update
      const updatedItem = updatedCart.find(
        (item) => item.productId === product.id && item.size === product.size,
      );
      if (updatedItem) {
        debouncedUpdateCart({
          cartItemId: updatedItem.id,
          cartId: storedCartId,
          productId: updatedItem.productId,
          size: updatedItem.size,
          locale,
          quantity: updatedItem.quantity,
        });
      }

      return updatedCart;
    });
  };

  const removeOneFromCart = useCallback(
    (productId: string, size: string) => {
      let updatedCart;
      const item = cartItems.find(
        (item) => item.productId === productId && item.size === size,
      );

      if (item && (item?.quantity ?? 0) - 1 < 1) {
        removeCartItemOnServer({ id: item.id });
      }

      setCartItems((prev) => {
        updatedCart = prev.map((item) =>
          item.productId === productId && item.size === size
            ? { ...item, quantity: item.quantity - 1 }
            : item,
        );

        // Find the updated item and debounce its API update
        const updatedItem = updatedCart.find(
          (item) => item.productId === productId && item.size === size,
        );
        if (updatedItem) {
          debouncedUpdateCart({
            cartItemId: updatedItem.id,
            cartId: storedCartId,
            productId: updatedItem.productId,
            size: updatedItem.size,
            locale,
            quantity: updatedItem.quantity,
          });
        }

        return updatedCart;
      });
    },

    // eslint-disable-next-line react-hooks/exhaustive-deps
    [cartItems],
  );

  const removeCartItem = (id: string) => {
    setCartItems((prev) => {
      return prev?.filter((item) => item.id !== id);
    });
    removeCartItemOnServer({ id });
  };

  const totalItems =
    cartItems?.reduce((sum, item) => sum + item.quantity, 0) ?? 0;
  const totalPrice =
    cartItems?.reduce((sum, item) => sum + item.price! * item.quantity, 0) ??
    "N/A";

  useEffect(() => {
    setCartItems(serverCartItems ?? []);
  }, [serverCartItems]);

  // Memoize context value to avoid unnecessary re-renders
  const contextValue = useMemo(
    () => ({
      cartItems,
      locale,
      storedCartId,
      isCartOpen,
      totalItems,
      totalPrice,
    }),
    [cartItems, locale, storedCartId, isCartOpen, totalItems, totalPrice],
  );

  return (
    <CartContext.Provider
      value={{
        removeOneFromCart,
        setIsCartOpen,
        removeCartItem,
        setCartItems,
        addOneToCart,
        ...contextValue,
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
