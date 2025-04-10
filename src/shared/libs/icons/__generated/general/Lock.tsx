import * as React from "react";
import { SVGAttributes } from "react";

export const LockIcon = React.memo(
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
          d="M5.28 3.116l14.108 8.145a.853.853 0 010 1.478L5.28 20.884A.853.853 0 014 20.145V3.855a.853.853 0 011.28-.74z"
          fill={color}
        />
        <path
          d="M19.388 11.261L5.28 3.116a.856.856 0 00-.262-.095l13.64 7.875a.853.853 0 010 1.478L4.549 20.519a.838.838 0 01-.393.11.85.85 0 001.124.255l14.108-8.145a.853.853 0 000-1.478z"
          fill={color}
        />
        <path
          d="M5.28 3.116l14.108 8.145a.853.853 0 010 1.478L5.28 20.884A.853.853 0 014 20.145V3.855a.853.853 0 011.28-.74z"
          fill={color}
          stroke={color}
          strokeMiterlimit={10}
        />
      </svg>
    );
  }
);
