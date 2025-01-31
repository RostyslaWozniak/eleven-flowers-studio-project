"use client";

import type { ProductDTO } from "@/types";
import { Button } from "../ui/button";
import { useCart } from "@/context/cart-context";
import { useQueryState } from "nuqs";
import { Minus, Plus } from "lucide-react";
import { useDebounce } from "@/hooks/use-debounce";
import { useEffect } from "react";
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
  const { addProductToCart, removeOneFromCart, cartItems, storedCartId } =
    useCart();

  const [sizeQuery] = useQueryState("size", {
    defaultValue: product.prices[0]?.size ?? "",
  });
  const { mutate: setCartItemQuantity } =
    api.public.cart.mutateCart.useMutation({
      onSuccess: (result) => localStorage.setItem("cartId", result.cartId),
    });

  const handleClick = () => {
    addProductToCart({
      id: product.id,
      name: product.name,
      price: product.prices.find(({ size }) => size === sizeQuery)?.price ?? 0,
      imageUrl: product.images[0]!,
      size: sizeQuery,
    });
  };

  const clientQuantity =
    cartItems?.find(
      (item) => item.productId === product.id && item.size === sizeQuery,
    )?.quantity ?? undefined;

  const debouncedQuantity = useDebounce(clientQuantity, 300);

  useEffect(() => {
    if (debouncedQuantity === undefined) return;

    setCartItemQuantity({
      cartId: storedCartId,
      productId: product.id,
      size: sizeQuery,
      quantity: debouncedQuantity,
      locale,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedQuantity, setCartItemQuantity]);

  return (
    <>
      {clientQuantity && clientQuantity > 0 ? (
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            className="rounded-full"
            onClick={() => removeOneFromCart(product.id, sizeQuery)}
          >
            <Minus className="h-4 w-4" />
          </Button>
          <div className="min-w-20 text-center text-xl font-medium">
            {clientQuantity}
          </div>
          <Button
            variant="outline"
            className="rounded-full"
            onClick={() => handleClick()}
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      ) : (
        <Button onClick={handleClick} className="">
          {label}
        </Button>
      )}
    </>
  );
}
