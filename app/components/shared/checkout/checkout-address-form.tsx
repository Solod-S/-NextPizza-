import React from "react";
import { WhiteBlock } from "../white-bock";

import { Input } from "../../ui";
import { FormTextarea } from "../form";
import { AddressInput } from "../address-input";

interface Props {
  className?: string;
}

export const CheckoutAddressForm: React.FC<Props> = ({ className }) => {
  return (
    <WhiteBlock title="3. Delivery address" className={className}>
      <div className="flex flex-col gap-5">
        <Input name="address" className="text-base" placeholder="Address" />
        <AddressInput />
        <FormTextarea
          name="comment"
          className="text-base"
          placeholder="Comments on the order"
          rows={5}
        />
      </div>
    </WhiteBlock>
  );
};
