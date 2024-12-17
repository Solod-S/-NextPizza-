"use client";
import {
  CheckoutItem,
  CheckoutSidebar,
  Container,
  Title,
  WhiteBlock,
} from "@/app/components/shared";
import { Input, Textarea } from "@/app/components/ui";
import { PizzaSize, PizzaType } from "@/shared/constants/pizza";
import { useCart } from "@/shared/hooks";
import { getCartItemDetails } from "@/shared/lib";

export default function Checkout() {
  const { totalAmount, items, updateItemQuantity, removeCartItem, loading } =
    useCart();

  const onClickCountButton = (
    id: number,
    quantity: number,
    type: "plus" | "minus"
  ) => {
    const newQuantity = type === "plus" ? quantity + 1 : quantity - 1;
    updateItemQuantity(id, newQuantity);
  };

  return (
    <Container>
      <Title
        text="Placing an order"
        className="font-extrabold mb-10 text-[36px]"
      />
      <div className="flex gap-10">
        {/* Левая часть*/}
        <div className="flex flex-col gap-10 flex-1 mb-20">
          <WhiteBlock title="1. Cart">
            <div className="flex flex-col gap-5">
              {items.map(item => (
                <CheckoutItem
                  loading={loading}
                  disabled={item.disabled}
                  key={item.id}
                  id={item.id}
                  imageUrl={item.imageUrl}
                  details={getCartItemDetails(
                    item.ingredients,
                    item.pizzaType as PizzaType,
                    item.pizzaSize as PizzaSize
                  )}
                  name={item.name}
                  price={Number(item.price.toFixed(2))}
                  quantity={item.quantity}
                  onClickCountButton={type =>
                    onClickCountButton(item.id, item.quantity, type)
                  }
                  onClickRemove={() => removeCartItem(item.id)}
                />
              ))}
            </div>
          </WhiteBlock>

          <WhiteBlock title="2. Personal data">
            <div className="grid grid-cols-2 gap-5">
              <Input
                name="firstName"
                className="text-base"
                placeholder="Name"
              />
              <Input
                name="lastName"
                className="text-base"
                placeholder="Last Name"
              />
              <Input name="email" className="text-base" placeholder="Email" />
              <Input name="phone" className="text-base" placeholder="Phone" />
            </div>
          </WhiteBlock>
          <WhiteBlock title="3. Delivery address">
            <div className="flex flex-col gap-5">
              <Input
                name="address"
                className="text-base"
                placeholder="Address"
              />
              <Textarea
                className="text-base"
                placeholder="Comments on the order"
                rows={5}
              />
            </div>
          </WhiteBlock>
        </div>
        {/* Правая часть*/}
        <div className="w-[450px]">
          <CheckoutSidebar totalAmount={totalAmount} />
        </div>
      </div>
    </Container>
  );
}
