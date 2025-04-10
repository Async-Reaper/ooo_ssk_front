import * as React from "react";
import { SVGAttributes } from "react";

export const UsersIcon = React.memo(
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
          d="M21.696 14.409a4.812 4.812 0 004.797-4.798 4.812 4.812 0 00-4.797-4.797 4.812 4.812 0 00-4.798 4.797 4.812 4.812 0 004.798 4.798zm0-6.397c.88 0 1.599.72 1.599 1.6 0 .879-.72 1.598-1.6 1.598-.879 0-1.598-.72-1.598-1.599 0-.88.72-1.599 1.599-1.599z"
          fill="url(#users_svg__a)"
          fillOpacity={0.58}
        />
        <path
          d="M21.793 16.008a6.282 6.282 0 00-4.702 2.143 1.61 1.61 0 00.144 2.255c.655.576 1.679.527 2.255-.144a3.065 3.065 0 012.303-1.056c1.71 0 3.118 1.44 3.118 3.215v5.597c0 .88.72 1.6 1.6 1.6.879 0 1.598-.72 1.598-1.6v-5.597c0-3.534-2.83-6.413-6.317-6.413z"
          fill="url(#users_svg__b)"
          fillOpacity={0.58}
        />
        <path
          d="M8.807 14.425a7.214 7.214 0 007.212-7.213A7.214 7.214 0 008.807 0a7.214 7.214 0 00-7.213 7.212 7.214 7.214 0 007.213 7.213zm0-11.21a4.017 4.017 0 014.014 4.013 4.006 4.006 0 01-4.014 4.014 4.006 4.006 0 01-4.014-4.014 4.006 4.006 0 014.014-4.014z"
          fill="url(#users_svg__c)"
          fillOpacity={0.58}
        />
        <path
          d="M8.887 16.008c-4.414 0-7.996 3.71-7.996 8.252v6.14c0 .88.72 1.6 1.599 1.6.88 0 1.599-.72 1.599-1.6v-6.14c0-2.783 2.159-5.054 4.798-5.054 2.638 0 4.797 2.271 4.797 5.054v6.14c0 .88.72 1.6 1.6 1.6.879 0 1.599-.72 1.599-1.6v-6.14c0-4.558-3.583-8.252-7.996-8.252z"
          fill="url(#users_svg__d)"
          fillOpacity={0.58}
        />
        <defs>
          <linearGradient
            id="users_svg__a"
            x1={21.696}
            y1={2.442}
            x2={21.696}
            y2={13.87}
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#FBE750" />
            <stop offset={1} stopColor="#FAAE23" stopOpacity={0.13} />
          </linearGradient>
          <linearGradient
            id="users_svg__b"
            x1={22.404}
            y1={12.644}
            x2={22.404}
            y2={28.853}
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#FBE750" />
            <stop offset={1} stopColor="#FAAE23" stopOpacity={0.13} />
          </linearGradient>
          <linearGradient
            id="users_svg__c"
            x1={8.807}
            y1={-3.566}
            x2={8.807}
            y2={13.614}
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#FBE750" />
            <stop offset={1} stopColor="#FAAE23" stopOpacity={0.13} />
          </linearGradient>
          <linearGradient
            id="users_svg__d"
            x1={8.887}
            y1={12.055}
            x2={8.887}
            y2={31.102}
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#FBE750" />
            <stop offset={1} stopColor="#FAAE23" stopOpacity={0.13} />
          </linearGradient>
        </defs>
      </svg>
    );
  }
);
