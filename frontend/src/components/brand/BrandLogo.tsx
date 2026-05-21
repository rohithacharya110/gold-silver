/**
 * Uses /logo.png when you add your workshop mark to `public/logo.png`.
 * Falls back to /logo.svg (ornamental placeholder in the same palette).
 */
export function BrandLogo({
  className = "",
  imgClassName = "h-[3.25rem] w-auto object-contain md:h-[4rem]",
}: {
  className?: string;
  imgClassName?: string;
}) {
  return (
    <picture className={`block shrink-0 ${className}`}>
      <source srcSet="/logo.png" type="image/png" />
      <img
        src="/logo.svg"
        width={200}
        height={200}
        alt="SHRI JAGANMATHE — Gold & Silver Artwork"
        className={imgClassName}
        loading="eager"
        decoding="async"
      />
    </picture>
  );
}
