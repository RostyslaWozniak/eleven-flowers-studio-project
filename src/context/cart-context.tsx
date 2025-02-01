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
  isCartOpen: boolean;
  totalItems: number;
  totalPrice: number;
  addProductToCart: (product: AddProductType) => {
    cartItemId: string;
  };
  removeOneFromCart: (productId: string, size: string) => void;
  setIsCartOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const CartContext = createContext<CartContextTypes | null>(null);

export default function CartProvider({ children }: React.PropsWithChildren) {
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

  const { mutate: removeCartItem } =
    api.public.cart.removeCartItem.useMutation();

  const addProductToCart = (product: AddProductType) => {
    const productExistsInCart = cartItems.find(
      (item) => item.productId === product.id && item.size === product.size,
    );
    const newCartItemId = crypto.randomUUID();
    if (!productExistsInCart) {
      setCartItems((prev) => {
        return [
          {
            id: newCartItemId,
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
      return { cartItemId: newCartItemId };
    }

    setCartItems((prev) =>
      prev.map((item) =>
        item.productId === product.id && item.size === product.size
          ? { ...item, quantity: item.quantity + 1 }
          : item,
      ),
    );
    return { cartItemId: productExistsInCart.id };
  };

  const removeOneFromCart = useCallback(
    (productId: string, size: string) => {
      const item = cartItems.find(
        (item) => item.productId === productId && item.size === size,
      );
      console.log(item);

      if (item && (item?.quantity ?? 0) - 1 < 1) {
        removeCartItem({ id: item.id });
      }

      setCartItems((prev) => {
        const newCartItems = prev.map((item) =>
          item.productId === productId && item.size === size
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

  const totalItems =
    cartItems?.reduce((sum, item) => sum + item.quantity, 0) ?? 0;
  const totalPrice =
    cartItems?.reduce((sum, item) => sum + item.price * item.quantity, 0) ?? 0;

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
        addProductToCart,
        removeOneFromCart,
        setIsCartOpen,
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
