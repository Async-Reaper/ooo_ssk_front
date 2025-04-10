import * as React from "react";
import { SVGAttributes } from "react";

export const YoutubeIcon = React.memo(
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
          d="M3.724 4.83c-.955 1.315-.955 3.19-.955 6.94 0 3.749 0 5.624.955 6.938.309.425.682.798 1.106 1.106 1.315.955 3.19.955 6.94.955 3.749 0 5.624 0 6.938-.955a5.003 5.003 0 001.106-1.106c.955-1.314.955-3.189.955-6.939s0-5.624-.955-6.939a5.001 5.001 0 00-1.106-1.106c-1.314-.955-3.189-.955-6.939-.955s-5.624 0-6.939.955A5 5 0 003.724 4.83zm11.312 7.59a.5.5 0 000-.84l-4.804-3.083a.5.5 0 00-.77.42v6.165a.5.5 0 00.77.421l4.804-3.082z"
          fill={color}
        />
      </svg>
    );
  }
);
