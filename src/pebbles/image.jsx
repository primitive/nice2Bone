// function Image({ image, fallback, altFallback = "" }) {
//   if (!image) {
//     return <img src={fallback} alt={altFallback} />;
//   }

//   const { full, srcset, sizes_attribute, alt } = image;

//   return (
//     <img
//       src={full?.url}
//       width={full?.width}
//       height={full?.height}
//       srcSet={srcset || undefined}
//       sizes={sizes_attribute || "(max-width: 768px) 100vw, 768px"}
//       alt={alt || altFallback}
//       loading="lazy"
//     />
//   );
// }

import React from "react";

const Image = ({
  image,                 // object from primitive_get_image_src
  fallback,
  className,
  loading,               // optional: "lazy" or "eager"
  sizes,                  // optional override for sizes
  alt: altOverride,       // optional override
  ...rest
}) => {
  if (!image) {
    return (
      <img
        src={fallback}
        className={className}
        loading={loading || "lazy"}
        {...rest}
      />
    );
  }

  const { full, srcset, sizes_attribute, alt, title } = image;

  return (
    <img
      className={`frontity-lazy-image${className ? ` ${className}` : ""}`}
      src={full?.url}
      width={full?.width}
      height={full?.height}
      loading={loading || "lazy"}   // ✅ defaults to lazy unless prop is passed
      srcSet={srcset || undefined}
      sizes={sizes || sizes_attribute || undefined}
      alt={altOverride || alt || title || ""}
      {...rest}
    />
  );
};

export default Image;
