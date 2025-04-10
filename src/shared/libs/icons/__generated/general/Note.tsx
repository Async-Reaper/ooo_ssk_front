import * as React from "react";
import { SVGAttributes } from "react";

export const NoteIcon = React.memo(
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
          d="M9.66 4.603c-1.203.198-1.46.976-1.46 1.828v10.545A4.11 4.11 0 007 16.8c-1.657 0-3 .94-3 2.1C4 20.06 5.343 21 7 21s3-.94 3-2.1c0-.106-.015-.21-.037-.312L10 18.6V9.943l9-1.286v7.119a4.11 4.11 0 00-1.2-.176c-1.657 0-3 .94-3 2.1 0 1.16 1.343 2.1 3 2.1 1.598 0 2.9-.875 2.991-1.978l.009.002V3L9.66 4.603z"
          fill={color}
        />
      </svg>
    );
  }
);
