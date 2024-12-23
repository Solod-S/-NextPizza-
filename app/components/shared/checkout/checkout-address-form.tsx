"use client";
// TODO TEMP
import React from "react";
import { WhiteBlock } from "../white-bock";

import { FormTextarea } from "../form";
import { AddressInput } from "../address-input";
import { Controller, useFormContext } from "react-hook-form";
import { ErrorText } from "../error-text";

interface Props {
  className?: string;
}

export const CheckoutAddressForm: React.FC<Props> = ({ className }) => {
  const { control } = useFormContext();

  return (
    <WhiteBlock title="3. Delivery address" className={className}>
      <div className="flex flex-col gap-5">
        <Controller
          control={control}
          name="address"
          render={({ field, fieldState }) => (
            <>
              <AddressInput onChange={field.onChange} />
              {fieldState.error?.message && (
                <ErrorText text={fieldState.error.message} />
              )}
            </>
          )}
        />
        {/* альтернативный метод настройки реакт хук форм для компонента */}
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
