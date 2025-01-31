"use client";

import type { ProductDTO } from "@/types";
import { Button } from "../ui/button";
import { useCart } from "@/context/cart-context";
import { useQueryState } from "nuqs";
import { Minus, Plus } from "lucide-react";

export function AddToCartButton({
  label,
  product,
}: {
  label: string;
  product: ProductDTO;
}) {
  const { addProductToCart, addOneToCart, cartItems, removeOneFromCart } =
    useCart();
  const [sizeQuery] = useQueryState("size", {
    defaultValue: product.prices[0]?.size ?? "",
  });

  const handleClick = () => {
    const selectedPrice = product.prices.find(({ size }) => size === sizeQuery);
    const price = selectedPrice?.price ?? 0;
    addProductToCart({
      id: product.id,
      name: product.name,
      price,
      imageUrl: product.images[0] ?? "/images/bouquet-placeholder.jpg",
      size: sizeQuery,
    });
  };

  const currentCartItem = cartItems.find(
    (item) => item.productId === product.id && item.size === sizeQuery,
  );

  return (
    <>
      {currentCartItem && currentCartItem?.quantity > 0 ? (
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            className="rounded-full"
            onClick={() => removeOneFromCart(currentCartItem.id)}
          >
            <Minus className="h-4 w-4" />
          </Button>
          <div className="min-w-20 text-center text-xl font-medium">
            {currentCartItem.quantity}
          </div>
          <Button
            variant="outline"
            className="rounded-full"
            onClick={() => addOneToCart(currentCartItem.id)}
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
