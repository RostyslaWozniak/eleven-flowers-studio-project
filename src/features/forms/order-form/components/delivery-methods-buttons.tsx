import { ToggleAnimation } from "@/components/animations/toogle-comp-animation";
import { cn } from "@/lib/utils";
import { CheckIcon, ShoppingBagIcon, TruckIcon } from "lucide-react";
import { useCart } from "@/context/cart-context";
import { useTranslations } from "next-intl";

export function DeliveryMethodsButtons() {
  const { deliveryMethod, setDeliveryPrice, setDeliveryMethod } = useCart();

  const tButtons = useTranslations("pages.cart_summary.forms.buttons");
  return (
    <div className="grid grid-cols-2 gap-4 px-2 pb-8">
      <button
        className={cn(
          "flex w-full flex-col items-center rounded-md border border-slate-200 p-2",
          {
            "bg-card": deliveryMethod === "delivery",
          },
        )}
        onClick={() => {
          setDeliveryMethod("delivery");
        }}
      >
        <div>
          <ToggleAnimation
            className="h-8 w-8 text-primary"
            firstComp={<TruckIcon className="size-8" />}
            secondComp={<CheckIcon className="size-12" />}
            isActive={deliveryMethod === "delivery"}
          />
        </div>
        <p className="text-sm">{tButtons("delivery")}</p>
      </button>
      <button
        className={cn(
          "flex w-full flex-col items-center rounded-md border border-slate-200 p-2",
          {
            "bg-card": deliveryMethod === "pickup",
          },
        )}
        onClick={() => {
          setDeliveryMethod("pickup");
          setDeliveryPrice(null);
        }}
      >
        <div>
          <ToggleAnimation
            className="h-8 w-8 text-primary"
            firstComp={<ShoppingBagIcon className="size-7" />}
            secondComp={<CheckIcon className="size-full" />}
            isActive={deliveryMethod === "pickup"}
          />
        </div>
        <p className="text-sm">{tButtons("pickup")}</p>
      </button>
    </div>
  );
}
