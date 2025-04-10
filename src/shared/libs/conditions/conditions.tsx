import { ReactNode } from "react";

interface ConditionsProps {
  condition: any;
  children: ReactNode
}

const Component = ({ condition, children }: ConditionsProps) => {
  if (condition) {
    return children;
  }
  return null;
};

export const Conditions = Component;
