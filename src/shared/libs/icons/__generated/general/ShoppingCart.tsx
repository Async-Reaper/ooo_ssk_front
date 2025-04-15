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
          fill={color}
          d="M.8 2.32c0 .4.56.88 1.28 1.04.88.16 2.08 2.48 3.44 6.64l2.08 6.4 5.84.24 5.84.24 1.04-2.64c.64-1.44 1.36-3.84 1.68-5.28l.56-2.56H5.92L5.04 4C4.4 2.4 3.6 1.6 2.48 1.6c-.96 0-1.68.32-1.68.72m7.52 16.96c-.8 1.36 1.04 2.88 2.16 1.76.96-.96.32-2.64-.88-2.64-.4 0-.96.4-1.28.88m8 0c-.8 1.36 1.04 2.88 2.16 1.76.96-.96.32-2.64-.88-2.64-.4 0-.96.4-1.28.88"
        />
      </svg>
    );
  }
);
