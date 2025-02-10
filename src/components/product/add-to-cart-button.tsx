"use client";

import type { ProductDTO } from "@/types";
import { Button } from "../ui/button";
import { useCart } from "@/components/product/context/cart-context";
import { useQueryState } from "nuqs";
import { useMemo } from "react";
import { useTranslations } from "next-intl";

export function AddToCartButton({ product }: { product: ProductDTO }) {
  const { cartItems, addOneToCart, setIsCartOpen } = useCart();
  const t = useTranslations("product");

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
      {Boolean(existingCartItem) ? t("in_cart") : t("add_to_cart")}
    </Button>
  );
}
