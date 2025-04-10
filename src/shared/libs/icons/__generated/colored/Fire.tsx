import * as React from "react";
import { SVGAttributes } from "react";

export const FireIcon = React.memo(
  ({
    size = 24,
    color = "#4E5361",
    ...props
  }: SVGAttributes<SVGElement> & {
    size?: number,
  }) => {
    return (
      <svg width={size} height={size} fill="none" {...props}>
        <g filter="url(#fire_svg__a)">
          <path
            d="M18.575 13.2c-.247-.3-.546-.56-.825-.82-.718-.6-1.532-1.03-2.217-1.66-1.596-1.46-1.95-3.87-.932-5.72-1.018.23-1.907.75-2.668 1.32-2.774 2.08-3.867 5.75-2.56 8.9.043.1.086.2.086.33 0 .22-.16.42-.375.5-.247.1-.504.04-.707-.12a.59.59 0 01-.15-.17c-1.21-1.43-1.403-3.48-.59-5.12C5.85 12 4.875 14.3 5.014 16.47c.064.5.129 1 .31 1.5.15.6.44 1.2.761 1.73 1.157 1.73 3.16 2.97 5.314 3.22 2.292.27 4.745-.12 6.502-1.6 1.96-1.66 2.646-4.32 1.639-6.6l-.14-.26c-.224-.46-.824-1.26-.824-1.26m-3.385 6.3c-.3.24-.793.5-1.178.6-1.2.4-2.4-.16-3.107-.82 1.275-.28 2.035-1.16 2.26-2.05.182-.8-.16-1.46-.3-2.23-.128-.74-.107-1.37.182-2.06.204.38.418.76.675 1.06.825 1 2.121 1.44 2.4 2.8.043.14.064.28.064.43.032.82-.353 1.72-.996 2.27z"
            fill="#ff4200"
          />
        </g>
        <defs>
          <filter
            id="fire_svg__a"
            x={0}
            y={0}
            width={25}
            height={28}
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <feFlood floodOpacity={0} result="BackgroundImageFix" />
            <feColorMatrix
              in="SourceAlpha"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              result="hardAlpha"
            />
            <feOffset />
            <feGaussianBlur stdDeviation={2.5} />
            <feComposite in2="hardAlpha" operator="out" />
            <feColorMatrix values="0 0 0 0 1 0 0 0 0 0.266667 0 0 0 0 0.45098 0 0 0 0.61 0" />
            <feBlend
              in2="BackgroundImageFix"
              result="effect1_dropShadow_144_2"
            />
            <feBlend
              in="SourceGraphic"
              in2="effect1_dropShadow_144_2"
              result="shape"
            />
          </filter>
        </defs>
      </svg>
    );
  }
);
