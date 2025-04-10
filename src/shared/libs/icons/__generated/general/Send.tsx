import * as React from "react";
import { SVGAttributes } from "react";

export const SendIcon = React.memo(
  ({
    size = 24,
    color = "#4E5361",
    ...props
  }: SVGAttributes<SVGElement> & {
    size?: number,
  }) => {
    return (
      <svg width={size} height={size} fill="none" {...props}>
        <path d="M10.854 15.264L9 17.455V21L19 8l-8.146 7.264z" fill={color} />
        <path
          d="M3 12l5.607 2.99h.006L17 8l-6.225 7.357L12 16.781 18 20l3-17-18 9z"
          fill={color}
        />
      </svg>
    );
  }
);
