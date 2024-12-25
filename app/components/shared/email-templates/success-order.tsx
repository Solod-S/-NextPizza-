import { CartItemDTO } from "@/shared/services/dto/cart.dto";
import * as React from "react";

interface Props {
  orderId: string;
  totalAmount: string;
  items: CartItemDTO[];
}

export const SuccessOrderTemplate: React.FC<Readonly<Props>> = ({
  orderId,
  totalAmount,
  items,
}) => (
  <div>
    <h1>Order #{orderId} Paid Successfully!</h1>
    <p>
      Thank you for your payment of <b>{totalAmount}$</b>. Your order has been
      processed successfully.
    </p>
    <ul>
      {items &&
        items.length > 0 &&
        items.map(item => (
          <li key={item.id}>
            {item.productItem.product.name} | {item.productItem.price} $ x{" "}
            {item.quantity} pcs = {item.productItem.price * item.quantity} $
          </li>
        ))}
    </ul>
    <p>We appreciate your business and hope to serve you again!</p>
  </div>
);
