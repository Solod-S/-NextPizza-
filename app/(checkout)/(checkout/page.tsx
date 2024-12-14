import { Container, Title, WhiteBlock } from "@/app/components/shared";
import { Input, Textarea } from "@/app/components/ui";

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
          <WhiteBlock title="1. Cart">111</WhiteBlock>
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
              <Input name="email" className="text-base" placeholder="E-Mail" />
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
        <div className="w-[450px]">1222</div>
      </div>
    </Container>
  );
}
