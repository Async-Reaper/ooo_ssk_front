import * as React from "react";
import { SVGAttributes } from "react";

export const ShoppingCartIcon = React.memo(
  ({
    size = 24,
    color = "#4E5361",
    ...props
  }: SVGAttributes<SVGElement> & {
    size?: number,
  }) => {
    return (
      <svg width={size} height={size} fill="none" {...props}>
        <path
          d="M4 4h2.91l1.948 9.342c.067.321.249.61.515.815.266.205.598.314.94.308h6.069c.341.006.674-.103.94-.308.266-.205.448-.494.514-.815L19 7.488H7.636"
          stroke={color}
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx={16.75} cy={18.75} r={1.75} fill={color} />
        <circle cx={9.75} cy={18.75} r={1.75} fill={color} />
      </svg>
    );
  }
);
