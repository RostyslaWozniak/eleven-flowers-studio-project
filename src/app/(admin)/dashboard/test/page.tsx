import { MaxWidthWrapper } from "@/components/max-width-wrapper";
import { SectionWrapper } from "@/components/section-wrapper";
import { SendMessageButton } from "@/features/telegram/components/send-message-button";

export default function TestPage() {
  return (
    <SectionWrapper>
      <MaxWidthWrapper>
        <SendMessageButton />
      </MaxWidthWrapper>
    </SectionWrapper>
  );
}
