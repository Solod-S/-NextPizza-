import { API_BASE_URL } from "@/shared/constants";
import React from "react";

interface Props {
  code: string;
}

export const VerificationUserTemplate: React.FC<Props> = ({ code }) => (
  <div>
    <p>
      Verification code: <h2>{code}</h2>
    </p>

    <p>
      <a href={`${API_BASE_URL}/api/auth/verify?code=${code}`}>
        Confirm registration
      </a>
    </p>
  </div>
);
