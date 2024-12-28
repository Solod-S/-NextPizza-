"use client";

import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";

import { TFormRegisterValues, formRegisterSchema } from "./schemas";
import { FormInput } from "../../../form";
import { Button } from "@/app/components/ui";
import { registerUser } from "@/app/action";

interface Props {
  onClose?: VoidFunction;
  onClickLogin?: VoidFunction;
}

export const RegisterForm: React.FC<Props> = ({
  onClose,
  // onClickLogin
}) => {
  const form = useForm<TFormRegisterValues>({
    resolver: zodResolver(formRegisterSchema),
    defaultValues: {
      email: "",
      fullName: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: TFormRegisterValues) => {
    try {
      await registerUser({
        email: data.email,
        fullName: data.fullName,
        password: data.password,
        verified: new Date(),
      });
      toast.error("Registration successful 📝. Confirm your email", {
        icon: "✅",
      });
      //

      onClose?.();
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      return toast.error("Incorrect email or password", {
        icon: "❌",
      });
    }
  };

  return (
    <FormProvider {...form}>
      <form
        className="flex flex-col gap-5"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormInput name="email" label="E-Mail" required />
        <FormInput name="fullName" label="Name" required />
        <FormInput name="password" label="Password" type="password" required />
        <FormInput
          name="confirmPassword"
          label="Confirm password"
          type="password"
          required
        />

        <Button
          loading={form.formState.isSubmitting}
          className="h-12 text-base"
          type="submit"
        >
          Register
        </Button>
      </form>
    </FormProvider>
  );
};
