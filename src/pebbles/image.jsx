import React, { forwardRef, useState } from "react";
import PropTypes from "prop-types";

const Image = forwardRef(function Image(
  {
    image,            // featured_image_src object
    className,
    eager = false,
    alt: altOverride,
    sizes,            // optional override for sizes attribute
    fallback,         // URL shown if image missing or fails
    ...rest
  },
  ref
) {
  const [errored, setErrored] = useState(false);

  // No image object → show fallback if provided
  if (!image || errored) {
    return fallback ? (
      <img
        ref={ref}
        className={className || "pi-image"}
        src={fallback}
        loading={eager ? "eager" : "lazy"}
        alt={altOverride || ""}
        fetchpriority={eager ? "high" : undefined}
        {...rest}
      />
    ) : null;
  }

  const {
    full,
    sizes: allSizes = {},
    srcset,
    sizes_attribute,
    alt,
    title,
  } = image;

  // Prefer medium_large → large → full
  const preferred = allSizes?.medium_large || allSizes?.large || full || {};
  const src = preferred.url || full?.url;
  const width = preferred.width || full?.width;
  const height = preferred.height || full?.height;

  return (
    <img
      ref={ref}
      className={["pi-image img-fluid", className].filter(Boolean).join(" ")}
      src={src}
      width={width}
      height={height}
      loading={eager ? "eager" : "lazy"}
      fetchpriority={eager ? "high" : undefined}
      srcSet={srcset || undefined}
      sizes={sizes || sizes_attribute || undefined}
      alt={altOverride || alt || title || ""}
      style={{
        aspectRatio: `${(preferred?.width || full?.width) ?? 1} / ${(preferred?.height || full?.height) ?? 1}`
      }}
      onError={() => {
        if (fallback) setErrored(true);
      }}
      {...rest}
    />
  );
});

Image.propTypes = {
  image: PropTypes.shape({
    alt: PropTypes.string,
    title: PropTypes.string,
    full: PropTypes.shape({
      url: PropTypes.string,
      width: PropTypes.number,
      height: PropTypes.number,
    }),
    sizes: PropTypes.object,
    srcset: PropTypes.string,
    sizes_attribute: PropTypes.string,
  }),
  className: PropTypes.string,
  eager: PropTypes.bool,
  alt: PropTypes.string,
  sizes: PropTypes.string,
  fallback: PropTypes.string,
};

export default Image;
