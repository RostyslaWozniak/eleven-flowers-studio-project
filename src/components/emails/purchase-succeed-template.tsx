import { type Locale } from "@/i18n/routing";
import { getTranslations } from "next-intl/server";
import * as React from "react";
interface PurchaseSucceedTemplateProps {
  name: string | null;
  price: number | null;
  locale: Locale;
}

export const PurchaseSucceedTemplate: React.FC<
  Readonly<PurchaseSucceedTemplateProps>
> = async ({ name, price, locale }) => {
  const t = await getTranslations({
    namespace: "emails.purchase_success",
    locale,
  });
  return (
    <div
      style={{
        fontFamily: "Arial, sans-serif",
        color: "#333",
        backgroundColor: "#f8f8f8",
        padding: "20px",
        borderRadius: "10px",
        maxWidth: "600px",
        margin: "auto",
        border: "1px solid #ddd",
      }}
    >
      <p style={{ fontSize: "18px", fontStyle: "italic", color: "#7d4c8b" }}>
        <em>{t("greeting", { name: name ?? null })}</em>
      </p>

      <p style={{ fontSize: "20px", fontWeight: "bold", color: "#5a3d5c" }}>
        {t("purchase_details.title")}
      </p>

      <p style={{ fontSize: "16px", lineHeight: "1.5" }}>
        {t("purchase_details.message")}
      </p>

      <ul style={{ listStyleType: "none", padding: 0 }}>
        <li style={{ fontSize: "16px" }}>
          <strong>{t("purchase_details.date")}</strong>{" "}
          <u>{new Date().toDateString()}</u>
        </li>
        {price && (
          <li style={{ fontSize: "16px" }}>
            <strong>{t("purchase_details.amount", { price })}</strong>
          </li>
        )}
      </ul>

      <p style={{ fontSize: "16px" }}>{t("support")}</p>

      <blockquote
        style={{
          fontSize: "16px",
          fontStyle: "italic",
          color: "#7d4c8b",
          borderLeft: "4px solid #7d4c8b",
          paddingLeft: "10px",
          marginLeft: "0",
        }}
      >
        {t("appreciation")}
      </blockquote>

      <hr
        style={{
          border: "none",
          borderTop: "1px solid #ddd",
          margin: "20px 0",
        }}
      />

      <footer style={{ textAlign: "center", fontSize: "14px", color: "#666" }}>
        <p>
          &copy; <small>2025 Eleven Flower Studio. {t("copyright")}</small>
        </p>
        <address>
          ul. Nocznickiego 25 lokal u12, 01-948 Warszawa <br />
          <a
            href="mailto:elevenflowerstudio@gmail.com"
            style={{ color: "#7d4c8b", textDecoration: "none" }}
          >
            elevenflowerstudio@gmail.com
          </a>
          <br />
          <abbr title="Phone">📞</abbr> +48 571 944 969
        </address>
      </footer>
    </div>
  );
};
