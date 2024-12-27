"use client";

import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
} from "@/app/components/ui";
import { signIn } from "next-auth/react";
import React from "react";
import { LoginForm, RegisterForm } from "./forms";
import { DialogTitle } from "@radix-ui/react-dialog";
// import { LoginForm } from "./forms/login-form";
// import { RegisterForm } from "./forms/register-form";

interface Props {
  open: boolean;
  onClose: () => void;
}

interface ReaderDataProps {
  type: string;
}

const ReaderData: React.FC<ReaderDataProps> = ({ type }) => {
  return (
    <div className="invisible">
      <DialogTitle>{type === "login" ? "Login" : "Register"}</DialogTitle>
      <DialogDescription>
        {type === "login"
          ? "Enter your credentials to log in to your account."
          : "Fill in the required fields to create a new account."}
      </DialogDescription>
    </div>
  );
};

export const AuthModal: React.FC<Props> = ({ open, onClose }) => {
  const [type, setType] = React.useState<"login" | "register">("login");

  const onSwitchType = () => {
    setType(type === "login" ? "register" : "login");
  };

  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <ReaderData type={type} />
      <DialogContent className="w-[450px] bg-white p-10">
        {type === "login" ? (
          <LoginForm onClose={handleClose} />
        ) : (
          <RegisterForm onClose={handleClose} />
        )}

        <hr />
        <div className="flex gap-2">
          <Button
            variant="secondary"
            onClick={() =>
              signIn("github", {
                callbackUrl: "/",
                redirect: true,
              })
            }
            type="button"
            className="gap-2 h-12 p-2 flex-1"
          >
            <img
              className="w-6 h-6"
              src="https://github.githubassets.com/favicons/favicon.svg"
            />
            GitHub
          </Button>

          <Button
            variant="secondary"
            onClick={() =>
              signIn("google", {
                callbackUrl: "/",
                redirect: true,
              })
            }
            type="button"
            className="gap-2 h-12 p-2 flex-1"
          >
            <img
              className="w-6 h-6"
              src="https://fonts.gstatic.com/s/i/productlogos/googleg/v6/24px.svg"
            />
            Google
          </Button>
        </div>

        <Button
          variant="outline"
          onClick={onSwitchType}
          type="button"
          className="h-12"
        >
          {type === "login"
            ? "Don't have an account?"
            : "Already have an account?"}
        </Button>
      </DialogContent>
    </Dialog>
  );
};
