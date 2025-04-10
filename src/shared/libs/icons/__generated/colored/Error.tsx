import * as React from "react";
import { SVGAttributes } from "react";

export const ErrorIcon = React.memo(
  ({
    size = 24,
    color = "#802564",
    ...props
  }: SVGAttributes<SVGElement> & {
    size?: number,
  }) => {
    return (
      <svg width={size} height={size} fill="none" {...props}>
        <path
          d="M16.078 13.333l4.078-5c.844-1 2.47-3.874 1.344-5-1.126-1.126-4.14.874-5.267 2L12 9.255 7.922 5.177a2.883 2.883 0 00-4.077 4.078l4.077 4.078L5 17.41c-1.126 1.126-1.126 2.296 0 3.422 1.126 1.126 2.374.626 3.5-.5L12 17.41l3.5 2.922c1.126 1.126 2.874 1.626 4 .5s1.626-1.874.5-3l-3.922-4.5z"
          fill="url(#error_svg__a)"
        />
        <defs>
          <linearGradient
            id="error_svg__a"
            x1={8}
            y1={8}
            x2={12}
            y2={21}
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#0FA5A7" />
            <stop offset={1} stopColor="#FF044E" />
          </linearGradient>
        </defs>
      </svg>
    );
  }
);
