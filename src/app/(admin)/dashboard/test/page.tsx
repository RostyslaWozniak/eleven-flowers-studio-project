// import { PurchaseSucceedTemplate } from "@/components/emails/purchase-succeed-template";
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
      {/* <SectionWrapper>
        <MaxWidthWrapper>
          <PurchaseSucceedTemplate
            name={"Ivan"}
            locale="pl"
            price={1659}
            order={{
              createdAt: new Date(),
              deliveryPrice: 0,
              items: [
                {
                  productName: "Gift from the Heart",
                  quantity: 1,
                  size: "l",
                  price: 30000,
                },
                {
                  productName: "Cream box",
                  quantity: 1,
                  size: "s",
                  price: 30000,
                },
                {
                  productName: "Lady rose",
                  quantity: 1,
                  size: "55",
                  price: 30000,
                },
                {
                  productName: "Ranunculus",
                  quantity: 1,
                  size: "m",
                  price: 30000,
                },
              ],
            }}
          />
        </MaxWidthWrapper>
      </SectionWrapper> */}
    </>
  );
}
