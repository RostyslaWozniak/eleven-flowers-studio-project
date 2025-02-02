"use client";

import type { ProductDTO } from "@/types";
import { Button } from "../ui/button";
import { useCart } from "@/context/cart-context";
import { useQueryState } from "nuqs";
import { useDebounce } from "@/hooks/use-debounce";
import { useEffect } from "react";
import { api } from "@/trpc/react";
import { useLocale } from "next-intl";

export function AddToCartButton({
  product,
  label,
}: {
  product: ProductDTO;
  label?: string;
}) {
  const locale = useLocale();
  const { cartItems, storedCartId, addOneToCart, setIsCartOpen } = useCart();

  const [sizeQuery] = useQueryState("size", {
    defaultValue: product.prices[0]?.size ?? "",
  });
  const { mutate: setCartItemQuantity } =
    api.public.cart.mutateCart.useMutation({
      onSuccess: (result) => localStorage.setItem("cartId", result.cartId),
    });

  // ADD PRODUCT TO CART FOR FIRST TIME
  const addProductToCart = () => {
    addOneToCart({
      id: product.id,
      name: product.name,
      price:
        product.prices.find(({ size }) => size === sizeQuery)?.price ?? null,
      slug: product.slug,
      size: sizeQuery,
      imageUrl: product.images[0] ?? "",
    });

    setTimeout(() => setIsCartOpen(true), 300);
  };

  const clientQuantity = cartItems?.find(
    (item) => item.productId === product.id && item.size === sizeQuery,
  )?.quantity;

  const debouncedQuantity = useDebounce(clientQuantity, 1000);

  useEffect(() => {
    if (debouncedQuantity === undefined) return;
    setCartItemQuantity({
      cartItemId: product.id + sizeQuery,
      cartId: storedCartId,
      productId: product.id,
      size: sizeQuery,
      quantity: debouncedQuantity,
      locale,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedQuantity, setCartItemQuantity]);

  return (
    <Button disabled={Boolean(clientQuantity)} onClick={addProductToCart}>
      {Boolean(clientQuantity) ? "Jest w koszyku" : label}
    </Button>
  );
}
