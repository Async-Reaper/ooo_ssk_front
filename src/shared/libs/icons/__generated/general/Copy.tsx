import * as React from "react";
import { SVGAttributes } from "react";

export const CopyIcon = React.memo(
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
          d="M5.046 2h8.712c.127 0 .24.06.309.154l4.841 5.663a.38.38 0 01.091.246l.001 12.9c0 .283-.119.542-.308.73l-.002.002a1.05 1.05 0 01-.736.305H5.046c-.285 0-.547-.117-.737-.305l-.002-.002a1.028 1.028 0 01-.307-.73V3.037c0-.285.118-.543.307-.731l.002-.002c.19-.187.45-.304.737-.304zm8.239.637h.393l4.691 5.517v.182c-5.865.192-5.48-.238-5.084-5.7z"
          fill={color}
        />
      </svg>
    );
  }
);
