import * as React from "react";
import { SVGAttributes } from "react";

export const LightningIcon = React.memo(
  ({
    size = 24,
    color = "#4E5361",
    ...props
  }: SVGAttributes<SVGElement> & {
    size?: number,
  }) => {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" {...props}>
        <g fill="none" fillRule="evenodd">
          <path d="M0 0h24v24H0z" />
          <path
            d="M6.862 11.276l4-8A.5.5 0 0111.309 3h5.73a.5.5 0 01.41.787l-2.398 3.426a.5.5 0 00.41.787h1.452a.5.5 0 01.38.825L7.966 19.707c-.368.43-1.054.014-.844-.511l2.604-6.51A.5.5 0 009.26 12H7.31a.5.5 0 01-.447-.724z"
            stroke={color}
            strokeWidth={2}
            strokeLinecap="round"
          />
        </g>
      </svg>
    );
  }
);
