import React from "react";
import { WhiteBlock } from "../white-bock";
import { Input } from "../../ui";
import { FormInput } from "../form";

interface Props {
  className?: string;
}

export const CheckoutPersonalForm: React.FC<Props> = ({ className }) => {
  return (
    <WhiteBlock title="2. Personal data" className={className}>
      <div className="grid grid-cols-2 gap-5">
        <Input name="firstName" className="text-base" placeholder="Name" />
        <Input name="lastName" className="text-base" placeholder="Last Name" />
        <Input name="email" className="text-base" placeholder="Email" />
        <FormInput name="phone" className="text-base" placeholder="Phone" />
      </div>
    </WhiteBlock>
  );
};
