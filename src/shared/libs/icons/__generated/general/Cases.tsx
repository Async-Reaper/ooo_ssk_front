import * as React from "react";
import { SVGAttributes } from "react";

export const CasesIcon = React.memo(
  ({
    size = 24,
    color = "#4E5361",
    ...props
  }: SVGAttributes<SVGElement> & {
    size?: number,
  }) => {
    return (
      <svg width={size} height={size} fill="none" {...props}>
        <g
          clipPath="url(#cases_svg__a)"
          stroke={color}
          strokeWidth={1.5}
          strokeLinejoin="round"
        >
          <path
            clipRule="evenodd"
            d="M2.5 6.25h15l-.833 11.25H3.333L2.5 6.25z"
          />
          <path d="M6.667 7.917V2.5h6.666v5.417" strokeLinecap="round" />
        </g>
        <defs>
          <clipPath id="cases_svg__a">
            <path fill="#fff" d="M0 0h20v20H0z" />
          </clipPath>
        </defs>
      </svg>
    );
  }
);
