import * as React from "react";
import { SVGAttributes } from "react";

export const SoundIcon = React.memo(
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
          d="M11.5 4C7.364 4 4 7.364 4 11.5v3.107C4 15.375 4.673 16 5.5 16h.75a.75.75 0 00.75-.75v-3.857a.75.75 0 00-.75-.75h-.681C5.986 7.74 8.483 5.5 11.5 5.5s5.514 2.24 5.931 5.143h-.681a.75.75 0 00-.75.75V16c0 .827-.673 1.5-1.5 1.5H13v-.75h-3V19h4.5c1.654 0 3-1.346 3-3 .827 0 1.5-.625 1.5-1.393V11.5C19 7.364 15.636 4 11.5 4z"
          fill={color}
        />
      </svg>
    );
  }
);
