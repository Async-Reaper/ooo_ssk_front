import * as React from "react";
import { SVGAttributes } from "react";

export const ArrowIcon = React.memo(
  ({
    size = 24,
    color = "#4E5361",
    ...props
  }: SVGAttributes<SVGElement> & {
    size?: number,
  }) => {
    return (
      <svg width={size} height={size} fill="none" {...props}>
        <g clipPath="url(#arrow_svg__a)">
          <path
            d="M16.019 7l-.812.81 3.6 3.608H3v1.147h15.808l-3.6 3.608.811.81L21 11.99 16.019 7z"
            fill={color}
          />
        </g>
        <defs>
          <clipPath id="arrow_svg__a">
            <path fill="#fff" transform="translate(3 7)" d="M0 0h18v9.983H0z" />
          </clipPath>
        </defs>
      </svg>
    );
  }
);
