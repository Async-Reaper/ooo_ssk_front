import * as React from "react";
import { SVGAttributes } from "react";

export const EyeIcon = React.memo(
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
          d="M11.999 8C8.37 8 5.135 9.753 3 12.496c2.135 2.743 5.37 4.496 8.999 4.496 3.627 0 6.867-1.753 9.001-4.496C18.865 9.753 15.626 8 11.999 8zm-6.15 4.496a7.956 7.956 0 016.114-2.858 2.858 2.858 0 000 5.717 7.963 7.963 0 01-6.113-2.859zm4.899 0a1.226 1.226 0 112.452-.002 1.226 1.226 0 01-2.452.002zm1.237 2.86h-.007a2.86 2.86 0 000-5.72h.007a7.959 7.959 0 016.135 2.86 7.959 7.959 0 01-6.135 2.86z"
          fill={color}
        />
      </svg>
    );
  }
);
