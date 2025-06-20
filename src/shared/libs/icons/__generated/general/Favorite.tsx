import * as React from "react";
import { SVGAttributes } from "react";

export const FavoriteIcon = React.memo(
  ({
    size = 24,
    color = "#4E5361",
    ...props
  }: SVGAttributes<SVGElement> & {
    size?: number,
  }) => {
    return (
      <svg width={size} height={size} fill="none" {...props}>
        <g clipPath="url(#favorite_svg__a)">
          <path
            fill={color}
            d="M12 0c-.948 0-1.714.67-1.714 1.5v.9c-3.911.694-6.857 3.722-6.857 7.35v.881c0 2.203-.927 4.332-2.599 5.982l-.396.389c-.45.44-.557 1.073-.284 1.612s.89.886 1.564.886h20.572c.675 0 1.285-.347 1.564-.886s.166-1.172-.284-1.612l-.396-.39c-1.672-1.65-2.599-3.773-2.599-5.98V9.75c0-3.628-2.946-6.656-6.857-7.35v-.9C13.714.67 12.948 0 12 0m2.427 23.123c.643-.562 1.002-1.326 1.002-2.123H8.57c0 .797.36 1.56 1.002 2.123.643.563 1.516.877 2.427.877.91 0 1.784-.314 2.427-.877"
          />
        </g>
        <defs>
          <clipPath id="favorite_svg__a">
            <path fill="#fff" d="M0 0h24v24H0z" />
          </clipPath>
        </defs>
      </svg>
    );
  }
);
