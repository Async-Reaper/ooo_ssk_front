import * as React from "react";
import { SVGAttributes } from "react";

export const LockIcon = React.memo(
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
          d="M17.084 9.945h-.389V7.383C16.695 4.966 14.593 3 12 3 9.407 3 7.305 4.966 7.305 7.383v2.562h-.39C5.858 9.945 5 10.7 5 11.632v7.68C5 20.246 5.857 21 6.916 21h10.168C18.143 21 19 20.245 19 19.313v-7.68c0-.933-.857-1.688-1.916-1.688zM9.343 7.389c0-1.37 1.195-2.48 2.657-2.48s2.657 1.116 2.657 2.48v2.562H9.343V7.39zm3.975 7.592l-.187 2.049h-2.262l-.187-2.049-.058-.672c0-.495.339-.92.821-1.11a1.58 1.58 0 011.109 0c.159.063.296.146.418.253.252.222.404.52.404.857l-.058.672z"
          fill="#FF7E00"
        />
      </svg>
    );
  }
);
