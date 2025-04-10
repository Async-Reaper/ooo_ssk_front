import * as React from "react";
import { SVGAttributes } from "react";

export const PointIcon = React.memo(
  ({
    size = 24,
    color = "#4E5361",
    ...props
  }: SVGAttributes<SVGElement> & {
    size?: number,
  }) => {
    return (
      <svg width={size} height={size} fill="none" {...props}>
        <circle cx={11.5} cy={11.5} r={5.5} fill={color} />
      </svg>
    );
  }
);
