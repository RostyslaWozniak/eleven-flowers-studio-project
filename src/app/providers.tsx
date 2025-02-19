import { type Locale } from "@/i18n/routing";
import { TRPCReactProvider } from "@/trpc/react";
import { type AbstractIntlMessages, NextIntlClientProvider } from "next-intl";
import { NuqsAdapter } from "nuqs/adapters/next/app";

export function Providers({
  children,
  locale,
  messages,
}: {
  children: React.ReactNode;
  locale: Locale;
  messages: AbstractIntlMessages;
}) {
  return (
    <TRPCReactProvider>
      <NuqsAdapter>
        <NextIntlClientProvider messages={messages} locale={locale}>
          {children}{" "}
        </NextIntlClientProvider>
      </NuqsAdapter>
    </TRPCReactProvider>
  );
}
