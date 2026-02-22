import { PurchaseSucceedTemplate } from "@/components/emails/purchase-succeed-template";
import { MaxWidthWrapper } from "@/components/max-width-wrapper";
import { SectionWrapper } from "@/components/section-wrapper";
import { SendMessageButton } from "@/features/telegram/components/send-message-button";

export default function TestPage() {
  return (
    <>
      <SectionWrapper>
        <MaxWidthWrapper>
          <SendMessageButton />
        </MaxWidthWrapper>
      </SectionWrapper>
      <SectionWrapper>
        <MaxWidthWrapper>
          <PurchaseSucceedTemplate
            name={"Ivan"}
            locale="pl"
            price={400}
            updatedOrder={{
              createdAt: new Date(),
              orderItems: [
                { productName: "Kwiaty", quantity: 3, size: "S" },
                { productName: "Balony", quantity: 23, size: "Xl" },
              ],
            }}
          />
        </MaxWidthWrapper>
      </SectionWrapper>
    </>
  );
}
