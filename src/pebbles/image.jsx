function Image({ image, fallback, altFallback = "" }) {
  if (!image) {
    return <img src={fallback} alt={altFallback} />;
  }

  const { full, srcset, sizes_attribute, alt } = image;

  return (
    <img
      src={full?.url}
      width={full?.width}
      height={full?.height}
      srcSet={srcset || undefined}
      sizes={sizes_attribute || "(max-width: 768px) 100vw, 768px"}
      alt={alt || altFallback}
      loading="lazy"
    />
  );
}
