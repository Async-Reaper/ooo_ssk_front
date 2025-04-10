import * as React from "react";
import { SVGAttributes } from "react";

export const CheckboxIcon = React.memo(
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
          fillRule="evenodd"
          clipRule="evenodd"
          d="M15.9 3C18.95 3 21 5.14 21 8.324v7.352C21 18.86 18.95 21 15.9 21H8.098C5.048 21 3 18.86 3 15.676V8.324C3 5.14 5.048 3 8.098 3h7.803zm0 1.35H8.099c-2.277 0-3.748 1.56-3.748 3.974v7.352c0 2.414 1.472 3.974 3.748 3.974H15.9c2.278 0 3.75-1.56 3.75-3.974V8.324c0-2.414-1.472-3.974-3.75-3.974zm-.22 5.037a.674.674 0 010 .954l-4.27 4.272a.67.67 0 01-.955 0L8.32 12.477a.674.674 0 11.954-.954l1.66 1.658 3.793-3.794a.674.674 0 01.955 0z"
          fill="url(#checkbox_svg__a)"
        />
        <defs>
          <linearGradient
            id="checkbox_svg__a"
            x1={12}
            y1={3}
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
