import { type Locale } from "@/i18n/routing";
import { formatPrice } from "@/lib/utils";
import { getTranslations } from "next-intl/server";
import * as React from "react";
interface PurchaseSucceedTemplateProps {
  name: string | null;
  price: number | null;
  locale: Locale;
  order: {
    createdAt: Date;
    deliveryPrice: number;
    items: {
      productName: string;
      size: string;
      quantity: number;
      price: number | null;
    }[];
  };
}

export const PurchaseSucceedTemplate = async ({
  name,
  price,
  locale,
  order,
}: PurchaseSucceedTemplateProps) => {
  const t = await getTranslations({
    namespace: "emails.purchase_success",
    locale,
  });
  return (
    <div
      style={{
        fontFamily: "manrope, Arial, sans-serif",
        backgroundColor: "#fff",
        padding: "30px 15px",
      }}
    >
      <div
        style={{
          maxWidth: "620px",
          margin: "0 auto",
          backgroundColor: "#ffffff",
          borderRadius: "14px",
          border: "1px solid #e6e0eb",
          boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
          overflow: "hidden",
        }}
      >
        {/* HEADER */}
        <div
          style={{
            backgroundColor: "#1E5F85",
            padding: "20px",
            textAlign: "center",
            color: "#ffffff",
          }}
        >
          <h2
            style={{
              margin: 0,
              fontWeight: "600",
              fontSize: "24px",
              fontFamily: "philosopher, Arial, sans-serif",
            }}
          >
            Eleven Flower Studio
          </h2>
          <p style={{ margin: "5px 0 0 0", fontSize: "14px", opacity: 0.9 }}>
            {t("purchase_details.title")}
          </p>
        </div>

        {/* CONTENT */}
        <div style={{ padding: "25px" }}>
          <p
            style={{
              fontSize: "18px",
              color: "#1E5F85",
              marginTop: 0,
            }}
          >
            {t("greeting", { name: name ?? null })}
          </p>

          <p
            style={{
              fontSize: "16px",
              lineHeight: "1.6",
              color: "#444",
              marginBottom: "8px",
            }}
          >
            {t("purchase_details.message")}
          </p>

          {/* PRODUCT LIST */}
          <ul
            style={{
              listStyle: "none",
              padding: 0,
              margin: 0,
            }}
          >
            {order.items.map(({ productName, quantity, size, price }, i) => (
              <li
                key={i}
                style={{
                  backgroundColor: "#ffffff",
                  padding: "14px 16px",
                  borderRadius: "10px",
                  marginBottom: "12px",
                  border: "1px solid #eee",
                }}
              >
                <div>
                  <p
                    style={{
                      margin: 0,
                      fontSize: "16px",
                      fontWeight: "600",
                      color: "#222",
                    }}
                  >
                    {productName}
                  </p>

                  <p
                    style={{
                      margin: "4px 0 0 0",
                      fontSize: "14px",
                      color: "#777",
                    }}
                  >
                    {t("purchase_details.size")}{" "}
                    <span
                      style={{
                        fontWeight: "bold",
                        textTransform: "capitalize",
                      }}
                    >
                      {size}
                    </span>
                  </p>
                </div>

                <div
                  style={{
                    fontSize: "16px",
                    fontWeight: "bold",
                    color: "#555",
                  }}
                >
                  <p style={{ textAlign: "end" }}>× {quantity}</p>
                  <p>{formatPrice(price)}</p>
                </div>
              </li>
            ))}
            <li
              style={{
                backgroundColor: "#ffffff",
                padding: "14px 16px",
                borderRadius: "10px",
                marginBottom: "12px",
                border: "1px solid #eee",
              }}
            >
              <div>
                <p
                  style={{
                    margin: 0,
                    fontSize: "16px",
                    fontWeight: "600",
                    color: "#222",
                  }}
                >
                  {t("purchase_details.delivery")}{" "}
                </p>
              </div>

              <div
                style={{
                  fontSize: "16px",
                  fontWeight: "bold",
                  color: "#222",
                  position: "absolute",
                  right: "16px",
                  top: "50%",
                  translate: "0 -50%",
                }}
              >
                <p> {formatPrice(order.deliveryPrice)}</p>
              </div>
            </li>
          </ul>
          {/* ORDER INFO */}
          <div
            style={{
              backgroundColor: "#F0F7F5",
              padding: "15px",
              borderRadius: "8px",
              marginTop: "20px",
              marginBottom: "20px",
              border: "1px solid #eee",
            }}
          >
            <p style={{ margin: "5px 0", fontSize: "15px" }}>
              <strong>{t("purchase_details.date")}:</strong>{" "}
              {order.createdAt.toLocaleDateString()}
            </p>

            {price && (
              <p style={{ margin: "5px 0", fontSize: "15px" }}>
                <strong>{t("purchase_details.amount", { price })}</strong>
              </p>
            )}
          </div>

          {/* SUPPORT TEXT */}
          <p
            style={{
              fontSize: "15px",
              marginTop: "25px",
              color: "#555",
            }}
          >
            {t("support")}
          </p>

          {/* APPRECIATION */}
          <blockquote
            style={{
              fontSize: "16px",
              fontStyle: "italic",
              color: "#1E5F85",
              borderLeft: "4px solid #1E5F85",
              paddingLeft: "12px",
              margin: "20px 0",
            }}
          >
            {t("appreciation")}
          </blockquote>
        </div>

        {/* FOOTER */}
        <div
          style={{
            backgroundColor: "#F0F7F5",
            padding: "20px",
            textAlign: "center",
            fontSize: "14px",
            color: "#111",
            borderTop: "1px solid #eee",
          }}
        >
          <p style={{ margin: "0 0 10px 0" }}>
            &copy; 2025 Eleven Flower Studio. {t("copyright")}
          </p>

          <div style={{ lineHeight: "1.6" }}>
            ul. Nocznickiego 25 lokal u12, 01-948 Warszawa <br />
            <a
              href="mailto:elevenflowerstudio@gmail.com"
              style={{
                color: "#1E5F85",
                textDecoration: "none",
                fontWeight: "bold",
              }}
            >
              elevenflowerstudio@gmail.com
            </a>
            <br />
            📞 +48 571 944 969
          </div>
        </div>
      </div>
    </div>
  );
};
