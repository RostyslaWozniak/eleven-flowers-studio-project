"use client";

import type { ProductDTO } from "@/types";
import { Button } from "../ui/button";
import { useCart } from "@/context/cart-context";
import { useQueryState } from "nuqs";
import { useDebounce } from "@/hooks/use-debounce";
import { useEffect, useState } from "react";
import { api } from "@/trpc/react";
import { useLocale } from "next-intl";

export function AddToCartButton({
  label,
  product,
}: {
  label: string;
  product: ProductDTO;
}) {
  const locale = useLocale();
  const { addProductToCart, cartItems, storedCartId, setIsCartOpen } =
    useCart();

  const [cartItemId, setCartItemId] = useState<string | null>(null);

  const [sizeQuery] = useQueryState("size", {
    defaultValue: product.prices[0]?.size ?? "",
  });
  const { mutate: setCartItemQuantity } =
    api.public.cart.mutateCart.useMutation({
      onSuccess: (result) => localStorage.setItem("cartId", result.cartId),
    });

  const handleClick = () => {
    const { cartItemId: newCartItemId } = addProductToCart({
      id: product.id,
      name: product.name,
      price: product.prices.find(({ size }) => size === sizeQuery)?.price ?? 0,
      imageUrl: product.images[0]!,
      size: sizeQuery,
    });
    setCartItemId(newCartItemId);
    setIsCartOpen(true);
  };

  const clientQuantity = cartItems?.find(
    (item) => item.productId === product.id && item.size === sizeQuery,
  )?.quantity;

  const debouncedQuantity = useDebounce(clientQuantity, 1000);

  useEffect(() => {
    if (debouncedQuantity === undefined) return;
    if (cartItemId === null) return;

    setCartItemQuantity({
      cartItemId: cartItemId,
      cartId: storedCartId,
      productId: product.id,
      size: sizeQuery,
      quantity: debouncedQuantity,
      locale,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedQuantity, cartItemId, setCartItemQuantity]);

  return (
    <Button disabled={Boolean(clientQuantity)} onClick={handleClick}>
      {Boolean(clientQuantity) ? "Jest w koszyku" : label}
    </Button>
  );
}
