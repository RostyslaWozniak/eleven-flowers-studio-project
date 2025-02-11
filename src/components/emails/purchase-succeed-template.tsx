import * as React from "react";
interface PurchaseSucceedTemplateProps {
  firstName: string | null;
  lastName: string | null;
  price: number | null;
}

export const PurchaseSucceedTemplate: React.FC<
  Readonly<PurchaseSucceedTemplateProps>
> = ({ firstName, lastName, price }) => (
  <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
    <h1>Thank you for your purchase!</h1>
    <p>
      <em>
        Hello {firstName && <strong>{`${firstName} ${lastName}`}</strong>},
      </em>
    </p>
    <p>
      {
        "We're excited to confirm that your order has been successfully processed. Here are the details of your purchase:"
      }
    </p>
    <ul>
      <li>
        <strong>Purchase Date:</strong> <u>{new Date().toDateString()}</u>
      </li>
      {price && (
        <li>
          <strong>Total Amount:</strong> <mark>{price} zł</mark>
        </li>
      )}
    </ul>
    <p>
      {
        "If you have any questions or concerns about your order, please don't hesitate to contact our customer support team."
      }
    </p>
    <blockquote>
      Thank you for choosing our store. We appreciate your business!
    </blockquote>
    <hr />
    <footer>
      <p>
        &copy; <small>2025 Eleven Flower Studio. All rights reserved.</small>
      </p>
      <address>
        ul. Nocznickiego 25 lokal u12, 01-948 Warszawa <br />
        <a href="mailto:elevenflowerstudio@gmail.com">
          elevenflowerstudio@gmail.com
        </a>{" "}
        <br />
        <abbr title="Phone">P:</abbr> +48 571 944 969
      </address>
    </footer>
  </div>
);
