import {
  CheckoutItem,
  CheckoutSidebar,
  Container,
  Title,
  WhiteBlock,
} from "@/app/components/shared";
import { Button, Input, Textarea } from "@/app/components/ui";
import { ArrowRight, Package, Percent, Truck } from "lucide-react";

export default function Checkout() {
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
              <CheckoutItem
                id={0}
                imageUrl={
                  "https://media.dodostatic.net/image/r:292x292/11EE7D60FDA22358AC33C6A44EB093A2.avif"
                }
                details={"Lorem ipsum dolor sit amet, consectetur adip"}
                name={"Ham and cheese"}
                price={33}
                quantity={3}
              />
              <CheckoutItem
                id={1}
                imageUrl={
                  "https://media.dodostatic.net/image/r:292x292/11EE7D60FDA22358AC33C6A44EB093A2.avif"
                }
                details={"Lorem ipsum dolor sit amet, consectetur adip"}
                name={"Ham and cheese"}
                price={33}
                quantity={3}
              />
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
          <WhiteBlock className="p-6 sticky top-4">
            <div className="flex flex-col gap-1">
              <span className="text-xl">Total</span>
              <span className="text-[34px] font-extrabold">335 $</span>
            </div>
            <CheckoutSidebar
              title={
                <div className="flex items-center">
                  <Package size={18} className="mr-2 text-gray-300" />
                  Product cost
                </div>
              }
              value="300"
            />
            <CheckoutSidebar
              title={
                <div className="flex items-center">
                  <Percent size={18} className="mr-2 text-gray-300" />
                  Taxes
                </div>
              }
              value="10"
            />
            <CheckoutSidebar
              title={
                <div className="flex items-center">
                  <Truck size={18} className="mr-2 text-gray-300" />
                  Delivery
                </div>
              }
              value="25"
            />
            <Button
              type="submit"
              // disabled={totalAmount || submitting}
              className="w-full h-14 rounded-2xl mt-6 text-base font-bold"
            >
              Proceed to payment
              <ArrowRight className="w-5 ml-2" />
            </Button>
          </WhiteBlock>
        </div>
      </div>
    </Container>
  );
}
