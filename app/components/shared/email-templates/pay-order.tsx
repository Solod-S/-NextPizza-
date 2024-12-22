import * as React from "react";

interface Props {
  orderId: number;
  totalAmount: number;
  paymentUrl: string;
}

export const PayOrderTemplate: React.FC<Readonly<Props>> = ({
  orderId,
  totalAmount,
  paymentUrl,
}) => (
  <div>
    <h1>Order #{orderId}!</h1>
    <p>
      Pay for the order {totalAmount} $. Follow the{" "}
      <a target="_blank" rel="noopener noreferrer" href={paymentUrl}>
        link
      </a>
      to pay for the order.
    </p>
  </div>
);
