import * as React from "react";
import { SVGAttributes } from "react";

export const CloseIcon = React.memo(
  ({
    size = 24,
    color = "#4E5361",
    ...props
  }: SVGAttributes<SVGElement> & {
    size?: number,
  }) => {
    return (
      <svg width={size} height={size} fill="none" {...props}>
        <rect
          width={15.273}
          height={1.697}
          rx={0.849}
          transform="rotate(45 -3.643 11.691)"
          fill={color}
        />
        <rect
          width={15.273}
          height={1.697}
          rx={0.849}
          transform="rotate(135 7.509 7.328)"
          fill={color}
        />
      </svg>
    );
  }
);
