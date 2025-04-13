// primitives.tsx
import React from "react";

export const title = (props: { color?: string }) => {
  const { color = "default" } = props;
  return `text-${color} font-bold text-3xl md:text-4xl`;
};

export const subtitle = (props: { class?: string }) => {
  const { class: className = "" } = props;
  return `font-normal text-lg md:text-xl ${className}`;
};
