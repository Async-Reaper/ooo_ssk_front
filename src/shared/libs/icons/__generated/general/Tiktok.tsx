import * as React from "react";
import { SVGAttributes } from "react";

export const TiktokIcon = React.memo(
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
          fillRule="evenodd"
          clipRule="evenodd"
          d="M6.224 21.08c3.841.409 7.715.409 11.556 0a3.28 3.28 0 002.913-2.917c.41-3.842.41-7.715 0-11.557a3.28 3.28 0 00-2.917-2.912 54.466 54.466 0 00-11.556 0A3.28 3.28 0 003.307 6.61a54.466 54.466 0 000 11.556 3.28 3.28 0 002.917 2.912zm1.88-4.12a3.59 3.59 0 002.539 1.051 3.592 3.592 0 003.586-3.59v-3.705a3.55 3.55 0 001.841.51h.883V9.479h-.877a1.84 1.84 0 01-1.84-1.84v-.876h-1.752v7.663a1.841 1.841 0 11-1.841-1.841h.876v-1.752h-.876a3.59 3.59 0 00-2.538 6.128z"
          fill={color}
        />
      </svg>
    );
  }
);
