import React from "react";

interface SignUpPasswordRequirementsProps {
  password: string;
  hasError: boolean;
}

const SignUpPasswordRequirements = ({
  password,
  hasError,
}: SignUpPasswordRequirementsProps) => {
  const lowercaseError = hasError && password.match(/[a-zA-Z]/) === null;
  const numberError = hasError && password.match(/\d/) === null;
  const characterLimitError = hasError && password.match(/.{8,}/) === null;

  return (
    <ul className="password-requirements">
      <li className={lowercaseError ? "error" : ""}>One character</li>
      <li className={numberError ? "error" : ""}>One number</li>
      <li className={characterLimitError ? "error" : ""}>
        8 characters minimum
      </li>
    </ul>
  );
}

export const doesPasswordMatchRequirements = (password: string) => password.match(/^(?=.*\d)(?=.*[a-zA-Z]).{8,}$/) !== null;

export default SignUpPasswordRequirements;
