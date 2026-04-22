import { ToggleAnimation } from "@/components/animations/toogle-comp-animation";
import { cn } from "@/lib/utils";
import { CarIcon, CheckIcon, ShoppingBagIcon } from "lucide-react";
import { type DeliveryMethod } from "../types/delivery-methods.type";
import { useCart } from "@/context/cart-context";
import { useTranslations } from "next-intl";

type DeliveryMethodButtonsProps = {
  deliveryMethod: DeliveryMethod;
  onClick: (method: DeliveryMethod) => void;
};

export function DeliveryMethodsButtons({
  deliveryMethod,
  onClick,
}: DeliveryMethodButtonsProps) {
  const { setDeliveryPrice } = useCart();

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
        onClick={() => onClick("delivery")}
      >
        <div>
          <ToggleAnimation
            className="h-8 w-8 text-primary"
            firstComp={<CarIcon className="size-8" />}
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
          onClick("pickup");
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
