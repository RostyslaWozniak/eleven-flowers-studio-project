"use client";

import { Button } from "../ui/button";
import { useCart } from "@/context/cart-context";
import type { ProductDTO } from "@/features/products/types/product.types";
import { useTranslations } from "next-intl";
import { useQueryState } from "nuqs";
import { useMemo } from "react";

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
  if (product.status !== "AVAILABLE") {
    return <Button disabled>{t("not_available")}</Button>;
  }

  return (
    <Button disabled={Boolean(existingCartItem)} onClick={addProductToCart}>
      {Boolean(existingCartItem) ? t("in_cart") : t("add_to_cart")}
    </Button>
  );
}
