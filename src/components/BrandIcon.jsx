export default function BrandIcon({ icon, color, className = '' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path fill={color ?? `#${icon.hex}`} d={icon.path} />
    </svg>
  );
}
