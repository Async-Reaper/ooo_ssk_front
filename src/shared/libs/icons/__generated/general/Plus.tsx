import * as React from "react";
import { SVGAttributes } from "react";

export const PlusIcon = React.memo(
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
          d="M13.642 13.64l8.09.01a1.338 1.338 0 000-2.675l-8.09.009.01-8.09a1.338 1.338 0 10-2.676 0l.01 8.09-8.091-.01a1.334 1.334 0 00-1.237 1.85 1.333 1.333 0 001.237.826l8.09-.01-.009 8.091a1.332 1.332 0 001.338 1.338 1.332 1.332 0 001.337-1.338l-.01-8.09z"
          fill={color}
        />
      </svg>
    );
  }
);
