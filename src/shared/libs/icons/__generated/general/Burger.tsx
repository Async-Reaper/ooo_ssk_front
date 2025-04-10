import * as React from "react";
import { SVGAttributes } from "react";

export const BurgerIcon = React.memo(
  ({
    size = 24,
    color = "#9E0348",
    ...props
  }: SVGAttributes<SVGElement> & {
    size?: number,
  }) => {
    return (
      <svg width={size} height={size} fill="#9E0348" {...props}>
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M3.75 6.5h16a.75.75 0 000-1.5h-16a.75.75 0 000 1.5zm0 6h16a.75.75 0 000-1.5h-16a.75.75 0 000 1.5zm0 6h16a.75.75 0 000-1.5h-16a.75.75 0 000 1.5z"
          fill='#9E0348'
        />
      </svg>
    );
  }
);
