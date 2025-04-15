import * as React from "react";
import { SVGAttributes } from "react";

export const MinusIcon = React.memo(
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
          d="M21.672 13.094l-8.09-.01-.001.001-10.746.009a1.33 1.33 0 01-1.237-.826 1.334 1.334 0 011.237-1.85l10.747.01 8.09-.009a1.338 1.338 0 010 2.675"
        />
      </svg>
    );
  }
);
