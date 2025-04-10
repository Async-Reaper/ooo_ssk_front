import * as React from "react";
import { SVGAttributes } from "react";

export const HeadphonesIcon = React.memo(
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
          d="M6.375 13.165v7.795c.184.026.372.04.563.04H7.5v-7.875h-.563c-.19 0-.378.014-.562.04zm10.125-.04V21h.563c.19 0 .378-.014.562-.04v-7.795a3.968 3.968 0 00-.563-.04H16.5zM21 12a9 9 0 10-17.461 3.074 3.938 3.938 0 001.711 5.547v-7.117a3.945 3.945 0 00-.964.649 7.875 7.875 0 1115.429 0 3.985 3.985 0 00-.965-.649v7.117a3.938 3.938 0 001.711-5.547C20.81 14.114 21 13.08 21 12z"
          fill={color}
        />
      </svg>
    );
  }
);
