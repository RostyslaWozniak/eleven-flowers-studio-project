"use client";

import { Button } from "../ui/button";
import { useCart } from "@/context/cart-context";
import type { ProductDTO } from "@/features/products/types/product.types";
import { useQueryState } from "nuqs";
import { useMemo } from "react";

export function AddToCartButton({
  product,
  buttonInCart,
  buttonAddToCart,
}: {
  product: ProductDTO;
  buttonInCart: string;
  buttonAddToCart: string;
}) {
  const { cartItems, addOneToCart, setIsCartOpen } = useCart();

  const [sizeQuery] = useQueryState("size", {
    defaultValue: product.prices[0]?.size ?? "",
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
    if (cartItems.length === 0) {
      setTimeout(() => setIsCartOpen(true), 300);
    }
  };

  const existingCartItem = useMemo(
    () =>
      cartItems?.find(
        (item) => item.productId === product.id && item.size === sizeQuery,
      ),
    [cartItems, product.id, sizeQuery],
  );

  return (
    <Button disabled={Boolean(existingCartItem)} onClick={addProductToCart}>
      {Boolean(existingCartItem) ? buttonInCart : buttonAddToCart}
    </Button>
  );
}
