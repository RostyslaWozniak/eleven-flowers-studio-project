import Image from "next/image";
import { Minus, Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { CartItem } from "@/types";
import { formatPrice } from "@/lib/utils";
import { useCart } from "@/context/cart-context";
import { Link } from "@/i18n/routing";
import { motion } from "framer-motion";

interface CartItemProps {
  cartItem: CartItem;
}

export function CartItem({ cartItem }: CartItemProps) {
  const { removeOneFromCart, removeCartItem, addOneToCart, setIsCartOpen } =
    useCart();

  return (
    <motion.div
      layout
      className="flex items-center space-x-4 border-b border-gray-200 py-4 last:border-b-0"
    >
      <div className="relative h-20 w-20 overflow-hidden bg-gray-100">
        <Image
          src={cartItem.imageUrl}
          alt={cartItem.productName}
          layout="fill"
          objectFit="cover"
        />
      </div>
      <div className="flex-grow">
        <Link
          href={`/products/${cartItem.slug}?size=${cartItem.size}`}
          className="hover:underline"
        >
          <h3
            className="text-lg font-semibold text-gray-900"
            onClick={() => setIsCartOpen(false)}
          >
            {cartItem.productName}
          </h3>
        </Link>
        <p className="text-sm text-gray-500">
          {formatPrice(cartItem.price)} x {cartItem.quantity}
        </p>
        <p className="mt-1 text-sm font-medium text-gray-900">
          Size:{" "}
          <span className="text-base font-bold capitalize">
            {cartItem.size}
          </span>
        </p>
      </div>
      <div className="flex items-center space-x-2">
        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8 rounded-full"
          onClick={() => removeOneFromCart(cartItem.productId, cartItem.size)}
          disabled={cartItem.quantity === 1}
        >
          <Minus className="h-4 w-4" />
        </Button>
        <span className="w-8 text-center text-lg font-medium">
          {cartItem.quantity}
        </span>
        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8 rounded-full"
          onClick={() =>
            addOneToCart({
              id: cartItem.productId,
              name: cartItem.productName,
              slug: cartItem.slug,
              price: cartItem.price,
              imageUrl: cartItem.imageUrl,
              size: cartItem.size,
            })
          }
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>
      <Button
        variant="ghost"
        size="icon"
        className="h-8 w-8 rounded-full text-gray-400 hover:text-gray-500"
        onClick={() => removeCartItem(cartItem.id)}
      >
        <X className="h-4 w-4" />
      </Button>
    </motion.div>
  );
}
