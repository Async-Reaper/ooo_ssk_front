import * as React from "react";
import { SVGAttributes } from "react";

export const UpgradeIcon = React.memo(
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
          d="M10 4.167a1.25 1.25 0 100-2.5 1.25 1.25 0 000 2.5zm0 14.166a1.25 1.25 0 100-2.5 1.25 1.25 0 000 2.5zM2.917 11.25a1.25 1.25 0 100-2.5 1.25 1.25 0 000 2.5zm14.166 0a1.25 1.25 0 100-2.5 1.25 1.25 0 000 2.5z"
          fill={color}
          stroke={color}
          strokeWidth={1.5}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M10.082 7.31c1.275 0 2.426-.53 3.244-1.382a5.3 5.3 0 01.757.718 4.49 4.49 0 00-1.5 3.354 4.49 4.49 0 001.59 3.433c-.188.23-.396.444-.62.64a4.491 4.491 0 00-3.47-1.636 4.49 4.49 0 00-3.462 1.624 5.307 5.307 0 01-.693-.735 4.488 4.488 0 001.382-3.244 4.49 4.49 0 00-1.371-3.234c.265-.339.57-.644.909-.91a4.488 4.488 0 003.234 1.372z"
          stroke={color}
          strokeWidth={1.5}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }
);
