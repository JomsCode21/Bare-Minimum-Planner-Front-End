import type { InputHTMLAttributes, ReactNode } from "react";

export interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  icon?: ReactNode;
  type?: "text" | "email" | "password" | "number";
}

export interface UniversalButtonProps {
  content: string;
  onClick?: () => void;
  type?: "submit" | "button";
  disabled?: boolean;
}
