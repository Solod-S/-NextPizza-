import React from "react";
import { WhiteBlock } from "../white-bock";

import { Input, Textarea } from "../../ui";

interface Props {
  className?: string;
}

export const CheckoutAddressForm: React.FC<Props> = ({ className }) => {
  return (
    <WhiteBlock title="3. Delivery address" className={className}>
      <div className="flex flex-col gap-5">
        <Input name="address" className="text-base" placeholder="Address" />
        <Textarea
          className="text-base"
          placeholder="Comments on the order"
          rows={5}
        />
      </div>
    </WhiteBlock>
  );
};