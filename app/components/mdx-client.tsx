"use client";
import { CustomMDX } from "./mdx";
import ZoomableImage from "./image/zoomable-image";

export default function MDXClient({ source, components = {} }) {
  return (
    <CustomMDX
      source={source}
      components={{
        Image: ZoomableImage,
        ...components,
      }}
    />
  );
}
