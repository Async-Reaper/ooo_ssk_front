import * as React from "react";
import { SVGAttributes } from "react";

export const WalletIcon = React.memo(
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
          d="M15.953 5.757L14.36 3.029a.564.564 0 00-.774-.2L8.717 5.75l7.235.007z"
          fill={color}
        />
        <path
          d="M5.25 6.5a.752.752 0 01-.75-.75c0-.412.338-.75.75-.75h2.527l2.506-1.5H5.25c-1.11 0-2.033.81-2.212 1.875-.015.06-.038.12-.038.188V17a2.257 2.257 0 002.25 2.25H18c.825 0 1.5-.675 1.5-1.5v-1.5h-1.875a3.38 3.38 0 01-3.375-3.375A3.38 3.38 0 0117.625 9.5H19.5V8c0-.825-.675-1.5-1.5-1.5H5.25zm12-1.5c0-.758-.563-1.388-1.297-1.485L17.25 5.75V5z"
          fill={color}
        />
        <path
          d="M20.438 10.625h-2.813c-1.24 0-2.25 1.01-2.25 2.25s1.01 2.25 2.25 2.25h2.813c.31 0 .562-.252.562-.563v-3.374a.563.563 0 00-.563-.563zm-2.813 3a.75.75 0 110-1.5.75.75 0 010 1.5z"
          fill={color}
        />
      </svg>
    );
  }
);
