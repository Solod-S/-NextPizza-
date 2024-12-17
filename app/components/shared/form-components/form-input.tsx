import React from "react";

interface Props {
  name: string;
  label?: string;
  required?: boolean;
  className?: string;
}

export const FormInput: React.FC<Props> = ({ className }) => {
  return <div className={className}></div>;
};
