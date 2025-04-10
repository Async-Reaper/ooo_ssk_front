import * as React from "react";
import { SVGAttributes } from "react";

export const StartIcon = React.memo(
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
          d="M20.976 9.959a.503.503 0 00-.48-.35h-5.96l-2.057-6.262a.504.504 0 00-.957 0L9.464 9.609H3.503a.504.504 0 00-.292.914l4.825 3.434-1.942 5.91a.503.503 0 00.77.568L12 16.779l5.135 3.656a.504.504 0 00.77-.568l-1.94-5.91 4.823-3.434a.503.503 0 00.188-.564z"
          fill={color}
        />
      </svg>
    );
  }
);
